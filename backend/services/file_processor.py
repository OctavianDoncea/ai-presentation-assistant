import io
import csv
import PyPDF2
import docx
import pandas as pd
from fastapi import UploadFile

async def extract_text_from_pdf(file: UploadFile) -> str:
    pdf_reader = PyPDF2.PdfReader(file.file)
    text = ''

    for page in pdf_reader.pages:
        text += page.extract_text()
    
    return text

async def extract_text_from_docx(file: UploadFile) -> str:
    doc = docx.Document(io.BytesIO(await file.read()))
    text = "/n".join([para.text for para in doc.paragraphs])

    return text

async def extract_text_from_csv(file: UploadFile) -> str:
    content = await file.read()
    df = pd.read_csv(io.BytesIO(content))
    summary = f"CSV file with columns: {', '.join(df.columns)}/n"
    summary += f'Number of rows: {len(df)}/n'
    summary += 'First 5 rows:/n'
    summary += df.head().to_string()

    return summary

async def process_upload(file: UploadFile) -> str:
    ext = file.filename.split('.')[-1].lower()

    if ext == 'pdf':
        return await extract_text_from_pdf(file)
    elif ext == 'docx':
        return await extract_text_from_docx(file)
    elif ext == 'csv':
        return await extract_text_from_csv(file)
    else:
        raise ValueError('Unsupported file type. Please upload PDF, DOCX, or CSV.')