# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

# OpenLuma Frontend – Architecture & Flow

## Overview

### The OpenLuma frontend is a React-based application that provides a secure, private interface for interacting with a personal AI knowledge assistant. It handles authentication, file uploads, semantic search via RAG, and an AI chat interface while relying on HTTP-only cookies for security.

## High-Level Frontend Architecture

```mermaid
flowchart TB
User --> Browser
Browser --> ReactApp
ReactApp --> Router
ReactApp --> ZustandStore
ReactApp --> APIClient
APIClient --> BackendAPI
```

## Application Routing Flow

```mermaid
flowchart LR
Root["/"] --> AuthCheck
AuthCheck -->|Authenticated| Dashboard
AuthCheck -->|Not Authenticated| LandingPage

    LandingPage --> Login
    LandingPage --> Register

    Login --> Dashboard
    Register --> VerifyEmailPage

    Dashboard --> Upload
    Dashboard --> Files
    Dashboard --> AskAI
```

## Authentication Flow (Cookie-Based)

```mermaid
sequenceDiagram
participant User
participant Frontend
participant Backend

    User ->> Frontend: Enter credentials
    Frontend ->> Backend: POST /auth/login
    Backend ->> Backend: Validate credentials
    Backend ->> Frontend: Set accessToken cookie
    Frontend ->> Backend: GET /users/me
    Backend ->> Frontend: User profile
    Frontend ->> User: Logged in
```

## Auto Session Recovery on Refresh

```mermaid
sequenceDiagram
participant Browser
participant Frontend
participant Backend

    Browser ->> Frontend: Page reload
    Frontend ->> Backend: GET /users/me
    Backend -->> Frontend: 200 User
    Frontend ->> Browser: Restore session
```

## Auto Logout on Token Expiry

```mermaid
sequenceDiagram
participant Frontend
participant Backend

    Frontend ->> Backend: API request
    Backend -->> Frontend: 401 Unauthorized
    Frontend ->> Backend: POST /auth/refresh
    alt Refresh valid
        Backend -->> Frontend: New cookies
        Frontend ->> Backend: Retry request
    else Refresh invalid
        Backend -->> Frontend: 401
        Frontend ->> Frontend: Logout user
    end
```

## File Upload Flow

```mermaid
sequenceDiagram
participant User
participant Frontend
participant Backend

    User ->> Frontend: Select files
    Frontend ->> Backend: POST /files/upload
    Backend ->> Backend: Extract text
    Backend ->> Backend: Chunk content
    Backend ->> Backend: Generate embeddings
    Backend ->> Backend: Store vectors
    Backend -->> Frontend: Upload success
    Frontend ->> Backend: GET /files
    Backend -->> Frontend: Updated file list
```

## File Management (Archive / Unarchive)

```mermaid
flowchart LR
FileList --> ArchiveAction
ArchiveAction --> BackendArchive
BackendArchive --> FileListRefresh

    FileList --> UnarchiveAction
    UnarchiveAction --> BackendUnarchive
    BackendUnarchive --> FileListRefresh
```

## Ask AI (RAG Chat) Flow

```mermaid
sequenceDiagram
participant User
participant Frontend
participant Backend

    User ->> Frontend: Ask question
    Frontend ->> Backend: POST /ask
    Backend ->> Backend: Embed question
    Backend ->> Backend: Vector search
    Backend ->> Backend: Build context
    Backend ->> Backend: Generate answer
    Backend -->> Frontend: Answer + sources
    Frontend ->> User: Render AI response
```

## Chat History (Local Storage)

```mermaid
flowchart TB
AskAI --> SaveQuestion
SaveQuestion --> LocalStorage
LocalStorage --> SidebarHistory
```

Rules:

Only last 10 questions stored

Per-user browser storage

Cleared on logout

## State Management (Zustand)

```mermaid
flowchart TB
ZustandStore --> AuthState
ZustandStore --> FileState
ZustandStore --> ChatState

    AuthState --> isAuthenticated
    AuthState --> user

    FileState --> files
    FileState --> archivedFiles

    ChatState --> messages
    ChatState --> loading
```

## UI Layout Structure

```mermaid
flowchart TB
AppLayout --> Sidebar
AppLayout --> Topbar
AppLayout --> PageContent

    Sidebar --> Navigation
    Sidebar --> ChatHistory
    Sidebar --> UserMenu

    PageContent --> Dashboard
    PageContent --> Upload
    PageContent --> Files
    PageContent --> AskAI
```

## Security Model (Frontend)

```mermaid
flowchart LR
Cookies --> HTTPOnly
Cookies --> Secure
Cookies --> SameSite

    HTTPOnly --> NoJSAccess
    Secure --> HTTPSOnly
    SameSite --> CrossSiteAllowed
```

## Environment Configuration

```mermaid
flowchart TB
EnvVars --> API_URL
EnvVars --> ProductionMode
ProductionMode --> SecureCookies
```

## Environment Variable

```bash
VITE_API_URL=Backend_url

OPENLUMA_RECENT_QUESTIONS_KEY="openluma_recent_questions";

```

## Summary

Cookie-based authentication

No tokens stored in localStorage

RAG-powered AI chat

Local-first chat history

Clean separation of concerns

Production-ready architecture
