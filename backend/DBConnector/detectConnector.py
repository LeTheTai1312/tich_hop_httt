import mysql.connector
from config import Settings
from model.model import *
from model.class_regModel import *
from fastapi import HTTPException
from typing import List, Optional
from DBConnector.exception import *



class detectConnector:
    def __init__(self, ):
        self.config = Settings()
        
    def object2data(self,account:Account):
        account = account.dict()
        account = tuple(list(account.values()))
        return account

    def warning_exception(self, mess: str):
        return mess

    async def lp_insert(self, idthe: int, lp: str, time_in: str):
        
        db = mysql.connector.connect(
                                            host="localhost",
                                            user=self.config.db_username,
                                            password=self.config.db_password,
                                            database=self.config.db_name
                                            )     
        mycursor = db.cursor()
        if True:
            try:
                mycursor.execute("INSERT INTO biensoxe (idthe, biensoxe, timein) VALUES (%s,%s,%s )", (idthe, lp, time_in))
                db.commit()
            except mysql.connector.Error as error:
                print("Failed to insert record to database rollback: {}".format(error))
                db.rollback()
            mycursor.close()
            db.close()
        return lp

    async def lp_checkCarOut(self, idthe: int, lp: str, time_out: str):
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
            mycursor.execute("DELETE FROM biensoxe WHERE idthe = %s", (idCard,))
            db.commit()
        except mysql.connector.Error as error:
            print("Failed to insert record to database rollback: {}".format(error))
            db.rollback()
        mycursor.close()
        db.close()
        return carInfo
        
    async def getNumberOfCarConnector(self):
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
        
        if numberofcar[0] < 3:
            mycursor.close()
            db.close()
            return True
        mycursor.close()
        db.close()
        return False
