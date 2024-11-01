from flask import Flask, request, jsonify, session
import psycopg2
import datetime
import sys
import os
from flask_migrate import Migrate
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from database.database import Usuarios, db
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash


app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:5173"}})

app.config['SECRET_KEY'] = '1234567890'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:12345@localhost:5432/mar'
db.init_app(app)

migrate = Migrate(app, db)



@app.route('/user/signup', methods=['POST'])
# Registro de usuario
def signup():
    data = request.get_json()

    if not data or not 'username' in data or not 'password' in data or not 'email' in data:
        return jsonify({'message': 'Faltan datos'}), 400

    username = data['username']
    email = data['email']
    password = data['password']

    try:
        existing_user = Usuarios.query.filter((Usuarios.username == username) | (Usuarios.email == email)).first()
        if existing_user:
            return jsonify({'message': 'El usuario o el correo ya existe'}), 400

        hashed_password = generate_password_hash(password)
        new_user = Usuarios(
            id=str(datetime.datetime.now(datetime.timezone.utc).timestamp()),
            username=username,
            email=email,
            password=hashed_password,
            created_at=datetime.datetime.now(datetime.timezone.utc)
        )

        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error en el registro', 'error': str(e)}), 500
    finally:
        db.session.close()

    return jsonify({'message': 'Usuario registrado con éxito'}), 201



# Iniciar sesión
@app.route('/user/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or not 'username' in data or not 'password' in data:
        return jsonify({'message': 'Faltan datos'}), 400

    username = data['username']
    password = data['password']

    
    # Buscar usuario en la base de datos
    user = Usuarios.query.filter_by(username=username).first()
    
    if not user or not check_password_hash(user.password, password):
        return jsonify({'message': 'Usuario o contraseña incorrectos'}), 401

    session['login'] = True

    # Establecer una cookie
    response = jsonify({'message': 'Inicio de sesión exitoso'})
    response.set_cookie('session', 'true', httponly=True, samesite='Lax')

    return response


@app.route('/user/logout', methods=['POST'])
def logout():

    session.clear()

    return jsonify({'message': 'Logout exitoso'}), 200



if __name__ == '__main__':
    app.run(port=5172, debug=True)
