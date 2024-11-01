from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import ARRAY

db = SQLAlchemy()

# 1. Usuarios
class Usuarios(db.Model):   
    __tablename__ = 'user'
    id = db.Column(db.String, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    favs = db.Column(ARRAY(db.String))
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

