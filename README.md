# 👑 MERIQ — Intelligent Adaptive Skill Learning & Screening Platform

[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React 18](https://img.shields.io/badge/React-18.3+-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4+-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Dataset](https://img.shields.io/badge/1,000_Resumes-PDF%20%7C%20CSV%20%7C%20JSON-D4AF37)](./meriq-backend/resumes_dataset/)

> **MERIQ** is an intelligent adaptive skill learning and diagnostic intelligence platform that accurately determines what a learner already knows, pinpoints granular conceptual bottlenecks (e.g., *OOP 34%*), recommends targeted explainable micro-curriculum, verifies knowledge gains (+53%), and integrates an academic benchmark corpus of **1,000 candidate resume PDFs** across 12 engineering domains.

---

## 🌟 Key Highlights

- 🌑 **Pitch-Black & Luxury Gold Design**: Pure OLED dark mode (`#000000`) with metallic gold accents (`#D4AF37` / `#F59E0B`).
- 🌳 **Interactive Skill Graph**: Multi-level prerequisite concept trees with real-time mastery tracking across 4 performance tiers.
- 🎯 **Concept-Level Adaptive Diagnostic**: 10-question probe that evaluates granular knowledge states rather than raw percentage scores.
- 💡 **Explainable Recommendations**: Targeted resources providing pedagogical rationale ("Why MERIQ Recommends This") and estimated completion time.
- 🔄 **Verification Retest**: Targeted post-learning assessment quantifying Before vs. After score deltas (+53% Gain).
- 📄 **1,000 Resume PDF Dataset**: Full synthetic corpus across 12 domains with individual PDF files, JSON index, CSV index, and batch ZIP export.

---

## 🏗️ Project Architecture

```
meriq/
├── meriq-app/                  # React 18 + Vite + Tailwind Frontend
│   ├── src/
│   │   ├── api/                # API client with live FastAPI / mock fallback
│   │   ├── components/         # Reusable UI components & navigation
│   │   ├── context/            # SkillContext state management & theme engine
│   │   └── pages/              # 11 full application pages
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
│
├── meriq-backend/              # FastAPI + Uvicorn + Pydantic Backend
│   ├── models/                 # Pydantic schema validation
│   ├── routers/                # REST endpoints (skills, assessment, resumes, analytics)
│   ├── services/               # Dynamic LLM generation, scoring & caching
│   ├── resumes_dataset/        # 1,000 PDF Resumes + CSV + JSON indices
│   ├── main.py                 # FastAPI server entrypoint
│   ├── config.py
│   └── requirements.txt
│
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18+)
- **Python** (v3.10+)

### 2. Frontend Setup (React + Vite)
```bash
cd meriq-app
npm install
npm run dev
```
The frontend will start at **http://localhost:5173**.

### 3. Backend Setup (FastAPI)
```bash
cd meriq-backend
pip install -r requirements.txt
python -m uvicorn main:app --port 8001 --host 127.0.0.1 --reload
```
The backend API and Swagger docs will be accessible at:
- **API Documentation**: [http://127.0.0.1:8001/docs](http://127.0.0.1:8001/docs)
- **Health Endpoint**: [http://127.0.0.1:8001/health](http://127.0.0.1:8001/health)

---

## 📊 1,000 Candidate Resume Dataset

Generate or refresh the dataset:
```bash
cd meriq-backend
python generate_500_resumes.py
```
Outputs:
- **PDF Directory**: `meriq-backend/resumes_dataset/pdf/` (`RES-0001` to `RES-1000`)
- **CSV Index**: `meriq-backend/resumes_dataset/resumes_index.csv`
- **JSON Corpus**: `meriq-backend/resumes_dataset/resumes_index.json`
- **Batch Export**: `GET /api/resumes/download/all-zip`

---

## 📜 Academic Project

Developed as an **Intelligent Adaptive Skill Learning & Recruitment Screening Platform** (CSS7102 Mini-Project).
