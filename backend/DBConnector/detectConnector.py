import re
import mysql.connector
from six import reraise
from config import Settings
from model.infoReg import *
from model.class_regModel import *
from fastapi import HTTPException
from typing import List, Optional
from DBConnector.exception import *
import os



class detectConnector:
    def __init__(self, ):
        self.config = Settings()
        
    def object2data(self,account:Vehicle_Reg):
        account = account.dict()
        account = tuple(list(account.values()))
        return account

    def warning_exception(self, mess: str):
        return mess

    async def lp_insert(self, idthe: int, type: int, lp: str, time_in: str):
        aaa = ""
        if type == 1:
            aaa = "car"
        else: 
            aaa = "motobike"
        db = mysql.connector.connect(
                                            host="localhost",
                                            user=self.config.db_username,
                                            password=self.config.db_password,
                                            database=self.config.db_name
                                            )     
        mycursor = db.cursor()
        if True:
            try:
                mycursor.execute("INSERT INTO biensoxe (idthe, loai_xe, biensoxe, timein) VALUES (%s,%s,%s,%s )", (idthe, aaa, lp, time_in))
                db.commit()
            except mysql.connector.Error as error:
                print("Failed to insert record to database rollback: {}".format(error))
                db.rollback()
            mycursor.close()
            db.close()
        return lp

    async def lp_checkCarOut(self, idthe: int, type: int, lp: str, time_out: str):
        db = mysql.connector.connect(
                                            host="localhost",
                                            user=self.config.db_username,
                                            password=self.config.db_password,
                                            database=self.config.db_name
                                            )     
        mycursor = db.cursor()
        try:
            mycursor.execute("SELECT biensoxe FROM biensoxe where idthe = %s", (idthe,))
            bienso = mycursor.fetchone()
            db.commit()
        except mysql.connector.Error as error:
            print("Failed to insert record to database rollback: {}".format(error))
            db.rollback()
       
        if (bienso[0] == lp):
            try:
                mycursor.execute("UPDATE biensoxe SET timeout = %s WHERE (idthe = %s)", (time_out, idthe))
                bienso = mycursor.fetchone()
                db.commit()
            except mysql.connector.Error as error:
                print("Failed to insert record to database rollback: {}".format(error))
                db.rollback()
            mycursor.close()
            db.close()
            return True
        # raise self.warning_exception("Xe Không hợp lệ")
        mycursor.close()
        db.close()
        return False
    
    async def getCarOutConnector(self, idCard: int):
        db = mysql.connector.connect(
                                            host="localhost",
                                            user=self.config.db_username,
                                            password=self.config.db_password,
                                            database=self.config.db_name
                                            )     
        mycursor = db.cursor()
        try:
            mycursor.execute("SELECT * FROM biensoxe where idthe = %s", (idCard,))
            carInfo = mycursor.fetchone()
            # mycursor.execute("DELETE FROM biensoxe WHERE idthe = %s", (idCard,))
            db.commit()
        except mysql.connector.Error as error:
            print("Failed to insert record to database rollback: {}".format(error))
            db.rollback()
        mycursor.close()
        db.close()
        return carInfo
        
    async def getNumberOfVehicleConnector(self):
        db = mysql.connector.connect(
                                            host="localhost",
                                            user=self.config.db_username,
                                            password=self.config.db_password,
                                            database=self.config.db_name
                                            )     
        mycursor = db.cursor()
        try:
            mycursor.execute("SELECT count(*) FROM biensoxe", ())
            numberofcar = mycursor.fetchone()
            db.commit()
        except mysql.connector.Error as error:
            print("Failed to insert record to database rollback: {}".format(error))
            db.rollback()
        mycursor.close()
        db.close()
        return numberofcar[0]

    async def warningMaxConnector(self):
        aaa = []
        db = mysql.connector.connect(
                                            host="localhost",
                                            user=self.config.db_username,
                                            password=self.config.db_password,
                                            database=self.config.db_name
                                            )     
        mycursor = db.cursor()
        try:
            mycursor.execute("SELECT count(*) FROM biensoxe where loai_xe = %s", ("car",))
            numberofcar = mycursor.fetchone()
            db.commit()
            mycursor.execute("SELECT count(*) FROM biensoxe where loai_xe = %s", ("motobike",))
            numberofmotobike = mycursor.fetchone()
        except mysql.connector.Error as error:
            print("Failed to insert record to database rollback: {}".format(error))
            db.rollback()
        
        if numberofcar[0] < 100:
            aaa.append("còn chỗ gửi ô tô")
        else: 
            aaa.append("hết chỗ gửi ô tô")
            
        if numberofmotobike[0] < 100:
            aaa.append("còn chỗ gửi xe máy")
        else:
            aaa.append("hết chỗ gửi xe máy")
        mycursor.close()
        db.close()
        return aaa


    async def regVehicleConnector(self, acc:Vehicle_Reg):
        aaa = self.object2data(acc)
        db = mysql.connector.connect(
                                            host="localhost",
                                            user=self.config.db_username,
                                            password=self.config.db_password,
                                            database=self.config.db_name
                                            )     
        mycursor = db.cursor()
        try:
            mycursor.execute("INSERT INTO dangky (id, name, IDnumber, vehicle, start, outOfDate, month) VALUES (%s, %s, %s, %s, %s, %s, %s)", aaa)
            # numberofcar = mycursor.fetchone()
            db.commit()
        except mysql.connector.Error as error:
            print("Failed to insert record to database rollback: {}".format(error))
            db.rollback()
        mycursor.close()
        db.close()
        return True

    async def deleteRegConnector(self, id: int):
        db = mysql.connector.connect(
                                            host="localhost",
                                            user=self.config.db_username,
                                            password=self.config.db_password,
                                            database=self.config.db_name
                                            )     
        mycursor = db.cursor()
        try:
            mycursor.execute("DELETE FROM dangky WHERE id = %s", (id,))
            # numberofcar = mycursor.fetchone()
            db.commit()
        except mysql.connector.Error as error:
            print("Failed to insert record to database rollback: {}".format(error))
            db.rollback()
        mycursor.close()
        db.close()
        return True

    async def checkRegisterConnector(self, id: int):
        db = mysql.connector.connect(
                                            host="localhost",
                                            user=self.config.db_username,
                                            password=self.config.db_password,
                                            database=self.config.db_name
                                            )     
        mycursor = db.cursor()
        try:
            mycursor.execute("SELECT * FROM dangky where id = %s", (id,))
            bienso = mycursor.fetchone()
            db.commit()
        except mysql.connector.Error as error:
            print("Failed to insert record to database rollback: {}".format(error))
            db.rollback()
        mycursor.close()
        db.close()
        if (id == bienso[0]):
            return bienso
        return False

    async def getNumberOfCarConnector(self,):
        db = mysql.connector.connect(
                                            host="localhost",
                                            user=self.config.db_username,
                                            password=self.config.db_password,
                                            database=self.config.db_name
                                            )     
        mycursor = db.cursor()
        try:
            mycursor.execute("SELECT count(*) FROM biensoxe where loai_xe = %s", ("car",))
            count = mycursor.fetchone()
            db.commit()
        except mysql.connector.Error as error:
            print("Failed to insert record to database rollback: {}".format(error))
            db.rollback()
        mycursor.close()
        db.close()
        return count[0]

    async def getNumberOfMotobikeConnector(self,):
        db = mysql.connector.connect(
                                            host="localhost",
                                            user=self.config.db_username,
                                            password=self.config.db_password,
                                            database=self.config.db_name
                                            )     
        mycursor = db.cursor()
        try:
            mycursor.execute("SELECT count(*) FROM biensoxe where loai_xe = %s", ("motobike",))
            count = mycursor.fetchone()
            db.commit()
        except mysql.connector.Error as error:
            print("Failed to insert record to database rollback: {}".format(error))
            db.rollback()
        mycursor.close()
        db.close()
        return count[0]
        
