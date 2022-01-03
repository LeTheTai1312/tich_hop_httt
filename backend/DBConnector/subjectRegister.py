import mysql.connector
from config import Settings
from model.model import *
from model.subject_regModel import *
from fastapi import HTTPException
from typing import List, Optional
from datetime import date

class subjectRegisterConnector:
    def __init__(self, ):
        self.config = Settings()

    def object2data(self,account:Account):
        account = account.dict()
        account = tuple(list(account.values()))
        return account


         

    async def subreg_insert(self, subreg: list[Sub_Reg]):
        aaa = []

        for reg in subreg:
            try:
                aaa.append(reg)                  
            except: 
                raise HTTPException(status_code=422, detail="bad")

        aaa = [self.object2data(x) for x in aaa]
        db = mysql.connector.connect(
                                            host="localhost",
                                            user=self.config.db_username,
                                            password=self.config.db_password,
                                            database=self.config.db_name
                                            )     
        mycursor = db.cursor()
        if True:
            try:
                mycursor.executemany("INSERT INTO subjectregister (Id, subjectId, semeter, timestamp) VALUES (%s,%s,%s,%s)", aaa)
                db.commit()
            except mysql.connector.Error as error:
                print("Failed to insert record to database rollback: {}".format(error))
                db.rollback()
            mycursor.close()
            db.close()
       
        return True
    
    async def subdel(self, Id: int, subjectId: list[Optional[str]]):
        aaa = []
        for subid in subjectId:
            aaa.append((Id, subid))

        db = mysql.connector.connect(
                                            host="localhost",
                                            user=self.config.db_username,
                                            password=self.config.db_password,
                                            database=self.config.db_name
                                            )     
        mycursor = db.cursor()
        if True:
            try:
                mycursor.executemany("DELETE FROM subjectregister WHERE (Id = %s) and (subjectId = %s);", aaa)
                db.commit()
            except mysql.connector.Error as error:
                print("Failed to insert record to database rollback: {}".format(error))
                db.rollback()
            mycursor.close()
            db.close()
       
        return True    