# Importammos librerías necesarias
from flask import Flask, request, jsonify, session
from flask_mail import Mail,Message
import psycopg2
import datetime
import sys
import os
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv  # Importa la función load_dotenv
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from database.databaseTables import User, House, db
from uuid import UUID

load_dotenv()  # Llama a la función load_dotenv

# Crear la aplicación Flask
app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:5173"}}) # Habilitar CORS

app.config['SECRET_KEY'] =  os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:12345@localhost:5432/mar'
db.init_app(app)

# Configuración de Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Servidor SMTP (Gmail en este caso)
app.config['MAIL_PORT'] = 587  # Puerto del servidor SMTP
app.config['MAIL_USE_TLS'] = True  # Habilitar TLS
app.config['MAIL_USE_SSL'] = False # Deshabilitar SSL
app.config['MAIL_USERNAME'] = 'soportecliente.mar@gmail.com'  # Tu correo electrónico
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')  # Contraseña o clave de aplicación
app.config['MAIL_DEFAULT_SENDER'] = 'soportecliente.mar@gmail.com' # Remitente por defecto

# Inicializar la extensión Flask-Mail
mail = Mail(app)

# Crear la base de datos
with app.app_context():
    db.create_all()

# Rutas de la API

# Ruta para registrar un usuario
@app.route('/user/signup', methods=['POST']) 
# Función para registrar un usuario
def signup():
    data = request.get_json()

    if not data or not 'username' in data or not 'password' in data or not 'email' in data: # Validar que los datos estén present
        return jsonify({'message': 'Faltan datos'}), 400

    username = data['username']
    email = data['email']
    password = data['password']

    try: 
        existing_user = User.query.filter((User.username == username) | (User.email == email)).first() # Verificar si el usuario o el correo ya existen
        if existing_user:
            return jsonify({'message': 'El usuario o el correo ya existe'}), 400

        hashed_password = generate_password_hash(password) # Generar el hash de la contraseña
        new_user = User(
            id=str(datetime.datetime.now(datetime.timezone.utc).timestamp()),
            username=username,
            email=email,
            password=hashed_password,
            created_at=datetime.datetime.now(datetime.timezone.utc)
        )
 
        db.session.add(new_user) # Agregar el usuario a la base de datos
        db.session.commit() # Confirmar la transacción
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error en el registro', 'error': str(e)}), 500
    finally:
        db.session.close()

    return jsonify({'message': 'Usuario registrado con éxito'}), 201

# Ruta para iniciar sesión
@app.route('/user/login', methods=['POST'])
 # Función para iniciar sesión
def login():
    data = request.get_json() # Obtener los datos del cuerpo de la solicitud

    if not data or not 'username' in data or not 'password' in data:  # Validar que los datos estén presentes
        return jsonify({'message': 'Faltan datos'}), 400

    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username).first() # Buscar el usuario en la base de datos

    if not user or not check_password_hash(user.password, password): # Verificar si el usuario existe y la contraseña es correcta
        return jsonify({'message': 'Usuario o contraseña incorrectos'}), 401

    session['login'] = True
    session['identifier'] = user.id

    response = jsonify({'message': 'Inicio de sesión exitoso'})
    response.set_cookie('session', 'true', httponly=True, samesite='Lax')

    return response

# Ruta para cerrar sesión
@app.route('/user/logout', methods=['POST'])

def logout(): # Función para cerrar sesión
    session.clear() # Limpiar la sesión
    return jsonify({'message': 'Logout exitoso'}), 200


# Ruta para obtener información del usuario
@app.route('/houses', methods=['GET', 'POST']) 
# Ruta para obtener información de las casas
def get_houses():
    if request.method == 'GET': # Si la solicitud es GET obtenemos las propiedades de las casas
        house_type = request.args.get('type', None)  
        subtype = request.args.get('subtype', None)  
        min_price = request.args.get('min_price', None)
        max_price = request.args.get('max_price', None)
        min_bedrooms = request.args.get('min_bedrooms', None)
        min_bathrooms = request.args.get('min_bathrooms', None)
        rent = request.args.get('rent', None)
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 6))
        likes = request.args.get('likes', None)


        query = House.query  # Consulta base

        if house_type == "":
            house_type = None

        #Consultas de los filtros opcionales con validación
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
            if rent is not None:
                if rent.lower() == 'true':
                    query = query.filter(House.rent.is_(True))
                elif rent.lower() == 'false':
                    query = query.filter(House.rent.is_(False))
            print("Likes parameter:", likes)

            # Casas con mas likes para la página principal
            if likes == "mvendidos":
                top_liked_houses = query.order_by(House.likes.desc()).limit(3).all()
                result = [house.to_dict() for house in top_liked_houses]
                print(result)
                return jsonify({
                    "houses": result,
                }), 200

        # Manejo de errores
        except ValueError as ve:
            return jsonify({"message": "Parámetros inválidos", "error": str(ve)}), 400

        # Paginación y resultados (4 casas con mas likes)
        try:
            # Casas con mas likes
            paginated_houses = query.order_by(House.likes.desc()).paginate(page=page, per_page=per_page)
            result = [house.to_dict() for house in paginated_houses.items]

            return jsonify({
                "houses": result,
                "total": paginated_houses.total,
                "pages": paginated_houses.pages,
                "current_page": paginated_houses.page
            }), 200
        except Exception as e:
            print("Error al procesar la solicitud:", str(e))
            return jsonify({"message": "Error al obtener casas", "error": str(e)}), 500
        
