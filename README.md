# Book Management App

A full-stack web application for managing a collection of books. Built with **Angular** on the frontend and **ASP.NET Core Web API (.NET 8)** on the backend, communicating over REST/JSON.

Users can **add**, **view**, **edit**, and **delete** books from a clean single-page interface.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Run the Backend](#2-run-the-backend)
  - [3. Run the Frontend](#3-run-the-frontend)
- [Running Tests](#running-tests)
- [API Reference](#api-reference)
- [Data Model](#data-model)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)

---

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | Angular 19, TypeScript, CSS         |
| Backend   | ASP.NET Core Web API, C#, .NET 8    |
| Storage   | In-memory `List<Book>` (no database)|
| API Docs  | Swagger / OpenAPI (auto-generated)  |

---

## Prerequisites

Make sure the following tools are installed before you begin.

| Tool | Required Version | Download |
|------|-----------------|----------|
| .NET SDK | 8.0 or later | https://dotnet.microsoft.com/download |
| Node.js | 20.0 or later | https://nodejs.org |
| npm | Included with Node.js | — |
| Angular CLI | Installed automatically via npm | — |

Verify your installations:

```bash
dotnet --version   # should print 8.x.x
node --version     # should print v20.x.x or later
npm --version      # should print 10.x.x or later
```

---

## Project Structure

```
book-management-app/
├── backend/
│   └── BookApi/
│       ├── BookApi.csproj        # .NET project file
│       ├── Program.cs            # API endpoints + CORS config
│       ├── appsettings.json
│       └── Properties/
│           └── launchSettings.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.component.ts  # Main CRUD component
│   │   │   ├── app.component.html
│   │   │   ├── app.component.css
│   │   │   ├── app.config.ts     # HTTP client provider
│   │   │   ├── book.model.ts     # Book interface
│   │   │   └── book.service.ts   # HTTP service layer
│   │   ├── environments/
│   │   │   └── environment.ts    # API base URL config
│   │   └── index.html
│   ├── angular.json
│   └── package.json
└── README.md
```

---

## Getting Started

You will need **two terminals** open — one for the backend and one for the frontend.

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd book-management-app
```

---

### 2. Run the Backend

```bash
cd backend/BookApi
dotnet run
```

The API will be available at:

| Protocol | URL |
|----------|-----|
| HTTP | http://localhost:5241 |
| HTTPS | https://localhost:7210 |

Swagger UI (interactive API docs):

```
http://localhost:5241/swagger
```

> **Note:** On first run, .NET may ask you to trust the dev HTTPS certificate. Run `dotnet dev-certs https --trust` if prompted.

---

### 3. Run the Frontend

Open a **second terminal**:

```bash
cd frontend
npm install
npm start
```

The Angular app will be available at:

```
http://localhost:4200
```

Open that URL in your browser. The app connects to the backend automatically.

---

## Running Tests

### Frontend unit tests

```bash
cd frontend
npm test
```

This runs the Karma/Jasmine test suite in a browser watcher.

### Backend (manual via Swagger)

With the backend running, open `http://localhost:5241/swagger` to interactively call every endpoint and inspect responses.

---

## API Reference

All endpoints are prefixed with `/api/books` and exchange **JSON**.

### Get all books

```
GET /api/books
```

**Response `200 OK`**
```json
[
  {
    "id": 1,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "isbn": "978-0132350884",
    "publicationDate": "2008-08-01"
  }
]
```

---

### Get a single book

```
GET /api/books/{id}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `int` | Book ID |

**Response `200 OK`** — book object  
**Response `404 Not Found`** — no book with that ID

---

### Create a book

```
POST /api/books
```

**Request body**
```json
{
  "id": 0,
  "title": "The Pragmatic Programmer",
  "author": "David Thomas",
  "isbn": "978-0135957059",
  "publicationDate": "2019-09-13"
}
```

> The `id` field is ignored on creation — the server assigns it automatically.

**Response `201 Created`** — the created book with its assigned `id`

---

### Update a book

```
PUT /api/books
```

**Request body** — same shape as POST, but `id` must match an existing record.

**Response `200 OK`** — updated book object  
**Response `404 Not Found`** — no book with that ID

---

### Delete a book

```
DELETE /api/books/{id}
```

**Response `204 No Content`** — deleted successfully  
**Response `404 Not Found`** — no book with that ID

---

## Data Model

| Field | Type | Description |
|-------|------|-------------|
| `id` | `int` | Auto-assigned unique identifier |
| `title` | `string` | Book title |
| `author` | `string` | Author name |
| `isbn` | `string` | ISBN number |
| `publicationDate` | `string (date)` | Format: `YYYY-MM-DD` |

---

## Configuration

### Backend — CORS

CORS is configured in `backend/BookApi/Program.cs` to allow any `localhost` origin, so both `http://localhost:4200` and `https://localhost:4200` work without changes.

### Frontend — API base URL

The frontend reads the backend URL from:

```
frontend/src/environments/environment.ts
```

```ts
export const environment = {
  apiBaseUrl: 'http://localhost:5241'
};
```

If your backend runs on a different port, update `apiBaseUrl` here and restart the Angular dev server.

---

## Troubleshooting

**`npm start` fails with `'ng' is not recognized`**  
→ Run `npm install` inside the `frontend/` folder first.

**Frontend shows "Failed to load books"**  
→ Make sure the backend is running (`dotnet run` in `backend/BookApi`).  
→ Check that `apiBaseUrl` in `environment.ts` matches the backend port.

**HTTPS certificate error in browser**  
→ Run `dotnet dev-certs https --trust` once, then restart the backend.

**Port already in use**  
→ Edit `backend/BookApi/Properties/launchSettings.json` to change the port, then update `environment.ts` to match.

**Data disappears after restart**  
→ This is expected — storage is in-memory. All data resets when the backend process stops.
