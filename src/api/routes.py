"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users, Pacientes, Especialistas, DisponibilidadMedico, Citas, List_Tokens
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import datetime, timedelta, timezone
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
import os

api = Blueprint('api', __name__)

CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
SCOPES = ["https://www.googleapis.com/auth/calendar"]

# Flujo de OAuth
flow = Flow.from_client_secrets_file(
    CLIENT_SECRET_FILE,
    scopes=SCOPES,
    redirect_uri="https://glowing-succotash-5g4p4995q9vw2v6q6-3001.app.github.dev/redirect",
)


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

        return jsonify({"msg": "Inicio de sesion exitoso", "token": access_token, "user": user.serialize()}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@api.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    try:
        current_user = get_jwt_identity()
        user = Users.query.get(current_user)

        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404

        
        if user.paciente:
          
            patient_profile = Pacientes.query.filter_by(user_id=user.id).first()
            if not patient_profile:
                return jsonify({"error": "Perfil de paciente no encontrado"}), 404

            return jsonify({
                "role": "paciente",
                "user": user.serialize(),
                "profile": patient_profile.serialize()
            }), 200
        else:
            #
            specialist_profile = Especialistas.query.filter_by(user_id=user.id).first()
            if not specialist_profile:
                return jsonify({"error": "Perfil de especialista no encontrado"}), 404

            return jsonify({
                "role": "especialista",
                "user": user.serialize(),
                "profile": specialist_profile.serialize()
            }), 200

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

        if current_user:
            citas = Citas.query.filter_by(paciente_id=current_user).all()
        else:
            citas = Citas.query.filter_by(medico_id=current_user['medico_id']).all()

        return jsonify([cita.serialize() for cita in citas]), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@api.route('/auth/google', methods=['GET'])
def google_auth():
    flow = Flow.from_client_secrets_file(
        CLIENT_SECRET_FILE, scopes=SCOPES, redirect_uri="https://glowing-succotash-5g4p4995q9vw2v6q6-3000.app.github.dev"
    )
    auth_url, state = flow.authorization_url()
    return jsonify({"auth_url": auth_url})

@api.route('/auth/google/callback', methods=['GET'])
def google_callback():
    flow = Flow.from_client_secrets_file(
        CLIENT_SECRET_FILE, scopes=SCOPES, redirect_uri="https://glowing-succotash-5g4p4995q9vw2v6q6-3000.app.github.dev"
    )
    flow.fetch_token(authorization_response=request.url)
    credentials = flow.credentials
    return jsonify({
        "access_token": credentials.token,
        "refresh_token": credentials.refresh_token,
        "token_uri": credentials.token_uri,
        "client_id": credentials.client_id,
        "client_secret": credentials.client_secret,
    })

@api.route('/calendar/events', methods=['POST'])
def create_event():
    try:
        token = request.json.get("access_token")
        event_data = request.json.get("event")
        credentials = Credentials(token)
        service = build("calendar", "v3", credentials=credentials)
        event = service.events().insert(calendarId='primary', body=event_data).execute()
        return jsonify({"msg": "Event created successfully", "event": event}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/calendar/events/<event_id>', methods=['PUT'])
def update_event(event_id):
    try:
        token = request.json.get("access_token")
        event_data = request.json.get("event")
        credentials = Credentials(token)
        service = build("calendar", "v3", credentials=credentials)
        updated_event = service.events().update(
            calendarId='primary', eventId=event_id, body=event_data
        ).execute()
        return jsonify({"msg": "Event updated successfully", "event": updated_event}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/calendar/events/<event_id>', methods=['DELETE'])
def delete_event(event_id):
    try:
        token = request.json.get("access_token")
        credentials = Credentials(token)
        service = build("calendar", "v3", credentials=credentials)
        service.events().delete(calendarId='primary', eventId=event_id).execute()
        return jsonify({"msg": "Event deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/calendar/availability', methods=['POST'])
def check_availability():
    try:
        token = request.json.get("access_token")
        time_min = request.json.get("time_min")
        time_max = request.json.get("time_max")
        credentials = Credentials(token)
        service = build("calendar", "v3", credentials=credentials)
        events_result = service.events().list(
            calendarId='primary', timeMin=time_min, timeMax=time_max,
            singleEvents=True, orderBy='startTime'
        ).execute()
        events = events_result.get('items', [])
        return jsonify({"msg": "Availability fetched successfully", "events": events}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500