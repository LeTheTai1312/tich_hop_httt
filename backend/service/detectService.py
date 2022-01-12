# from DBConnector.account import AccountConnector
from DBConnector.classRegister import classRegisterConnector
from model.model import *
from model.class_regModel import *
from fastapi.security import OAuth2PasswordBearer
from fastapi import  Depends
from .utils import JWTUtils, CSVUtils
from fastapi import HTTPException
from datetime import timedelta
from config import Settings
from typing import Optional, List
from fastapi import FastAPI, HTTPException, Depends, Request
import pandas as pd
import io
from datetime import date

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="account/login")

class detect:
    def __init__(self, ):
        self.connector = classRegisterConnector()
        self.settings = Settings()
        

    # async def detect_lp(self, filename: str):
    #     return await self.connector.classreg_insert(processed)

    # async def class_del(self, classId:list[Optional[str]], current_user: Class_Reg):
    #     return await self.connector.classdel(current_user.Id, classId)

    # async def regVehicleService(self, classId:list[Optional[str]], current_user: Class_Reg):
    #     return await self.connector.regVehicl(current_user.Id, classId)