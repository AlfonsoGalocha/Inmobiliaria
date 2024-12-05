from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.dialects.postgresql import ENUM
import uuid

db = SQLAlchemy()

# 1. Usuarios
class User(db.Model):   
    __tablename__ = 'user'
    id = db.Column(db.String, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    favs = db.Column(ARRAY(db.String), nullable=False, default=[])    
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)




class House(db.Model):
    __tablename__ = 'house'
    
    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    type = db.Column(ENUM('Casa', 'Piso', name='house_type', create_type=True), nullable=False)
    subtype = db.Column(ENUM('CHALET', 'ADOSADO', 'VILLA','PAREADO', 'ÁTICO', 'BAJO', 'DUPLEX','ENTREPLANTA', name='house_subtype', create_type=True), nullable=False)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    size = db.Column(db.Float, nullable=False)
    bathrooms = db.Column(db.Integer, nullable=False)
    bedrooms = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    images = db.Column(ARRAY(db.String), nullable=True)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(
        db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp()
    )
    rent = db.Column(db.Boolean, nullable=False)
    
    def to_dict(self):
        return {
            "id": self.id,
            "type": self.type,
            "subtype": self.subtype,
            "title": self.title,
            "description": self.description,
            "location": self.location,
            "size": self.size,
            "bathrooms": self.bathrooms,
            "bedrooms": self.bedrooms,
            "price": self.price,
            "images": self.images,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "rent":self.rent,
        }
