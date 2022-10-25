from sqlalchemy.orm import Session
from .models import Base
from .schemas import BaseModel
from .exceptions import ObjectNotFoundException


class Manager:

    def __init__(self, *, database: Session, model: Base):
        self.db = database
        self.model = model

    # Private
    def __get_from_query(self, **query: str | int):
        key, value = next(iter(query.items()))
        retrieved_object = self.db.query(
            self.model).filter_by(**{key: value}).first()
        if not retrieved_object:
            raise ObjectNotFoundException(
                f"{self.model.__name__} not found:{key}={value}")
        return retrieved_object

    # Helpers
    def exists(self, **query: str | int):
        results = []
        for key, value in query.items():
            results.append(
                self.db.query(self.model).filter_by(
                    **{key: value}).first() is not None)
        print(results)
        return False not in results

    # CRUD
    def get_all(self):
        return self.db.query(self.model).all()

    def get(self, **query: str | int):
        return self.__get_from_query(**query)

    def delete(self, id: int, /):
        object = self.__get_from_query(id=id)
        self.db.delete(object)
        self.db.commit()
        return

    def edit(self, schema: BaseModel, id: int):
        object = self.__get_from_query(id=id)
        object = {**object, **schema.dict()}
        self.db.commit()
        self.db.refresh(object)
        return object

    def create(self, schema: BaseModel, /):
        object = self.model(**schema.dict())
        self.db.add(object)
        self.db.commit()
        self.db.refresh(object)
        return object
