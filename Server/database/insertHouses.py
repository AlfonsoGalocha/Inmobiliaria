import sys
import os

# Ajustar el path para que encuentre los módulos correctamente
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from api.main import app
from database.databaseTables import db, House

# Asegúrate de que `db` esté correctamente inicializado
with app.app_context():
    # Crear las tablas si no existen
    db.create_all()
    
    # Datos de ejemplo con `type` y `subtype`
    houses_data = [
        # Chalets
        {
            "type": "Casa",
            "subtype": "CHALET",
            "images": ["../../public/static/img/casa_majadahonda.webp","../../public/static/img/casa_majadahonda.webp","../../public/static/img/casa_majadahonda.webp"],
            "title": "Chalet en Las Rozas",
            "description": "Amplio chalet con piscina y jardín en una zona tranquila.",
            "location": "Las Rozas, España",
            "size": 350,
            "bathrooms": 3,
            "bedrooms": 4,
            "price": 450000,
            "rent":False,
        },
        {
            "type": "Casa",
            "subtype": "CHALET",
            "images": ["../../public/static/img/casa_majadahonda.webp","../../public/static/img/casa_majadahonda.webp","../../public/static/img/casa_majadahonda.webp"],
            "title": "Chalet en Villanueva",
            "description": "Moderno chalet de diseño con vistas a la montaña.",
            "location": "Villanueva, España",
            "size": 400,
            "bathrooms": 4,
            "bedrooms": 5,
            "price": 520000,
            "rent":False,
        },
        # Adosados
        {
            "type": "Casa",
            "subtype": "ADOSADO",
            "images": ["../../public/static/img/casa_majadahonda.webp","../../public/static/img/casa_majadahonda.webp","../../public/static/img/casa_majadahonda.webp"],
            "title": "Adosado en Majadahonda",
            "description": "Bonito adosado en urbanización con zonas comunes.",
            "location": "Majadahonda, España",
            "size": 250,
            "bathrooms": 2,
            "bedrooms": 3,
            "price": 320000,
            "rent":False,
        },
        {
            "type": "Casa",
            "subtype": "ADOSADO",
            "images": ["../../public/static/img/casa_majadahonda.webp","../../public/static/img/casa_majadahonda.webp","../../public/static/img/casa_majadahonda.webp"],
            "title": "Adosado en Pozuelo",
            "description": "Adosado renovado cerca de transporte público.",
            "location": "Pozuelo, España",
            "size": 220,
            "bathrooms": 2,
            "bedrooms": 3,
            "price": 300000,
            "rent":False,
        },
        # Villas
        {
            "type": "Casa",
            "subtype": "VILLA",
            "images": ["../../public/static/img/casa_majadahonda.webp","../../public/static/img/casa_majadahonda.webp","../../public/static/img/casa_majadahonda.webp"],
            "title": "Villa en Marbella",
            "description": "Exclusiva villa con vistas al mar y piscina privada.",
            "location": "Marbella, España",
            "size": 500,
            "bathrooms": 5,
            "bedrooms": 6,
            "price": 1200000,
            "rent":False,
        },
        {
            "type": "Casa",
            "subtype": "VILLA",
            "images": ["../../public/static/img/casa_majadahonda.webp","../../public/static/img/casa_majadahonda.webp","../../public/static/img/casa_majadahonda.webp"],
            "title": "Villa en Ibiza",
            "description": "Villa moderna con jardín, piscina y acceso a la playa.",
            "location": "Ibiza, España",
            "size": 450,
            "bathrooms": 4,
            "bedrooms": 5,
            "price": 1350000,
            "rent":False,
        },
        # Áticos
        {
            "type": "Piso",
            "subtype": "ÁTICO",
            "images": ["../../public/static/img/casa1.jpg","../../public/static/img/casa1.jpg","../../public/static/img/casa1.jpg"],
            "title": "Ático en Chamberí",
            "description": "Ático con terraza amplia y vistas panorámicas al centro de Madrid.",
            "location": "Chamberí, España",
            "size": 150,
            "bathrooms": 2,
            "bedrooms": 3,
            "price": 750000,
            "rent":False,
        },
        {
            "type": "Piso",
            "subtype": "ÁTICO",
            "images": ["../../public/static/img/casa1.jpg","../../public/static/img/casa1.jpg","../../public/static/img/casa1.jpg"],
            "title": "Ático en Valencia",
            "description": "Ático luminoso con jardín privado y acceso al mar.",
            "location": "Valencia, España",
            "size": 180,
            "bathrooms": 2,
            "bedrooms": 4,
            "price": 680000,
            "rent":False,
        },
        # Bajos
        {
            "type": "Piso",
            "subtype": "BAJO",
            "images": ["../../public/static/img/casa1.jpg","../../public/static/img/casa1.jpg","../../public/static/img/casa1.jpg"],
            "title": "Bajo en Alcorcón",
            "description": "Bajo con jardín privado en urbanización cerrada.",
            "location": "Alcorcón, España",
            "size": 120,
            "bathrooms": 2,
            "bedrooms": 3,
            "price": 250000,
            "rent":True,
        },
        {
            "type": "Piso",
            "subtype": "BAJO",
            "images": ["../../public/static/img/casa1.jpg","../../public/static/img/casa1.jpg","../../public/static/img/casa1.jpg"],
            "title": "Bajo en Fuenlabrada",
            "description": "Bajo con terraza y garaje incluido.",
            "location": "Fuenlabrada, España",
            "size": 110,
            "bathrooms": 2,
            "bedrooms": 3,
            "price": 230000,
            "rent":False,
        },
        # Dúplex
        {
            "type": "Piso",
            "subtype": "DUPLEX",
            "images": ["../../public/static/img/casa1.jpg","../../public/static/img/casa1.jpg","../../public/static/img/casa1.jpg"],
            "title": "Dúplex en Salamanca",
            "description": "Dúplex elegante en el centro, con acabados de lujo.",
            "location": "Salamanca, España",
            "size": 200,
            "bathrooms": 3,
            "bedrooms": 4,
            "price": 850000,
            "rent":True,
        },
        {
            "type": "Piso",
            "subtype": "DUPLEX",
            "images": ["../../public/static/img/casa1.jpg","../../public/static/img/casa1.jpg","../../public/static/img/casa1.jpg"],
            "title": "Dúplex en Barcelona",
            "description": "Dúplex moderno cerca del mar, con grandes ventanales.",
            "location": "Barcelona, España",
            "size": 210,
            "bathrooms": 3,
            "bedrooms": 4,
            "price": 980000,
            "rent":True,
        }
    ]

    try:
        # Insertar los datos
        for house_data in houses_data:
            house = House(
                type=house_data["type"],
                subtype=house_data["subtype"],
                images=house_data["images"],
                title=house_data["title"],
                description=house_data["description"],
                location=house_data["location"],
                size=house_data["size"],
                bathrooms=house_data["bathrooms"],
                bedrooms=house_data["bedrooms"],
                price=house_data["price"],
                rent=house_data["rent"]
            )
            db.session.add(house)
        db.session.commit()
        print("Casas añadidas con éxito.")
    except Exception as e:
        db.session.rollback()
        print(f"Error al añadir las casas: {e}")
    finally:
        db.session.close()
