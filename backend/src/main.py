from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .db.models import Base, User
from .db.crud import Manager
from .db.sql import SessionLocal, engine
from .db.schemas import UserCreateModel, UserModel
from .db.exceptions import ObjectNotFoundException

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    'http://localhost:3000',
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=['*'],
    allow_headers=['*'],
    )


def get_manager():
    db = SessionLocal()
    Users = Manager(database=db, model=User)
    try:
        yield Users
    finally:
        db.close()


@app.get("/users", response_model=list[UserModel])
async def users(Users: Manager = Depends(get_manager)):
    return Users.get_all()


@app.post("/users", response_model=UserModel)
async def userCreate(user: UserCreateModel,
                     Users: Manager = Depends(get_manager)):
    if Users.exists(**user.dict()):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail=f"user already exists:{user.dict()}")
    return Users.create(user)


@app.delete("/users/{id}")
async def userDelete(id: int, Users: Manager = Depends(get_manager)):
    try:
        Users.delete(id)
        return status.HTTP_204_NO_CONTENT
    except ObjectNotFoundException as e:
        raise HTTPException(status_code=400, detail=str(e))
