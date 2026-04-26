import { useState, useRef, useCallback } from "react";
import Editor from "./Editor";
import "./App.css";

const LANGUAGES = [
  { id: "python", label: "Python", icon: "🐍", ext: "py" },
  { id: "cpp", label: "C++", icon: "⚙️", ext: "cpp" },
  { id: "c", label: "C", icon: "🔧", ext: "c" },
  { id: "java", label: "Java", icon: "☕", ext: "java" },
];

export default function App() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [language, setLanguage] = useState("python");
  const [apiKey, setApiKey] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file (PNG, JPG, WEBP, GIF).");
      return;
    }
    setImage(file);
    setError("");
    setCode("");
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, []);
const handleConvert = async () => {
  if (!image) return setError("Please upload a UML diagram image.");
  // ❌ remove this line
  // if (!apiKey.trim()) return setError("Please enter your API key");

  setLoading(true);
  setError("");
  setCode("");

  const formData = new FormData();
  formData.append("file", image);
  formData.append("language", language);
  // ❌ REMOVE THIS
  // formData.append("api_key", apiKey);
try{
  const API_URL = import.meta.env.VITE_API_URL;
  const res = await fetch(`${API_URL}/convert`, {
    method: "POST",
    body: formData,
  });

    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Conversion failed");

    setCode(data.code);
  } catch (e) {
    setError(e.message);
  } finally {
    setLoading(false);
  }
};

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const lang = LANGUAGES.find((l) => l.id === language);
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `output.${lang.ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const selectedLang = LANGUAGES.find((l) => l.id === language);

  return (
    <div className="app">
      {/* Ambient background shapes */}
      <div className="bg-shape s1" />
      <div className="bg-shape s2" />
      <div className="bg-shape s3" />

      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">⬡</span>
            <span className="logo-text">UML<em>Converter</em></span>
          </div>
          <p className="tagline">Drop a diagram. Pick a language. Get code.</p>
        </div>
      </header>

      <main className="main">
        {/* LEFT PANEL */}
        <section className="panel panel-left">

          <div className="panel-section">
            <label className="field-label">Target Language</label>
            <div className="lang-grid">
              {LANGUAGES.map((l) => (
                <button
                  key={l.id}
                  className={`lang-btn ${language === l.id ? "active" : ""}`}
                  onClick={() => setLanguage(l.id)}
                >
                  <span className="lang-icon">{l.icon}</span>
                  <span className="lang-name">{l.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="panel-section">
            <label className="field-label">UML Diagram</label>
            <div
              className={`drop-zone ${dragOver ? "drag-over" : ""} ${imagePreview ? "has-image" : ""}`}
              onClick={() => fileInputRef.current.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="UML preview" className="preview-img" />
              ) : (
                <div className="drop-hint">
                  <span className="drop-icon">🖼</span>
                  <span className="drop-text">Click or drag & drop your UML image</span>
                  <span className="drop-sub">PNG · JPG · WEBP · GIF</span>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleFile(e.target.files[0])}
            />
            {imagePreview && (
              <button className="change-btn" onClick={() => fileInputRef.current.click()}>
                ↩ Change image
              </button>
            )}
          </div>

          {error && <div className="error-box">⚠ {error}</div>}

          <button
            className={`convert-btn ${loading ? "loading" : ""}`}
            onClick={handleConvert}
            disabled={loading}
          >
            {loading ? (
              <><span className="spinner" /> Generating {selectedLang.label} code…</>
            ) : (
              <><span>✦</span> Generate {selectedLang.label} Code</>
            )}
          </button>
        </section>

        {/* RIGHT PANEL */}
        <section className="panel panel-right">
          <div className="code-header">
            <span className="code-title">
              {selectedLang.icon} {selectedLang.label} Output
            </span>
            {code && (
              <div className="code-actions">
                <button className="action-btn" onClick={handleCopy}>
                  {copied ? "✓ Copied" : "⎘ Copy"}
                </button>
                <button className="action-btn" onClick={handleDownload}>
                  ↓ Download
                </button>
              </div>
            )}
          </div>

          <div className="code-body">
            {code ? (
              <Editor code={code} language={language} />
            ) : (
              <div className="code-empty">
                <div className="empty-visual">
                  <div className="empty-box b1" />
                  <div className="empty-box b2" />
                  <div className="empty-box b3" />
                  <div className="empty-arrow" />
                </div>
                <p>Your generated code will appear here</p>
                <span>Upload a UML diagram and click Generate</span>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
