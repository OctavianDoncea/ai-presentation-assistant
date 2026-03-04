from multiprocessing import Value
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List
import schemas, crud
from database import SessionLocal
from services.llm import generate_slides_from_text
from services.file_processor import process_upload

router = APIRouter(prefic='/presentations', tags=['presentations'])

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally: 
        db.close()

@router.post("/generate", response_model=List[schemas.Slide])
async def generate_from_text(topic: str = Form(...)):
    slides_data = await generate_slides_from_text(topic)
    return slides_data

@router.post('/generate-from-file', response_model = List[schemas.Slide])
async def generate_from_file(file: UploadFile = File(...)):
    try:
        text = await process_upload(file)
    except ValueError as e:
        raise HTTPException(status_code = 400, detail=str(e))
    
    slides_data = await generate_slides_from_text(text)
    return slides_data

@router.post('/', response_model=schemas.PresentationOut)
def create_presentation(presentation: schemas.PresentationCreate, db: Session = Depends(get_db)):
    return crud.create_presentation(db=db, presentation=presentation)

@router.get('/', response_model=List[schemas.PresentationOut])
def read_multiple_presentations(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_multiple_presentations(db, skip=skip, limit=limit)

@router.get('/{presentation_id}', response_model=schemas.PresentationOut)
def read_presentation(presentation_id: int, db: Session = Depends(get_db)):
    db_presentation = crud.get_presentation(db, presentation_id=presentation_id)

    if db_presentation is None:
        raise HTTPException(status_code = 404, detail='Presentation not found')
    
    return db_presentation

@router.put('/{presentation_id}', response_model=schemas.PresentationOut)
def update_presentation(presentation_id: int, presentation: schemas.PresentationCreate, db: Session = Depends(get_db)):
    db_presentation = crud.update_presentation(db, presentation_id=presentation_id, presentation=presentation)

    if db_presentation is None:
        raise HTTPException(status_code=404, detail="Presentation not found")

    return db_presentation

@router.delete("/{presentation_id}")
def delete_presentation(presentation_id: int, db: Session = Depends(get_db)):
    db_presentation = crud.delete_presentation(db, presentation_id=presentation_id)

    if db_presentation is None:
        raise HTTPException(status_code=404, detail='Presentation not found')

    return {'ok': True}