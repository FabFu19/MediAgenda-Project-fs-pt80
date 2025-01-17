"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users, Pacientes, Especialistas, DisponibilidadMedico, Citas, List_Tokens
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import datetime, timedelta, timezone

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# @api.before_first_req
# def setup_database():
#     db.createall()



#MediAgenda endpoints

@api.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        print("Datos recibidos:", data)

        if not data.get('email') or not data.get('password'):
            return jsonify({"error": "Datos incompletos"}), 400

        existing_user = Users.query.filter_by(email=data['email']).first()
        if existing_user:
            return jsonify({"error": "El usuario ya existe"}), 400

        # Crear usuario
        new_user = Users(
            nombre=data['nombre'],
            apellido=data['apellido'],
            email=data['email'],
            password=data['password'],
            paciente=data['paciente'],
            is_active=True
        )
        new_user.set_password(data['password'])
        db.session.add(new_user)
        db.session.flush()  # Para obtener el ID antes de hacer commit


        # Crear perfil de paciente o especialista
        if data['paciente']:
            new_patient = Pacientes(user_id=new_user.id)
            db.session.add(new_patient)
        else:
            print("especialista_data:", data.get('especialidades'))
            new_specialist = Especialistas(
                user_id=new_user.id,
                especialidades=data.get('especialidades', None),
                telefono_oficina=data.get('telefono_oficina', None),
                clinica=data.get('clinica', None),
                numero_colegiatura=data.get('numero_colegiatura', None),
                direccion_centro_trabajo=data.get('direccion_centro_trabajo', None),
                descripcion=data.get('descripcion', None)
            )
            db.session.add(new_specialist)

        db.session.commit()
        # Crear token
        access_token = create_access_token(identity=str(new_user.id))
        return jsonify({"msg": "Usuario registrado exitosamente", "token": access_token}), 201

    except Exception as e:
        db.session.rollback()
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500


@api.route('/login', methods=['POST'])
def login():
    try:
        data = request.json

        if not data.get('email') or not data.get('password'):
            return jsonify({"error": "Datos incompletos"}), 400

        user = Users.query.filter_by(email=data['email']).first()

        if not user or not user.check_password(data['password']):
            return jsonify({"error": "Credenciales inválidas"}), 401

        # Crear token con el ID y el rol del usuario
        access_token = create_access_token(identity=str(user.id))

        return jsonify({"msg": "Inicio de sesión exitoso", "token": access_token}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/disponibilidad', methods=['POST'])
@jwt_required()
def crear_disponibilidad():
    try:
        current_user = get_jwt_identity()
        especialista = Especialistas.query.filter_by(user_id = current_user).first() 
        if not especialista: 
            return jsonify({'error': 'No autorizado'})
        data = request.json
        nueva_disponibilidad = DisponibilidadMedico(
            medico_id= especialista.id,
            fecha= data['fecha'],
            hora_inicio= data['hora_inicio'],
            hora_final= data['hora_final'],
            is_available= True
        )
        db.session.add(nueva_disponibilidad)
        db.session.commit()

        return jsonify({"msg": "Disponibilidad creada exitosamente"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@api.route('/citas', methods=['POST'])
@jwt_required()
def agendar_cita():
    try:
        current_user = get_jwt_identity()
        print("Datos del token:", current_user)

        
        
        data = request.json
        nueva_cita = Citas(
            paciente_id=current_user, 
            medico_id=data.get('medico_id'),
            estado='pendiente',
            appointment_date=data.get('appointment_date'),
            appointment_time=data.get('appointment_time'),
            notes=data.get('notes', '')
        )
        db.session.add(nueva_cita)
        db.session.commit()

        return jsonify({"msg": "Cita agendada exitosamente", }), 201

    except Exception as e:
        db.session.rollback()
        print("Error al agendar cita:", str(e)) 
        return jsonify({"error": str(e)}), 500


@api.route('/citas', methods=['GET'])
@jwt_required()
def list_citas():
    try:
        current_user = get_jwt_identity()

        if current_user['paciente']:
            citas = Citas.query.filter_by(paciente_id=current_user['id']).all()
        else:
            citas = Citas.query.filter_by(medico_id=current_user['id']).all()

        return jsonify([cita.serialize() for cita in citas]), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500