import os
import httpx
import json
from typing import List, Dict, Any
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"

async def generate_slides_from_text(text: str) -> List[Dict[str, Any]]:
    prompt = f"""
    Based on the following content, generate a presentation with multiple slides.
    Return only a JSON array. Each element must have:
    - title (string)
    - bullets (array of strings)
    - chart (optional object with "type" and "data" appropriate for that slide)

    Content:
    {text}
    """

    async with httpx.AsyncClient() as client:
        response = await client.post(f"{GEMINI_API_KEY}", json={"contents": [{"parts": [{"text": prompt}]}]})
        result = response.json()

        try:
            text_response = result['candidates'][0]['content']['parts'][0]['text']

            if text_response.startswith("```json"):
                text_response = text_response[7:]
            if text_response.endswith("```"):
                text_response = text_response[:-3]
            
            slides = json.loads(text_response.strip())
            return slides
        except (KeyError, IndexError, json.JSONDecodeError) as e:
            return [{"title": "Error generating slides", "bullets": ["Please try again"]}]