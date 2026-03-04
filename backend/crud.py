from sqlalchemy.orm import Session
from models import Presentation
from schemas import PresentationCreate

def get_presentation(db: Session, presentation_id: int):
    return db.query(Presentation).filter(Presentation.id == presentation_id).first()

def get_multiple_presentations(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Presentation).offset(skip).limit(limit).all()

def create_presentation(db: Session, presentation: PresentationCreate):
    db_presentation = Presentation(title=presentation.title, content=presentation.content.model_dump())
    db.add(db_presentation)
    db.commit()
    db.refresh(db_presentation)

    return db_presentation

def update_presentation(db: Session, presentation_id: int, presentation: PresentationCreate):
    db_presentation = db.query(Presentation).filter(Presentation.id == presentation_id).first()

    if db_presentation:
        db_presentation.title = presentation.title
        db_presentation.content = presentation.content.model_dump()
        db.commit()
        db.refresh(db_presentation)

    return db_presentation

def delete_presentation(db: Session, presentation_id: int):
    db_presentation = db.query(Presentation).filter(Presentation.id == presentation_id).first()

    if db_presentation:
        db.delete(db_presentation)
        db.commit()

    return db_presentation