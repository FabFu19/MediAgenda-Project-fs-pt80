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



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


#MediAgenda endpoints

@api.route('/register', methods=['POST'])
def register():
    try:
        data = request.json

      
        if not data.get('email') or not data.get('password'):
            return jsonify({"error": "Datos incompletos"}), 400

       
        current_user = Users.query.filter_by(email=data['email']).first()
        if current_user:
            return jsonify({"error": "El usuario ya existe"}), 400

        
        new_user = Users(
            nombre= data['nombre'],
            apellido= data['apellido'],
            email= data['email'],
            password= data['password'],
            paciente= data['paciente'],
            is_active= True
        )
        new_user.set_password(data['password'])
        db.session.add(new_user)

        if data['paciente']:
            new_patient = Pacientes(user_id= new_user.id)
            db.session.add(new_patient)
        else: 
            especialista_data = data.get('especialidades')
            if not especialista_data:
                return jsonify({"error": "Faltan datos del especialista"}), 400

            new_specialist = Especialistas(
                id= new_user.id,
                especialidades= especialista_data['especialidades'],
                telefono_oficina= especialista_data['telefono_oficina'],
                clinica= especialista_data['clinica'],
                numero_colegiatura= especialista_data['numero_colegiatura'],
                direccion_centro_trabajo= especialista_data['direccion_centro_trabajo'],
                descripcion= especialista_data['descripcion']
            )
            db.session.add(new_specialist)
            print(new_specialist)

        db.session.commit()

        access_token = create_access_token(identity=str(new_user.id))
        return jsonify({"msg": "Usuario registrado exitosamente", "token": access_token}), 201

    except Exception as e:
        db.session.rollback()
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

        # Token de acceso
        access_token = create_access_token(identity={"id": str(user.id), "paciente": user.paciente})
        return jsonify({"msg": "Inicio de sesión exitoso", "token": access_token}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/disponibilidad', methods=['POST'])
@jwt_required()
def crear_disponibilidad():
    try:
        current_user = get_jwt_identity()

        # Verificar si el usuario es un médico
        if current_user['paciente']:
            return jsonify({"error": "No autorizado"}), 403

        data = request.json
        nueva_disponibilidad = DisponibilidadMedico(
            medico_id= current_user['id'],
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

        
        if not current_user['paciente']:
            return jsonify({"error": "No autorizado"}), 403

        data = request.json
        nueva_cita = Citas(
            paciente_id= current_user['id'],
            medico_id= data['medico_id'],
            estado= 'pendiente',
            appointment_date= data['appointment_date'],
            appointment_time= data['appointment_time'],
            notes= data.get('notes', '')
        )
        db.session.add(nueva_cita)
        db.session.commit()

        return jsonify({"msg": "Cita agendada exitosamente"}), 201

    except Exception as e:
        db.session.rollback()
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