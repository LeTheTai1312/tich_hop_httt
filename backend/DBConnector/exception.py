import mysql.connector
from config import Settings
from model.model import *
from model.class_regModel import *
from fastapi import HTTPException
from typing import List, Optional
from starlette.exceptions import HTTPException as StarletteHTTPException
from typing import Any, Dict, Optional, Sequence, Type

# class CarNotMatchException(Exception):
#     def __init__(self, m):
#         self.message = m
#     def __str__(self):
#         return self.message

class CarMaxException(Exception):
    def __init__(self, m: Any = None) -> None:
        super().__init__(m=m)