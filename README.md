# 🌐 Sonrisa Alerting & Notification System — Test Project

This repository contains a high-quality, feature-based monorepo implementation of the Alerting & Notification System built within a strict 24-hour timeframe for the **Sonrisa** technical evaluation. The core engine bridges an Angular standalone client application with a NestJS backend utilizing strict TypeScript types under a modern `nodenext` compiler configuration.

## 📖 Table of Contents
- [🚀 Project Overview & Architecture](#-project-overview--architecture)
- [Directory Layout (Feature-Based)](#directory-layout-feature-based)
- [🔧 Local Setup & Installation](#-local-setup--installation)
- [📋 Executed Milestones Status](#-executed-milestones-status)
- [🎯 Future Roadmap & Deferred Work (TODO)](#-future-roadmap--deferred-work-todo)

---

## 🚀 Project Overview & Architecture

The solution prioritizes **Separation of Concerns (SoC)**, **Type Safety (zero `any` usage)**, and an **Extensible Strategy Pattern** for notification routing.

- **Backend:** NestJS (v10+) with strict NodeNext ESM module resolution rules.
- **Frontend:** Angular (v17+) leveraging Standalone Components, Tailwind CSS, and Signals for reactive state management.

### Directory Layout (Feature-Based)
```text
sonrisa-alert-system/
├── backend/                  # NestJS Application Root
│   └── src/
│       ├── app.module.ts
│       └── features/         # Grouped by business value
│           ├── alerts/       # Alert Rules persistence & validation
│           └── notifications/# Core Delivery Engine (Strategy Pattern)
├── frontend/                 # Angular Application Root
│   └── src/
│       └── app/
│           ├── app.routes.ts # Lazy-loaded routing configuration
│           └── features/
│               └── alert-builder/ # Form and Reusable List Components
└── README.md                 # Engineering Documentation
```

---

## 🔧 Local Setup & Installation

Follow these steps to spin up the decoupled environments locally.

### Prerequisites
Make sure you have Node.js (v20+ recommended) and npm installed.

### 💻 Backend Installation & Boot

1. Open a terminal and navigate to the backend subdirectory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Boot up the NestJS runtime server (enforces auto-reload):
   ```bash
   npm run start:dev
   ```
The backend will actively listen on `http://localhost:3000`. Cross-Origin Resource Sharing (CORS) is explicitly restricted to validate requests stemming from the local Angular port (`:4200`).

### 🎨 Frontend Installation & Boot

1. Open a second terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Initialize the Angular development server:
   ```bash
   npm run start
   ```
The user interface becomes accessible at `http://localhost:4200`.

---

## 📋 Executed Milestones Status

| Milestone | Status | Description |
| :--- | :---: | :--- |
| **M0: Workspace Scaffolding & Strict Type Alignment** | 🟢 **DONE** | Strict TS flags configured, Monorepo layout established. |
| **M1: Extensible Delivery Architecture & API Contracts** | 🟢 **DONE** | Strategy pattern implemented for Slack/Email mocks with NodeNext relative `.js` path safety. |
| **M2: Reactive User Dashboard & Form Isolation** | 🟢 **DONE** | Built with Tailwind CSS, `NonNullableFormBuilder` snapshots to neutralize async race conditions, and decoupled reusable component hierarchies via Signal inputs. |
| **M3: Admin Telemetry & Global Logging** | 🟡 **TODO** | Deferred to backlog due to time limits. (See roadmap below). |
| **M4: Automated End-to-End Event Simulation** | 🟡 **TODO** | Deferred to backlog due to time limits. (See roadmap below). |

---

## 🎯 Future Roadmap & Deferred Work (TODO)

To respect the strict 24-hour testing constraint while maintaining pristine kódminőség and deep behavioral auditing across M0–M2, the **Admin (M3)** and **Simulation (M4)** features were intentionally deferred. Below is the blueprint for their implementation:

### 👑 TODO: M3 — Admin Telemetry View
- **Backend Objective:** Expose a secure analytical boundary under `backend/src/features/admin/`. Create an `AdminService` tracking delivery success ratios and system counters.
- **State Management:** Leverage the native Node.js process cache layer (`globalThis`) to aggregate a unified `NotificationLog[]` collection without blocking single-threaded request queues.
- **Frontend Objective:** Build a dedicated visual view under `/admin` connected via lazy-loaded child routing. Reuse the existing `AlertListComponent` created in `PROJ-303` to stream administrative listings dynamically through real-time telemetry pipes.

### 🧪 TODO: M4 — Automated Ingestion Simulation Script
- **Execution Engine:** Implement a standalone executable TypeScript CLI script located at `/scripts/simulate-world-events.ts`.
- **Logic Flow:** Programmatically trigger high-frequency HTTP `POST` requests to the operational ingestion gate (`http://localhost:3000/api/events/ingest`) utilizing highly variable test payloads (e.g., severe weather matrices, high-frequency currency movements).
- **Validation Criteria:** Ensure the core `NotificationEngine` evaluates asynchronous payloads against active rules correctly, verifying simultaneous multi-channel emission limits.

### ⚙️ Technical Enhancements Left for Scale
- **Data Persistence:** Replace the current `globalThis` memory shield architecture with **Prisma ORM** coupled to a lightweight, zero-configuration local **SQLite** file-based database schema.
- **Resiliency:** Integrate automated circuit-breakers (e.g., Cockatiel or custom interceptors) into delivery strategies to gracefully isolate network crashes when third-party external integrations (Slack Webhooks / SMTP relays) throttle API limits.
