# 🦷 Dental Lab Monorepo

A complete **Dental Lab Management System** built with a **monorepo architecture** — combining web, backend, and mobile solutions in one unified project.

## 🧩 Project Overview
This system allows dental laboratories to:
- Manage patient and dentist data
- Handle orders and lab tasks
- Track job progress
- Access reports and invoices
- Connect with a mobile app for real-time updates

## 🏗️ Tech Stack
| Layer | Technology |
|--------|-------------|
| Frontend | React + Next.js |
| Backend | Node.js + Express |
| Mobile | Flutter |
| Database | Postgresql |
| Authentication | JWT-based |

## 📂 Project Structure
dental-lab-monorepo/
│
├── frontend/               # React + Next.js web app
│   ├── package.json
│   ├── next.config.js
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── styles/
│       └── utils/
│
├── backend/                # Node.js + Express API
│   ├── package.json
│   ├── server.js           # Main entry file
│   ├── .env.example        # Example env vars
│   ├── src/
│   │   ├── app.js          # Express app setup
│   │   ├── config/         # DB connection, env setup
│   │   ├── controllers/    # Business logic
│   │   ├── models/         # Mongoose schemas (Lab, Patient, etc.)
│   │   ├── routes/         # API routes
│   │   └── utils/          # Helper functions
│
├── mobile/                 # Flutter mobile app
│   ├── pubspec.yaml
│   ├── lib/
│   │   ├── main.dart
│   │   ├── screens/
│   │   ├── widgets/
│   │   ├── models/
│   │   └── services/
│
├── .gitignore
└── README.md

