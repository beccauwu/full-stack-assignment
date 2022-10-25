from pydantic import BaseModel


class UserModel(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        orm_mode = True


class UserCreateModel(BaseModel):
    name: str
    email: str
