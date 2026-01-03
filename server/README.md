<p align="center">
  <img src="https://res.cloudinary.com/dylmrhy5h/image/upload/v1767442525/Gemini_Generated_Image_kphguxkphguxkphg_rk2rnl.png" width="450" alt="OpenLuma Logo" />
</p>

<h1 align="center">OpenLuma – Personal AI Knowledge Assistant (Backend)</h1>

<p align="center">
  A production-ready backend for a personal AI knowledge assistant built with NestJS, MongoDB, Vector Search (Qdrant), and Retrieval-Augmented Generation (RAG).
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-Backend-red" />
  <img src="https://img.shields.io/badge/MongoDB-Database-green" />
  <img src="https://img.shields.io/badge/Qdrant-VectorDB-blue" />
  <img src="https://img.shields.io/badge/RAG-Enabled-purple" />
</p>

---

## Overview

**OpenLuma** allows users to upload documents or code files and ask questions about their own content using AI.

The system:

- Extracts text from uploaded files
- Splits content into meaningful chunks
- Converts chunks into embeddings
- Stores them in a vector database
- Performs semantic search
- Uses an LLM to answer questions with **citations**

---

## Core Features

### Authentication & Security

- Email + Password authentication
- Google OAuth login
- JWT access tokens
- Refresh token rotation
- Logout support
- Rate-limited AI endpoints
- User-isolated data (multi-tenant safe)

---

### Email Workflows

- Email verification (secure token-based)
- Resend verification email
- Welcome email
- Password reset flow (secure, time-limited tokens)

---

### File Management

- Upload text or code files
- Detect file type automatically
- Store file metadata
- Archive / unarchive files
- Fetch user-specific files only

---

### Content Processing

- Text extraction from uploaded files
- Content stored in a separate MongoDB database
- Chunking strategies:
  - Text chunking (paragraph-aware)
  - Code chunking (function/class aware)

---

### Embeddings (Free & Local)

- Uses **Sentence Transformers**
- Model: `all-MiniLM-L6-v2`
- 384-dimensional embeddings
- No paid API required
- Production-safe

---

### Vector Database (Qdrant Cloud)

- Vector storage using Qdrant
- UUID-based point IDs
- Payload metadata:
  - userId
  - fileId
  - fileName
  - chunkIndex
  - chunkType
  - feature (for code)
- Indexed user filtering for secure search

---

### Semantic Search

- Query → embedding
- Cosine similarity search
- Score threshold filtering
- User-specific results only

---

### AI Question Answering (`/ask`)

- Retrieval-Augmented Generation (RAG)
- Context builder from top matching chunks
- Safe prompt (no hallucinations)
- Answers returned with sources
- LLM provider abstraction (pluggable)

---

### LLM Integration

- Current provider: **Groq Cloud**
- Model: `llama-3.1-8b-instant`
- Extremely fast & free tier
- Easily switchable to:
  - Google Gemini
  - DeepSeek
  - OpenAI (future)

---

## Architecture

```text
User
└── Authentication
    ├── Register
    │   ├── MongoDB (User DB)
    │   │   ├── email
    │   │   ├── passwordHash
    │   │   ├── authProvider
    │   │   └── isEmailVerified
    │   │
    │   ├── Email Verification
    │   │   ├── Token generated
    │   │   ├── Hashed token stored
    │   │   └── Verification email sent
    │   │
    │   └── Welcome Email (after verification)
    │
    ├── Login
    │   ├── Password / Google OAuth
    │   ├── Access Token (JWT – short lived)
    │   └── Refresh Token (hashed & stored)
    │
    ├── Token Refresh
    │   ├── Validate refresh token
    │   ├── Rotate refresh token
    │   └── Issue new access token
    │
    ├── Password Reset
    │   ├── Reset token generated
    │   ├── Hashed token stored
    │   ├── Email with reset link
    │   └── Password updated securely
    │
    └── Logout
        └── Refresh token invalidated
```

```text
User
└── Upload File
    ├── MongoDB (File Metadata)
    │   ├── fileName
    │   ├── fileType
    │   ├── size
    │   └── userId
    │
    ├── Content DB (Extracted Text)
    │   └── Full extracted content
    │
    ├── Chunking Engine
    │   ├── Text → paragraph-based chunks
    │   └── Code → function/class-based chunks
    │
    ├── Embedding Service
    │   └── Converts chunks → vectors (384-dim)
    │
    └── Qdrant Vector DB
        ├── Vector (embedding)
        ├── Payload:
        │   ├── userId
        │   ├── fileId
        │   ├── fileName
        │   ├── text
        │   ├── chunkIndex
        │   └── chunkType
        └── Indexed for semantic search
```

```text
User
└── Ask Question
    ├── Question → Embedding
    │
    ├── Qdrant Vector Search
    │   ├── Cosine similarity
    │   ├── userId filter
    │   └── Score threshold
    │
    ├── Context Builder
    │   ├── Top relevant chunks
    │   └── Source labeling
    │
    ├── Prompt Builder
    │   ├── Safe system prompt
    │   └── Context injection
    │
    ├── LLM (Groq – Llama 3.1)
    │
    └── Response
        ├── AI Answer
        └── Source references

```

---

## Tech Stack

- **Framework**: NestJS (TypeScript)
- **Auth**: JWT + OAuth
- **Databases**:
  - MongoDB (User, File metadata)
  - MongoDB (Content source – separate DB)
- **Vector DB**: Qdrant Cloud
- **Embeddings**: Sentence Transformers
- **LLM**: Groq Cloud
- **Email**: Brevo (SMTP / API)
- **Rate Limiting**: NestJS Throttler

---

## Environment Variables

```env
PORT=3000

## MongoDB URIs
USER_DB_URI=
CONTENT_DB_URI=

## Auth
JWT_SECRET=
GOOGLE_CLIENT_ID=

## Email
BREVO_SMTP_USER=
BREVO_SMTP_PASS=
MAIL_FROM=

## Qdrant DataBase
QDRANT_URL=
QDRANT_API_KEY=
QDRANT_COLLECTION=file_chunks

## LLM
HF_TOKEN=
EMBEDDING_MODEL=Xenova/all-MiniLM-L6-v2

GROQ_API_KEY=
GROQ_MODEL=llama-3.1-8b-instant

FRONTEND_URL=(Optional use Postman Instead if only Backend Focused)

```
