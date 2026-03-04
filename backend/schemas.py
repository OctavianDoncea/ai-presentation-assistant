from pydantic import BaseModel
from typing import Optional, List, Any
from datetime import datetime

class CharData(BaseModel):
    type: str
    data: Any

class Slide(BaseModel):
    title: str
    bullets: List[str]
    chart: Optional[CharData] = None

class PresentationBase(BaseModel):
    title: str
    content: List[Slide]

class PresentationCreate(PresentationBase):
    pass

class PresentationOut(PresentationBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True