# 🚀 UML to Code Generator

A full-stack web application that converts **UML diagrams into production-ready code** using AI.

Users can upload a UML diagram image, select a target programming language, and instantly generate structured code based on the diagram.

---

## 🌟 Features

- 📤 Upload UML diagram (PNG, JPG, WEBP, GIF)
- 🧠 AI-powered code generation using Google Gemini API
- 💻 Supports multiple languages:
  - Python 🐍
  - C++ ⚙️
  - C 🔧
  - Java ☕
- 🎯 Generates clean, structured, OOP-based code
- 📋 Copy to clipboard functionality
- ⬇️ Download generated code
- 🎨 Modern UI with drag-and-drop support
- ⚡ FastAPI backend with REST API
- 🌐 Fully deployable (Render + Vercel)

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- CSS (Custom UI styling)

### Backend
- FastAPI (Python)
- Google Gemini REST API
- Requests

### Deployment
- Frontend → Vercel
- Backend → Render

---

## 📂 Project Structure

```
UML-Code-Generator/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── Editor.jsx
│   │   ├── main.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── index.html
│   └── package.json
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── .env
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 🔹 1. Clone the repository

```bash
git clone https://github.com/your-username/UML2Code.git
cd UML2Code
```

---

## 🔹 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

### Create `.env`

```
GOOGLE_API_KEY=your_api_key_here
```

### Run server

```bash
uvicorn main:app --reload
```

👉 Backend runs on: `http://127.0.0.1:8000`

---

## 🔹 3. Frontend Setup

```bash
cd frontend
npm install
```

### Create `.env`

```
VITE_API_URL=http://127.0.0.1:8000
```

### Run frontend

```bash
npm run dev
```

👉 Frontend runs on: `http://localhost:5173`

---

## 🌐 Deployment

### Backend (Render)

- Connect GitHub repo
- Add environment variable:
  ```
  GOOGLE_API_KEY=your_key
  ```
- Start command:
  ```
  uvicorn main:app --host 0.0.0.0 --port 10000
  ```

---

### Frontend (Vercel)

- Import repo
- Add environment variable:
  ```
  VITE_API_URL=https://your-backend.onrender.com
  ```

---

## 🔐 Security

- API keys are stored securely using environment variables
- `.env` is excluded via `.gitignore`
- No sensitive data is exposed to frontend

---

## 🧠 How It Works

1. User uploads UML diagram
2. Image is sent to FastAPI backend
3. Backend encodes image in base64
4. Gemini API analyzes diagram
5. AI generates structured code
6. Code is returned and displayed in UI

---

## ⚠️ Limitations

- Accuracy depends on clarity of UML diagram
- Complex diagrams may need refinement
- Free-tier deployment may have cold start delays

---

## 🚀 Future Improvements

- 📁 Multi-file project generation
- 🧠 Code explanation & suggestions
- 🎨 Monaco editor integration (VS Code UI)
- 📦 Download as ZIP project
- 🌍 Custom domain deployment

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 📜 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

**Shivansh Saxena**

---

## 💼 Resume Line

Built a full-stack AI-powered application that converts UML diagrams into structured code using FastAPI, React, and Google Gemini API, deployed on Render and Vercel.