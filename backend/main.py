from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from routers import presentations

load_dotenv()

app = FastAPI('AI Presentation Assistant API')

origins = os.getenv('ALLOWED_ORIGINS', '').split(',')
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=['*'], allow_headers=['*'])
app.include_router(presentations.router())

@app.get('/')
def root():
    return {'message': 'AI Presentation Assistant API'}