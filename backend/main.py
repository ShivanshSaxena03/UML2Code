from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import base64
import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GOOGLE_API_KEY:
    raise Exception("GOOGLE_API_KEY not found in .env file")
import os

PORT = int(os.environ.get("PORT", 10000))
app = FastAPI(title="UML to Code API (Gemini REST)")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Language mapping
LANGUAGE_PROMPTS = {
    "python": "Python",
    "cpp": "C++",
    "c": "C",
    "java": "Java",
}

# 🔥 Gemini REST API call
def generate_code_from_image(image_bytes, content_type, prompt):
    MODEL = "gemini-2.5-flash"

    url = f"https://generativelanguage.googleapis.com/v1/models/{MODEL}:generateContent?key={GOOGLE_API_KEY}"
    image_base64 = base64.b64encode(image_bytes).decode("utf-8")

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt},
                    {
                        "inlineData": {
                            "mimeType": content_type,
                            "data": image_base64
                        }
                    }
                ]
            }
        ]
    }

    headers = {
        "Content-Type": "application/json"
    }

    response = requests.post(url, headers=headers, json=payload)

    if response.status_code != 200:
        raise Exception(response.text)

    result = response.json()

    return result["candidates"][0]["content"]["parts"][0]["text"]


@app.post("/convert")
async def convert_uml_to_code(
    file: UploadFile = File(...),
    language: str = Form(...),
):
    if language not in LANGUAGE_PROMPTS:
        raise HTTPException(status_code=400, detail="Unsupported language")

    contents = await file.read()
    if not contents:
        raise HTTPException(status_code=400, detail="Empty file uploaded")

    content_type = file.content_type or "image/png"
    if content_type not in ("image/png", "image/jpeg", "image/webp", "image/gif"):
        raise HTTPException(status_code=400, detail="Invalid image format")

    lang_name = LANGUAGE_PROMPTS[language]

    try:
        prompt = f"""
Analyze this UML diagram carefully and generate complete, production-ready {lang_name} code.

Instructions:
1. Identify all classes, interfaces, relationships
2. Generate complete compilable {lang_name} code
3. Include constructors, getters/setters
4. Implement relationships (inheritance, composition, aggregation)
5. Add brief comments
6. Return ONLY code (no markdown)
"""

        code = generate_code_from_image(contents, content_type, prompt)

        # Remove markdown fences if present
        if code.startswith("```"):
            lines = code.split("\n")
            code = "\n".join(lines[1:-1]) if lines[-1].strip() == "```" else "\n".join(lines[1:])

        return JSONResponse({"code": code, "language": language})

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/health")
def health():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=PORT)