from flask import Flask, request, jsonify, session
import psycopg2
import datetime
import sys
import os
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from database.databaseTables import User, House, db

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:5173"}})

app.config['SECRET_KEY'] = '1234567890'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:12345@localhost:5432/mar'
db.init_app(app)

with app.app_context():
    db.create_all()


@app.route('/user/signup', methods=['POST'])
def signup():
    data = request.get_json()

    if not data or not 'username' in data or not 'password' in data or not 'email' in data:
        return jsonify({'message': 'Faltan datos'}), 400

    username = data['username']
    email = data['email']
    password = data['password']

    try:
        existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
        if existing_user:
            return jsonify({'message': 'El usuario o el correo ya existe'}), 400

        hashed_password = generate_password_hash(password)
        new_user = User(
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


@app.route('/user/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or not 'username' in data or not 'password' in data:
        return jsonify({'message': 'Faltan datos'}), 400

    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({'message': 'Usuario o contraseña incorrectos'}), 401

    session['login'] = True
    session['role'] = user.role

    response = jsonify({'message': 'Inicio de sesión exitoso'})
    response.set_cookie('session', 'true', httponly=True, samesite='Lax')

    return response


@app.route('/user/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'message': 'Logout exitoso'}), 200


@app.route('/houses', methods=['GET', 'POST'])
def get_houses():
    if request.method == 'GET':
        house_type = request.args.get('type', None)
        subtype = request.args.get('subtype', None)  
        min_price = request.args.get('min_price', None)
        max_price = request.args.get('max_price', None)
        min_bedrooms = request.args.get('min_bedrooms', None)
        min_bathrooms = request.args.get('min_bathrooms', None)
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 5))

        query = House.query 

        # Filtros opcionales con validación
        try:
            if house_type:
                query = query.filter(House.type == house_type)
            if subtype:
                subtypes = subtype.split(',') 
                query = query.filter(House.subtype.in_(subtypes))  
            if min_price:
                query = query.filter(House.price >= int(min_price))
            if max_price:
                query = query.filter(House.price <= int(max_price))
            if min_bedrooms:
                query = query.filter(House.bedrooms >= int(min_bedrooms))
            if min_bathrooms:
                query = query.filter(House.bathrooms >= int(min_bathrooms))
        except ValueError as ve:
            return jsonify({"message": "Parámetros inválidos", "error": str(ve)}), 400

        # Paginación y resultados
        try:
            paginated_houses = query.paginate(page=page, per_page=per_page)
            result = [house.to_dict() for house in paginated_houses.items]  #

            return jsonify({
                "houses": result,
                "total": paginated_houses.total,
                "pages": paginated_houses.pages,
                "current_page": paginated_houses.page
            }), 200
        except Exception as e:
            return jsonify({"message": "Error al obtener casas", "error": str(e)}), 500

    # # Método POST para añadir una casa
    # if request.method == 'POST':
    #     # Verificar si el usuario es administrador
    #     if 'role' not in session or session['role'] != 'admin':
    #         return jsonify({'message': 'Acceso no autorizado'}), 403

    #     data = request.get_json()
    #     required_fields = ['image', 'title', 'description', 'location', 'size', 'bathrooms', 'bedrooms', 'price', 'type', 'subtype']

    #     if not all(field in data for field in required_fields):
    #         return jsonify({'message': 'Faltan campos obligatorios'}), 400

    #     try:
    #         new_house = House(
    #             image=data['image'],
    #             title=data['title'],
    #             description=data['description'],
    #             location=data['location'],
    #             size=data['size'],
    #             bathrooms=data['bathrooms'],
    #             bedrooms=data['bedrooms'],
    #             price=data['price'],
    #             type=data['type'],
    #             subtype=data['subtype'] 
    #         )
    #         db.session.add(new_house)
    #         db.session.commit()
    #         return jsonify({'message': 'Casa añadida con éxito'}), 201
    #     except Exception as e:
    #         db.session.rollback()
    #         return jsonify({'message': 'Error al añadir la casa', 'error': str(e)}), 500


if __name__ == '__main__':
    app.run(port=5172, debug=True)
