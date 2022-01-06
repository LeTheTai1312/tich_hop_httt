from fastapi import APIRouter, Header, Depends, HTTPException,File,UploadFile
from model.model import Account
# from service.AccountService import AccountService
#------------REGISTER--------------#
# from model.subject_regModel import Sub_Reg
# from model.class_regModel import Class_Reg
# from service.Subject_regService import Subject_regService
# from service.Class_regService import Class_regService
from detect.detect_lpService import detectService
#------------REGISTER--------------#
from typing import Optional, List 
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from pprint import pprint
from fastapi.responses import StreamingResponse, FileResponse
from fastapi import FastAPI, File, UploadFile
import os
import cv2
from fastapi.encoders import jsonable_encoder

class Login(BaseModel):
    email : str
    password : str
    role : int


router = APIRouter(prefix="/account")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="account/login")
# accountService = AccountService()




detectService = detectService()

@router.post("/detectCar_in")
async def detectCar_in(idCard: int, image: UploadFile = File(...)):
    filepath = os.getcwd()+"/images"
    if os.path.exists(filepath):
        print("hi")
    else:
        try:
            os.mkdir("images")
            print(os.getcwd())
        except Exception as e:
            print(e) 
    file_name = os.getcwd()+"/images/"+image.filename.replace(" ", "-")
    with open(file_name,'wb+') as f:
        f.write(image.file.read())
        f.close()
    return await detectService.do_detect_in(idCard, file_name)

@router.post("/detectCar_out")
async def detectCar_out(idCard: int, image: UploadFile = File(...)):
    filepath = os.getcwd()+"/images"
    if os.path.exists(filepath):
        print("hi")
    else:
        try:
            os.mkdir("images")
            print(os.getcwd())
        except Exception as e:
            print(e) 
    file_name = os.getcwd()+"/images/"+image.filename.replace(" ", "-")
    with open(file_name,'wb+') as f:
        f.write(image.file.read())
        f.close()
    return await detectService.do_detect_out(idCard, file_name)

@router.post("/getCarOut")
async def getCarOutS(idCard: int):
    return await detectService.getCarOutService(idCard)

@router.get("/getNumberOfCar")
async def getNumberOfCar():  
    return await detectService.getNumberOfCarService()

@router.get("/warnningMax")
async def warningMax():
    return await detectService.warningMaxService()