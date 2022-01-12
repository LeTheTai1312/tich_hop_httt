from fastapi import FastAPI, Request, APIRouter
from fastapi.responses import HTMLResponse
from router import Router
import uvicorn, time
from datetime import date

#adding cors header
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

#adding cors urls  
origins = [
    'http://localhost:3000'
]

#add middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

app.include_router(Router.router)

if __name__ == "__main__":
    uvicorn.run(app,host="0.0.0.0")