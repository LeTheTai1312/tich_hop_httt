import cv2
import matplotlib.pyplot as plt
from pathlib import Path
import argparse
import time
import mysql.connector
from config import Settings
# from model.model import *
from DBConnector.detectConnector import detectConnector
from fastapi import HTTPException
from typing import List, Optional

from detect.src.lp_recognition import E2E
import os
from datetime import datetime

class detectService:
    def __init__(self, ):
        self.config = Settings()
        self.connector = detectConnector()
    


    def get_arguments():
        arg = argparse.ArgumentParser()
        arg.add_argument('-i', '--image_path', help='link to image', default="detect/samples/1.jpg")
        print(arg.parse_args())
        return arg.parse_args()

    async def do_detect_in(self, idCard:int, img_path:str):

        # read image
        img = cv2.imread(img_path)

        # start
        start = time.time()

        # load model
        model = E2E()

        # recognize license plate
        lp_number = model.predict(img)
        time_in = str(datetime.now())
        # end
        end = time.time()

        # print('Model process on %.2f s' % (end - start))
        print("-----------------------------------------------------------------------"+ time_in)
        return await self.connector.lp_insert(idCard, lp_number, time_in)

    async def do_detect_out(self, idCard:int, img_path:str):

        # read image
        img = cv2.imread(img_path)

        # start
        start = time.time()

        # load model
        model = E2E()

        # recognize license plate
        lp_number = model.predict(img)
        time_out = str(datetime.now())
        # end
        end = time.time()

        # print('Model process on %.2f s' % (end - start))
        print("-----------------------------------------------------------------------"+ time_out)
        return await self.connector.lp_checkCarOut(idCard, lp_number, time_out)
    
    async def getCarOutService(self, idCard: int):
        return await self.connector.getCarOutConnector(idCard)

    async def getNumberOfCarService(self):
        return await self.connector.getNumberOfCarConnector()

    async def warningMaxService(self):
        return await self.connector.warningMaxConnector()