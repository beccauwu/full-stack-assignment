from sqlalchemy import Column, Integer, String, Identity
from .sql import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, Identity(True, start=0, increment=1),
                primary_key=True, default=None)
    email = Column(String(255), unique=True, index=True)
    name = Column(String(255), index=True)
