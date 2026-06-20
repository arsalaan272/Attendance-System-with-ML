import os
from fastapi import FastAPI, status, Body
from dotenv import load_dotenv

load_dotenv();

Expected_userName = os.getenv("ADMIN_USERNAME");
Expected_password = os.getenv("ADMIN_PASSWORD");

app = FastAPI(title="Attendance System");

@app.get("/")
def root():
    return "welcome to the first page";


@app.post("/login")
def login(
    username:str = Body(..., embed=True),
    password:str = Body(..., embed=True)
    ):
    if(username == Expected_userName and password == Expected_password):
        return {
            "message" : "successfully authenticated",
            "status" : 200
            }
    else:
        return {
            "message" : "authentication failed",
            "status" : 400
        }

# print(Expected_password);
# print(os.getenv("ADMIN_PASSWORD"));