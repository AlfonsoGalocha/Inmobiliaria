from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import ARRAY

db = SQLAlchemy()

# 1. Usuarios
class User(db.Model):   
    __tablename__ = 'user'
    id = db.Column(db.String, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    favs = db.Column(ARRAY(db.String))
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

class House(db.Model):
    __tablename__ = 'house'
    id = db.Column(db.String, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    size = db.Column(db.Float, nullable=False)  # Para tamaños en metros cuadrados
    bathrooms = db.Column(db.Integer, nullable=False)
    bedrooms = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    stock = db.Column(db.Boolean, nullable=False)  # True para 'sí', False para 'no'
    alquiler = db.Column(db.Boolean, nullable=False)  # True para 'sí', False para 'no'
    tipo = db.Column(db.Enum('Casa', 'Piso', name='house_type'), nullable=False)
    image = db.Column(db.String, nullable=True)  # Para la URL de la imagen
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())







