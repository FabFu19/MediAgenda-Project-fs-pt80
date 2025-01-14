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
        new_user = Users(
        nombre = data['nombre'],
        apellido = data['apellido'],
        email = data['email'],
        password = data['password'],
        paciente = data['paciente']
    )
        
        if not new_user.email or not new_user.password:
            raise Exception('Contraseña o correo erroneos')
        
        if not Users.query.filter_by(email=new_user.email).first():

            new_user_registered = Users(email=new_user.email, is_active=True)
            new_user_registered.set_password(new_user.password)
            db.session.add(new_user_registered)
            db.session.commit()
            acces_token = create_access_token(identity=str(new_user_registered.id))
            return jsonify({"msg": "Usuario registrado exitosamente", 'token': acces_token}), 201
        return jsonify({"msg": "Usuario ya existe, intenta hacer login"}), 400
    except Exception as error:   
        return jsonify({"error": str(error)}), 400

@api.route('/login', methods=['POST'])
def user_login():
    data = request.json
    user = Users.query.filter_by(email=data['email']).first()
    if not user or not user.password == data['password']:
        acces_token = create_access_token(identity={"id": str(user.id)})
        return jsonify(acces_token=acces_token), 200
    return jsonify({"error": "Credenciales inválidas"}), 401

@api.route('/disponibilidad', methods=['POST'])
@jwt_required()
def crear_disponibilidad():
    current_user = get_jwt_identity
    medico = Especialistas.query.filter_by(id=current_user['id']).first()

    if not medico:
        return jsonify({"error": "Sin autorización"}), 403
    
    data = request.json
    nueva_disponibilidad = DisponibilidadMedico(
        medico_id = medico.id,
        fecha= data['fecha'],
        hora_inicio= data['hora_inicio'],
        hora_final= data['hora_final'],
        is_available = True
    )
    db.session.add(nueva_disponibilidad)
    db.session.commit()
    return jsonify({"msg": "Disponibilidad creada exitosamente"}), 201