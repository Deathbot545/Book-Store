# Book Management App

Simple full-stack CRUD application for managing books.

- Backend: ASP.NET Core Web API (.NET 8, in-memory storage)
- Frontend: Angular

## Prerequisites

- .NET SDK 8+
- Node.js 20+ and npm

## Project Structure

- `backend/BookApi` - REST API
- `frontend` - Angular web app

## Run the Application

Open two terminals from the repository root.

### 1) Start Backend API

```powershell
cd backend/BookApi
dotnet run --launch-profile https
```

Expected API base URLs:
- `https://localhost:7210`
- `http://localhost:5241`

Swagger UI:
- `https://localhost:7210/swagger`

### 2) Start Frontend

```powershell
cd frontend
npm install
npm start
```

Frontend URL:
- `http://localhost:4200`

## API Endpoints

- `GET /api/books` - Get all books
- `GET /api/books/{id}` - Get a single book by id
- `POST /api/books` - Create a new book
- `PUT /api/books` - Update an existing book
- `DELETE /api/books/{id}` - Delete a book

## Notes

- Data is stored in-memory (`List<Book>`) and resets when backend restarts.
- CORS is enabled for Angular dev server origin `http://localhost:4200`.
- Frontend API base URL is configured in `frontend/src/environments/environment.ts`.