# Ruta para agregar una casa
@app.route('/houses/<id>', methods=['GET'])
# Función para obtener información de una casa
def house_info(id):
    try:
        house = House.query.filter_by(id=id).first()  # Obtener la información de la casa desde la base de datos

        if not house:
            return jsonify({'message': 'Casa no encontrada'}), 404 # Responder con un error si la casa no existe

        # Construir la respuesta con los datos de la casa
        house_data = {
            'id': house.id,
            'title': house.title,
            'description': house.description,
            'images': house.images, 
            'price': house.price,
            'location': house.location,
            'size': house.size,
            'bathrooms': house.bathrooms,
            'bedrooms': house.bedrooms,
            'rent':house.rent,
        }

        return jsonify(house_data), 200

    except Exception as e:
        print(f"Error al obtener la información de la casa: {str(e)}") 
        return jsonify({'message': 'Error al obtener la información de la casa', 'error': str(e)}), 500

# Ruta para agregar una casa
@app.route('/house/requestVisit', methods=['POST'])
# Función para solicitar una visita
def request_visit():
    data = request.json 
    
    # Validar que los datos necesarios estén presentes
    house_id = data.get('houseId')
    username = data.get('username')
    housename = data.get('housename')
    user_email = db.session.query(User).filter_by(username=username).first().email  # Buscar el email del usuario en la base de datos
    date = data.get('date')

    user = db.session.query(User).filter_by(username=username).first() # Buscar el usuario en la base de datos
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404
    
    if not house_id or not username:
        return jsonify({"error": "Faltan parámetros: houseId o userEmail"}), 400
    

    try:
        # Personaliza el contenido del correo
        subject = f"Solicitud de visita para la casa {housename} con id {house_id}"
        body = f"Estimado/a {username},\n\n" \
            f"Hemos recibido su solicitud de visita para la casa {housename}.\n\n " \
            f"Su solicitud para el dia {date} está siendo procesada y se tramitará en los próximos minutos. " \
            "Nos pondremos en contacto con usted a la mayor brevedad posible para confirmar los detalles de la visita. \n\n" \
            f"El ID de la casa a visitar es: {house_id}, si surge algún inconveniente deberás proporcionarlo al equipo de At.Cliente\n\n" \
            "Gracias por su interés en nuestros servicios.\n\n" \
            "Atentamente,\n" \
            "El equipo de atención al cliente"
        
        
        # Crear y enviar el mensaje
        msg = Message(subject=subject, recipients=[user_email], body=body)
        mail.send(msg)

    except Exception as e:
        return jsonify({"message": "Error al enviar el correo", "error": str(e)}), 500 # Responder con un error si falla el envío del correo

    # Responder con éxito
    return jsonify({"message": "Solicitud recibida con éxito y correo enviado"}), 200

# Ruta para la vista de favoritos
@app.route('/user/favs', methods=['GET','POST'])
# Función para obtener y modificar la lista de favoritos
def get_favs():

    if request.method == 'GET':
        if 'login' not in session: # Verificar si el usuario ha iniciado sesión
            return jsonify({'message': 'Tienes que registrarte para ver esta función'}), 401

        usuario = session['identifier']
        user = db.session.query(User).filter_by(id=usuario).first() # Buscar el usuario en la base de datos

        if not user:
            return jsonify({'message': 'Usuario no encontrado'}), 404
        
        # Consultar detalles de las casas
        casas_fav = db.session.query(House).filter(House.id.in_(user.favs)).all()
        
        # Transformar a JSON
        casas_json = [
            {
                'id': casa.id,
                'title': casa.title,
                'description': casa.description,
                'location': casa.location,
                'size': casa.size,
                'bathrooms': casa.bathrooms,
                'bedrooms': casa.bedrooms,
                'price': casa.price,
                'images': casa.images
            }
            for casa in casas_fav
        ]

        return jsonify({'favs': casas_json}), 200

    # Modificar la lista de favoritos
    if request.method == 'POST':

        data = request.get_json() # Obtener los datos del cuerpo de la solicitud
        house_id = str(data.get('house_id'))  # Convertir a string
        action = data.get('action')  # Puede ser 'add' o 'remove'
        house = db.session.query(House).filter_by(id=house_id).first() # Buscar la casa en la base de datos

        if not house_id or not action:
            return jsonify({'message': 'Faltan datos'}), 400

        if 'login' not in session:
            return jsonify({'message': 'Tienes que registrarte para ver esta función'}), 401

        usuario = session['identifier']
        user = db.session.query(User).filter_by(id=usuario).first()

        if not user:
            return jsonify({'message': 'Usuario no encontrado'}), 404

        if user.favs is None:
            user.favs = [] # Inicializar la lista de favoritos si está vacía

        # Si la acción es 'add', agregar la casa a favoritos
        if action == 'add':
            if house_id not in user.favs:
                # Sumamos 1 a los likes de la casa
                house.likes = house.likes + 1

                user.favs = user.favs + [house_id]  # Reasignar la lista modificada
            else:
                return jsonify({'message': 'La casa ya está en favoritos'}), 400
        
        # Si la acción es 'remove', eliminar la casa de favoritos
        elif action == 'remove':
            if house_id in user.favs:
                # Restamos 1 a los likes de la casa
                house.likes = house.likes - 1

                user.favs = [fav for fav in user.favs if fav != house_id]  # Reasignar sin el elemento
            else:
                return jsonify({'message': 'La casa no está en favoritos'}), 400
            
        else:
            return jsonify({'message': 'Acción no válida'}), 400

        try:
            db.session.commit() # Confirmar la transacción
            return jsonify({'message': 'Lista de favoritos actualizada con éxito', 'favs': user.favs}), 200
        except Exception as e:
            db.session.rollback() # Revertir la transacción
            return jsonify({'message': 'Error al actualizar favoritos', 'error': str(e)}), 500


# Ruta para inicializar el backend
if __name__ == '__main__':
    app.run(port=5172, debug=True)
