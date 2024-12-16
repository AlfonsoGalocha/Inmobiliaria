import sys
import os

# Ajustar el path para que encuentre los módulos correctamente
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from api.main import app
from database.databaseTables import db, House

with app.app_context():
    # Crear las tablas si no existen
    db.create_all()
    
    # Datos de ejemplo con `type` y `subtype`
    houses_data = [
        # Chalets
        {
            "type": "Casa",
            "subtype": "CHALET",
            "images": ["../../public/static/img/casa_majadahonda.webp","../../public/static/img/cocina1.webp","../../public/static/img/salon1.jpeg"],
            "title": "Chalet en Las Rozas",
            "description": "Amplio chalet con piscina y jardín en una zona tranquila.",
            "location": "Las Rozas, España",
            "size": 350,
            "bathrooms": 3,
            "bedrooms": 4,
            "price": 1500,
            "rent":True,
            "likes":0,
        
        },
        {
            "type": "Casa",
            "subtype": "CHALET",
            "images": ["../../public/static/img/casa2.webp","../../public/static/img/cocina2.webp","../../public/static/img/dormitorio1.jpg"],
            "title": "Chalet en Villanueva",
            "description": "Moderno chalet de diseño con vistas a la montaña.",
            "location": "Villanueva, España",
            "size": 400,
            "bathrooms": 4,
            "bedrooms": 5,
            "price": 1600,
            "rent":True,
            "likes":0,
        },
        {
            "type": "Casa",
            "subtype": "CHALET",
            "images": ["../../public/static/img/casa3.webp","../../public/static/img/cocina4.jpg","../../public/static/img/dormitorio2.webp"],
            "title": "Chalet en Boadilla",
            "description": "Chalet moderno con garaje y bien ubicado.",
            "location": "Boadilla, España",
            "size": 300,
            "bathrooms": 3,
            "bedrooms": 4,
            "price": 480000,
            "rent":False,
            "likes":0,
        },
        # Adosados
        {
            "type": "Casa",
            "subtype": "ADOSADO",
            "images": ["../../public/static/img/adosado1.webp","../../public/static/img/cocina5.jpg","../../public/static/img/salon3.webp", "../../public/static/img/dormitorio1.jpg", "../../public/static/img/entrada1.jpg"],
            "title": "Adosado en Majadahonda",
            "description": "Bonito adosado en urbanización con zonas comunes.",
            "location": "Majadahonda, España",
            "size": 250,
            "bathrooms": 2,
            "bedrooms": 3,
            "price": 320000,
            "rent":False,
            "likes":0,
        },
        {
            "type": "Casa",
            "subtype": "ADOSADO",
            "images": ["../../public/static/img/adosado2.webp","../../public/static/img/bano3.webp","../../public/static/img/salon8.webp"],
            "title": "Adosado en Pozuelo",
            "description": "Adosado renovado cerca de transporte público.",
            "location": "Pozuelo, España",
            "size": 220,
            "bathrooms": 2,
            "bedrooms": 3,
            "price": 1200,
            "rent":True,
            "likes":0,
        },
        # Villas
        {
            "type": "Casa",
            "subtype": "VILLA",
            "images": ["../../public/static/img/villa1.webp","../../public/static/img/bano2.webp","../../public/static/img/salon6.webp"],
            "title": "Villa en Marbella",
            "description": "Exclusiva villa con vistas al mar y piscina privada.",
            "location": "Marbella, España",
            "size": 500,
            "bathrooms": 5,
            "bedrooms": 6,
            "price": 1200000,
            "rent":False,
            "likes":0,
        },
        {
            "type": "Casa",
            "subtype": "VILLA",
            "images": ["../../public/static/img/ibiza1.webp","../../public/static/img/ibiza2.webp","../../public/static/img/ibiza3.webp", "../../public/static/img/baño1.webp"],
            "title": "Villa en Ibiza",
            "description": "Villa moderna con jardín, piscina y acceso a la playa.",
            "location": "Ibiza, España",
            "size": 450,
            "bathrooms": 4,
            "bedrooms": 5,
            "price": 1350000,
            "rent":False,
            "likes":0,
        },

        #Pareado
        {
            "type": "Casa",
            "subtype": "PAREADO",
            "images": ["../../public/static/img/pareado1.webp","../../public/static/img/cocina5.jpg","../../public/static/img/salon3.webp", "../../public/static/img/dormitorio1.jpg", "../../public/static/img/bano1.webp"],
            "title": "Pareado en Majadahonda",
            "description": "Bonito pareado en urbanización con zonas comunes.",
            "location": "Majadahonda, España",
            "size": 250,
            "bathrooms": 2,
            "bedrooms": 3,
            "price": 320000,
            "rent":False,
            "likes":0,
        },

        # Áticos
        {
            "type": "Piso",
            "subtype": "ÁTICO",
            "images": ["../../public/static/img/piso1.webp","../../public/static/img/bano1.webp","../../public/static/img/salon4.webp"],
            "title": "Ático en Chamberí",
            "description": "Ático con terraza amplia y vistas panorámicas al centro de Madrid.",
            "location": "Chamberí, España",
            "size": 150,
            "bathrooms": 2,
            "bedrooms": 3,
            "price": 750000,
            "rent":False,
            "likes":0,
        },
        {
            "type": "Piso",
            "subtype": "ÁTICO",
            "images": ["../../public/static/img/piso2.webp","../../public/static/img/bano2.webp","../../public/static/img/salon7.webp"],
            "title": "Ático en Valencia",
            "description": "Ático luminoso con jardín privado y acceso al mar.",
            "location": "Valencia, España",
            "size": 180,
            "bathrooms": 2,
            "bedrooms": 4,
            "price": 680000,
            "rent":False,
            "likes":0,
        },

        #Entreplanta
        {
            "type": "Piso",
            "subtype": "ENTREPLANTA",
            "images": ["../../public/static/img/entreplanta1.webp","../../public/static/img/salon5.webp","../../public/static/img/cocina5.jpg"],
            "title": "Entreplanta en Madrid",
            "description": "Entreplanta con terraza y vistas al parque.",
            "location": "Madrid, España",
            "size": 100,
            "bathrooms": 2,
            "bedrooms": 3,
            "price": 1200,
            "rent":False,
            "likes":0,
        },
        # Bajos
        {
            "type": "Piso",
            "subtype": "BAJO",
            "images": ["../../public/static/img/entrada1.jpg","../../public/static/img/salon6.webp","../../public/static/img/cocina6.jpg"],
            "title": "Bajo en Alcorcón",
            "description": "Bajo con jardín privado en urbanización cerrada.",
            "location": "Alcorcón, España",
            "size": 120,
            "bathrooms": 2,
            "bedrooms": 3,
            "price": 948,
            "rent":True,
            "likes":0,
        },
        {
            "type": "Piso",
            "subtype": "BAJO",
            "images": ["../../public/static/img/bajo1.webp","../../public/static/img/baño1.webp","../../public/static/img/casa1.webp"],
            "title": "Bajo en Fuenlabrada",
            "description": "Bajo con terraza y garaje incluido.",
            "location": "Fuenlabrada, España",
            "size": 110,
            "bathrooms": 2,
            "bedrooms": 3,
            "price": 230000,
            "rent":False,
            "likes":0,
        },
        # Dúplex
        {
            "type": "Piso",
            "subtype": "DUPLEX",
            "images": ["../../public/static/img/piso3.webp","../../public/static/img/salon4.webp","../../public/static/img/bano2.webp"],
            "title": "Dúplex en Salamanca",
            "description": "Dúplex elegante en el centro, con acabados de lujo.",
            "location": "Salamanca, España",
            "size": 200,
            "bathrooms": 3,
            "bedrooms": 4,
            "price": 2100,
            "rent":True,
            "likes":0,
        },
        {
            "type": "Piso",
            "subtype": "DUPLEX",
            "images": ["../../public/static/img/casa1.webp","../../public/static/img/salon3.webp","../../public/static/img/cocina5.jpg"],
            "title": "Dúplex en Barcelona",
            "description": "Dúplex moderno cerca del mar, con grandes ventanales.",
            "location": "Barcelona, España",
            "size": 210,
            "bathrooms": 3,
            "bedrooms": 4,
            "price": 980000,
            "rent":False,
            "likes":0,
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
