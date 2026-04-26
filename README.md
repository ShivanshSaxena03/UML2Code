# UMLforge – UML Diagram to Code

Convert UML class diagrams into C, C++, Python, or Java code using Claude (Anthropic API).

---

## Project Structure

```
uml2code/
├── backend/
│   ├── main.py            # FastAPI server
│   └── requirements.txt
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── App.css
        └── Editor.jsx
```

---

## Prerequisites

- Python 3.10+
- Node.js 18+
- An **Anthropic API key** (get one at https://console.anthropic.com)

---

## Setup & Run

### 1. Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Backend runs at: http://localhost:8000

### 2. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: http://localhost:3000

---

## Usage

1. Open http://localhost:3000 in your browser
2. Enter your **API KEY** in the input field
3. Select your **target language** (Python, C++, C, or Java)
4. Upload a **UML class diagram** (PNG, JPG, WEBP, or GIF)
5. Click **Generate Code**
6. Copy or download the generated code

---

## Notes

- Your API key is **never stored** — it's sent directly to LLM per request
- The app uses `auto` model which supports vision (image input)
- Supports UML class diagrams with classes, interfaces, inheritance, associations, etc.
- The built-in syntax highlighter covers keywords, strings, comments, and numbers for all 4 languages
