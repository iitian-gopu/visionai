# 🤖 VisionAI

### Production-Style Multi-Agent AI Workspace with LangGraph, RAG, Web Search, Code Generation, Document Generation & Multimodal AI

VisionAI is a full-stack **multi-agent Generative AI platform** that intelligently routes user requests to specialized AI agents for general conversation, coding, real-time web search, PDF question answering, document generation, presentation generation, image generation, and image understanding.

The platform combines a **React frontend**, **Node.js/Express microservices**, **LangChain + LangGraph orchestration**, **Qdrant vector search**, **Redis memory**, **MongoDB persistence**, multiple LLM providers, Firebase authentication, Razorpay billing, and an AWS-based deployment architecture.

The system is designed as more than a chatbot: each request can be dynamically classified, routed, enriched with external context or uploaded documents, processed by a specialized agent, persisted as conversation history, and returned as text, images, downloadable files, or interactive code artifacts.

---

## ✨ Key Features

* 🧠 **LangGraph-powered multi-agent orchestration**
* 🔀 Automatic request routing based on user intent
* 💬 Conversational AI with persistent conversation history
* 🌐 Real-time web search using Tavily
* 💻 AI coding agent for generation, debugging, review and optimization
* 🖥️ Interactive Monaco-based code artifact viewer
* 👁️ Sandboxed live HTML/CSS/JavaScript preview
* 📄 PDF Retrieval-Augmented Generation using Qdrant
* 📑 AI-generated downloadable PDF documents
* 📊 AI-generated PowerPoint presentations
* 🎨 AI image generation
* 🖼️ Multimodal image analysis using Gemini
* 🎙️ Browser speech-to-text input
* 📎 PDF and image uploads up to 20 MB
* 🧠 Redis-backed conversational memory
* 💾 MongoDB conversation and application persistence
* 🔐 Google authentication with Firebase
* 🍪 Redis-backed authenticated sessions
* 💳 Razorpay subscription/credit payments
* ⚡ Per-user and per-agent rate limiting
* 💰 Credit-based AI usage system
* 📦 Dockerized backend services
* ☁️ AWS ECS + ECR backend deployment
* 🌍 S3 + CloudFront frontend hosting
* 🔄 GitHub Actions CI/CD deployment workflow

---

# 🏗️ System Architecture

```mermaid
flowchart TB

    U[User / Browser]

    FE["React + Vite Frontend"]

    GW["API Gateway<br/>Node.js + Express"]

    AUTH["Auth Service"]
    CHAT["Chat Service"]
    AGENT["Agent Service"]
    BILLING["Billing Service"]

    LG["LangGraph Orchestrator"]

    ROUTER["AI Router"]

    CHATAGENT["Chat Agent"]
    SEARCH["Search Agent"]
    CODE["Coding Agent"]
    PDFRAG["PDF RAG Agent"]
    PDF["PDF Generator"]
    PPT["PPT Generator"]
    VISION["Image Generator"]
    IMG["Image Analyzer"]

    GROQ["Groq LLM"]
    OR["OpenRouter / DeepSeek"]
    GEMINI["Google Gemini"]
    TAVILY["Tavily Search"]

    QDRANT["Qdrant Vector DB"]
    REDIS["Redis"]
    MONGO["MongoDB"]
    S3["Amazon S3"]
    FIREBASE["Firebase Auth"]
    RAZORPAY["Razorpay"]

    U --> FE
    FE --> GW

    GW --> AUTH
    GW --> CHAT
    GW --> AGENT
    GW --> BILLING

    AUTH --> FIREBASE
    AUTH --> REDIS
    AUTH --> MONGO

    CHAT --> MONGO

    BILLING --> RAZORPAY
    BILLING --> MONGO
    BILLING --> AUTH

    AGENT --> LG
    AGENT --> REDIS
    AGENT --> CHAT
    AGENT --> AUTH

    LG --> ROUTER

    ROUTER --> CHATAGENT
    ROUTER --> SEARCH
    ROUTER --> CODE
    ROUTER --> PDFRAG
    ROUTER --> PDF
    ROUTER --> PPT
    ROUTER --> VISION
    ROUTER --> IMG

    CHATAGENT --> GROQ

    SEARCH --> TAVILY
    SEARCH --> CHATAGENT

    CODE --> OR

    PDFRAG --> QDRANT
    PDFRAG --> GEMINI
    PDFRAG --> GROQ

    PDF --> S3
    PPT --> S3

    VISION --> S3

    IMG --> GEMINI
```

---

# 🧠 Multi-Agent Architecture

VisionAI uses **LangGraph** to create a stateful AI workflow.

Every incoming prompt is passed through a router that decides which specialized agent should handle it.

Users can also manually select an agent from the frontend.

### Available modes

| Agent              | Responsibility                                      |
| ------------------ | --------------------------------------------------- |
| **Auto**           | Automatically determines the correct agent          |
| **Chat**           | General questions, explanations and conversation    |
| **Search**         | Current information and internet search             |
| **Coding**         | Code generation, debugging, review and optimization |
| **PDF**            | Generates downloadable PDF documents                |
| **PPT**            | Generates downloadable PowerPoint presentations     |
| **Vision**         | Generates images                                    |
| **PDF RAG**        | Automatically activated for uploaded PDFs           |
| **Image Analyzer** | Automatically activated for uploaded images         |

---

# 🔀 Intelligent Agent Routing

When the frontend sends:

```text
POST /api/agent/chat
```

the request reaches the Agent Service.

The request contains information such as:
