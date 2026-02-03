# Item Lending API — Backend Evolution (Phase 2)

## 📌 About This Project
This repository represents Phase 2 of the Item Lending API project.

The purpose of this phase is to evolve a well-structured backend API into a production-oriented application, focusing on persistence, validation, documentation and architectural maturity.

The project continues to use a simple domain on purpose, allowing the learning process to focus on backend fundamentals and real-world practices, not business complexity.

## 🎯 Learning Objectives (Phase 2)
- Integrate a relational database (PostgreSQL)
- Replace in-memory persistence with database repositories (Prisma)
- Implement database migrations and schema versioning
- Centralize error handling with a global error handler
- Strengthen backend architecture for real-world scenarios

## 🧱 Architecture
Layered architecture:
Routes → Controller → Service → Repository

## 🛠 Tech Stack
- Node.js + TypeScript
- Fastify
- Prisma ORM
- PostgreSQL (Docker)

## ✅ Requirements
- Node.js
- Docker Desktop

## 🚀 Getting Started

### 1) Start PostgreSQL (Docker)
Make sure your Postgres container is running (example):
- DB: `item_lending`
- User/Pass: `postgres/postgres`
- Port: `5432`

### 2) Create `.env`
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
> Note: Prisma Client is generated locally and is not committed to the repository.
> Run `npx prisma generate` after installing dependencies.
