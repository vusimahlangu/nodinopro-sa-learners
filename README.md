# NodiNopro SA Learners

K53 Learner's License Preparation — interactive quizzes with user accounts, progress tracking and admin authoring.

## Overview
This repository is being converted into a full-stack interactive application: React + Vite frontend, Node.js + Express backend, and PostgreSQL via Prisma. The initial feature branch implements user authentication, quiz models, and a basic quiz-taking UI with progress persistence.

## Quickstart (local)

Prerequisites: Node.js (18+), pnpm or npm, and PostgreSQL (or use Docker).

1. Clone repository
   git clone https://github.com/vusimahlangu/nodinopro-sa-learners.git
   cd nodinopro-sa-learners

2. Backend
   cd backend
   cp .env.example .env
   # set DATABASE_URL and JWT_SECRET in .env
   npm install
   npx prisma generate
   npx prisma migrate dev --name init --preview-feature
   npm run seed
   npm run dev

3. Frontend
   cd ../frontend
   cp .env.example .env
   npm install
   npm run dev

4. Open the frontend URL printed by Vite (usually http://localhost:5173).

## Environment variables
See backend/.env.example and frontend/.env.example for required variables.

## Branching
feature/auth-quiz contains the initial scaffold and auth+quiz feature.

## Deploy
- Frontend: Vercel (build command: npm run build, output: dist)
- Backend: Render or Railway (set DATABASE_URL and JWT_SECRET)
