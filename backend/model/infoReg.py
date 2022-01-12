from typing import Dict, List, Optional
from pydantic import BaseModel
from datetime import datetime

class Vehicle_Reg(BaseModel):
    Id: int
    name: str
    IDnumber: str
    vehicle: str
    start: str
    outOfDate: str
    month: int


if __name__ =="__main__":
    vehicle_reg = Vehicle_Reg()