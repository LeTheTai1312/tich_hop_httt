import re
import cv2
import matplotlib.pyplot as plt
from pathlib import Path
import argparse
import time
import mysql.connector
from config import Settings
from model.infoReg import *
from DBConnector.detectConnector import detectConnector
from fastapi import HTTPException
from typing import List, Optional

from detect.src.lp_recognition import E2E
import os
import datetime

class detectService:
    def __init__(self, ):
        self.config = Settings()
        self.connector = detectConnector()
    


    def get_arguments():
        arg = argparse.ArgumentParser()
        arg.add_argument('-i', '--image_path', help='link to image', default="detect/samples/1.jpg")
        print(arg.parse_args())
        return arg.parse_args()

    async def do_detect_in(self, idCard:int, type: int, img_path:str):

        # read image
        img = cv2.imread(img_path)

        # start
        start = time.time()

        # load model
        model = E2E()

        # recognize license plate
        lp_number = model.predict(img)
        time_in = datetime.datetime.now()
        time_in = time_in.strftime("%m/%d/%Y, %H:%M:%S")
        # end
        end = time.time()

        # print('Model process on %.2f s' % (end - start))
        print("-----------------------------------------------------------------------"+ time_in)
        return await self.connector.lp_insert(idCard, type, lp_number, time_in)

    async def do_detect_out(self, idCard:int, type: int, img_path:str):

        # read image
        img = cv2.imread(img_path)

        # start
        start = time.time()

        # load model
        model = E2E()

        # recognize license plate
        lp_number = model.predict(img)
        time_out = datetime.datetime.now()
        time_out = time_out.strftime("%m/%d/%Y, %H:%M:%S")
        # end
        end = time.time()

        # print('Model process on %.2f s' % (end - start))
        print("-----------------------------------------------------------------------"+ time_out)
        return await self.connector.lp_checkCarOut(idCard, type, lp_number, time_out)
    
    async def getCarOutService(self, idCard: int):
        return await self.connector.getCarOutConnector(idCard)

    async def getNumberOfVehicleService(self):
        return await self.connector.getNumberOfVehicleConnector()

    async def warningMaxService(self):
        return await self.connector.warningMaxConnector()

    async def regVehicleService(Self, acc: Vehicle_Reg):
        aaa = datetime.date.today()
        acc.start = str(aaa)
        if acc.month == 1:
            acc.outOfDate = aaa + datetime.timedelta(days=30)
        elif acc.month == 3:
            acc.outOfDate = aaa + datetime.timedelta(days=90)
        elif acc.month == 6:
            acc.outOfDate = aaa + datetime.timedelta(days=180)
        elif acc.month == 12:
            acc.outOfDate = aaa + datetime.timedelta(days=365)
        acc.outOfDate = str(acc.outOfDate)
        return await Self.connector.regVehicleConnector(acc)
    
    async def deleteRegService(self, id: int):
        return await self.connector.deleteRegConnector(id)

    async def checkRegisterService(self, id: int):
        return await self.connector.checkRegisterConnector(id)

    async def getImageCarInService(self, id: int):
        return await self.connector.getImageCarInConnector(id)
    
    async def getNumberOfCarService(self):
        return await self.connector.getNumberOfCarConnector()

    
    async def getNumberOfMotobikeService(self):
        return await self.connector.getNumberOfMotobikeConnector()

    async def deleteVehicleService(self, id: int):
        return await self.connector.deleteVehicleConnector(id)
    
    async def getListAccountService(self):
        return await self.connector.getListAccountConnector()

    async def getListCarService(self):
        return await self.connector.getListCarConnector()

    async def getListMotobikeService(self):
        return await self.connector.getListMotoConnector()