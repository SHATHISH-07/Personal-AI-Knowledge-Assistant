# Personal AI Knowledge Assistant

## Project Overview

The **Personal AI Knowledge Assistant** is a full-stack web application that allows users to store their own knowledge—such as code files, text notes, and personal book notes—and ask AI-powered questions based **only on their uploaded data**.

Unlike public AI tools, this system does not rely on internet data or generic pre-trained answers.  
Instead, it uses a **Retrieval-Augmented Generation (RAG)** architecture to retrieve relevant information from the user’s private database and generate accurate, context-aware responses.

---

## Problem Statement

Developers and learners often:

- Reuse the same authentication logic, utilities, or notes across multiple projects
- Forget implementation details over time
- Manually search through old files, notes, or repositories

Existing AI tools:

- Do not understand personal codebases or private notes
- Cannot answer questions strictly from user-owned data
- Raise privacy concerns when uploading sensitive logic

---

## Solution

This project provides a **private, user-scoped AI assistant** where:

- Users upload code files and text-based notes
- The system processes, chunks, and embeds the content
- An AI model answers questions using **only the uploaded data**
- Each user’s data is fully isolated and secure

---

## Core Features

### Authentication

- Email and password authentication using JWT
- Google OAuth 2.0 login
- Stateless session handling with secure token-based authentication

---

### Knowledge Management

- Upload code files (`.js`, `.ts`, `.py`) and text files (`.txt`, `.md`)
- Automatic text extraction on upload
- Archive and unarchive uploaded files (soft delete)
- View uploaded knowledge through a user dashboard

---

### AI Question Answering

- Ask natural language questions about uploaded content
- Uses vector similarity search to retrieve relevant information
- AI generates responses strictly from user data
- Answers are generated on demand and are not stored

---

## Data Architecture

### MongoDB Atlas Stores

- User data
- File metadata
- Extracted text (backup and source of truth)

### Qdrant Cloud Stores

- Vector embeddings
- Chunk-level metadata for fast semantic search

---

## System Workflow

### File Upload Flow

1. User uploads a file
2. Backend extracts text from the file
3. File metadata is saved in MongoDB
4. Extracted text is stored in a backup collection
5. Text is split into meaningful chunks
6. Each chunk is converted into a vector embedding
7. Embeddings are stored in Qdrant Cloud

---

### Question Answering Flow

1. User submits a question
2. The question is converted into an embedding
3. Vector similarity search retrieves relevant chunks
4. Retrieved chunks are injected into the AI prompt
5. AI generates a contextual response
6. The response is returned to the user

---

## Chunking Strategy

- **Code files** are split by functions, classes, or logical blocks
- **Text and book notes** are split by concepts or sections
- Context overlap is preserved to avoid loss of meaning
- A single file can generate multiple chunks linked by a common file ID

---

## Technology Stack

### Frontend

- React JS
- Tailwind CSS
- Shadcn UI
- Axios

---

### Backend

- Node.js
- NestJS (Express adapter)
- JWT Authentication
- Google OAuth 2.0
- Request validation
- Rate limiting using NestJS Throttler
- Logging using NestJS Logger

---

### Databases

- MongoDB Atlas (primary data store)
- Qdrant Cloud (vector database)

---

### Environment Management

- dotenv

---

## Database Schemas

### User Data

```json
{
  "_id": "u1",
  "email": "example.email@gmail.com",
  "authProvider": "local | google",
  "passwordHash": "hashed_password_or_null",
  "googleId": "google_user_id_or_null",
  "profilePic": "profile_image_url_or_null",
  "isActive": true,
  "isArchived": false,
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### File Data

```json
{
  "_id": "f1",
  "userId": "u1",
  "fileName": "auth.ts",
  "fileType": "code | text",
  "uploadedAt": "Date",
  "isArchived": false,
  "language": "typescript",
  "size": 2450
}
```

### Vector Database (Qdrant)

```json
{
  "id": "chunk_01",
  "embedding": [0.12, -0.45, "..."],
  "text": "export async function login(...) { ... }",
  "metadata": {
    "userId": "u1",
    "fileId": "f1",
    "fileName": "auth.ts",
    "feature": "login",
    "chunkIndex": 1,
    "chunkType": "code",
    "embeddingModel": "text-embedding-3-small"
  }
}
```

### Content Source Database

```json
{
  "_id": "t1",
  "fileId": "f1",
  "userId": "u1",
  "extractedText": "export async function login(...) { ... }",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

---

## API Endpoints

### Authentication

POST /auth/register

POST /auth/login

POST /auth/google

POST /auth/logout

---

### File Management

POST /files/upload

GET /files

GET /files/:fileId

PATCH /files/:fileId/archive

PATCH /files/:fileId/unarchive

---

### AI

POST /ask

---

### System

GET /health

---

## Summary

The Personal AI Knowledge Assistant is a secure, AI-powered system that enables users to manage and query their own private knowledge base. By combining MongoDB Atlas, Qdrant Cloud, and a Retrieval-Augmented Generation architecture, the application delivers accurate, context-aware AI responses while maintaining strict data privacy and isolation.
