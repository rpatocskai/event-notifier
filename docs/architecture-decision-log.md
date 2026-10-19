# Architecture Decision Log (ADL) & System Design

**Project:** Sonrisa Alerting & Notification System Test  
**Author:** AI-Collaborator & Software Engineer  
**Status:** APPROVED

---

## 1. Executive Summary & Vague Brief Interpretation

The brief requires a highly flexible system capable of capturing "important events" (breaking news, market movements, natural disasters) and routing them to target channels (**Email** and **Slack**), with an underlying architecture that supports seamless expansion to future channels. It also demands a dedicated **Admin View** to track system state and metrics.

### Core Architecture Hypotheses:

1. **Event Ingestion is Decoupled:** The system does not listen to live APIs directly (which would be unstable for a 24h test). Instead, it exposes a generalized `Ingestion API` where events can be pushed.
2. **Alert Rules are Evaluated Dynamically:** Users construct "Rules". When an incoming Event matches a Rule's criteria, a notification payload is generated.
3. **Strategy Pattern for Delivery:** Notification delivery must abstract away the channel details via a uniform interface to ensure horizontal extensibility.

---

## 2. Feature-Based Directory Architecture

To ensure high maintainability and prevent the code from turning into a monolithic blob, both applications enforce a strict **Feature-Based Structure**. Code is grouped by _what business value it delivers_, not by technical layer (controllers/services).

### 🏢 Backend Structure (NestJS)

Every business feature encapsulates its own controllers, services, and domain models.

```text
backend/src/
├── app.module.ts                 # Application root orchestrator
└── features/
    ├── alerts/                   # Alert Rules Management (CRUD)
    │   ├── alerts.controller.ts  # REST Endpoints for users
    │   ├── alerts.service.ts     # Business logic for rule persistence
    │   └── dto/                  # Create/Update Alert input validators
    │
    ├── notifications/            # Core Notification Engine
    │   ├── notification.engine.ts# Matches events against rules & dispatches
    │   ├── interfaces/           # NotificationProvider interface definition
    │   └── strategies/           # Extensible communication channels
    │       ├── email.strategy.ts # Strategy for Email delivery
    │       └── slack.strategy.ts # Strategy for Slack delivery
    │
    └── admin/                    # System Observability & Telemetry
        ├── admin.controller.ts   # System-wide metrics endpoints
        └── admin.service.ts      # Aggregations, global logs & stats
```

### 💻 Frontend Structure (Angular 17+)

Utilizes modern standalone components, declarative routing, and `Signals` for state tracking instead of legacy NgModules.

```text
frontend/src/app/
├── app.config.ts                 # Application configuration (Providers, Routes)
├── app.routes.ts                 # Feature lazy-loading declarations
└── features/
    ├── alert-builder/            # User Workspace
    │   ├── components/           # Form, list, and control visual items
    │   ├── services/             # HTTP Client encapsulating backend alert APIs
    │   └── alert-builder.routes.ts
    │
    └── admin-panel/              # Administrative Workspace
        ├── components/           # Dashboard visual stats, global event list
        ├── services/             # Telemetry & simulation trigger hooks
        └── admin-panel.routes.ts
```

---

## 3. Data & Domain Model (Logical Representation)

```text
  +------------------+          +------------------+          +------------------------+

  |      Event       |          |    AlertRule     |          |  NotificationLog       |
  +------------------+          +------------------+          +------------------------+

  | - id: UUID       |          | - id: UUID       |          | - id: UUID             |
  | - category: ENUM |          | - name: String   |          | - alertRuleId: UUID    |
  | - title: String  |          | - category: ENUM |          | - channel: ENUM        |
  | - payload: JSON  |          | - channels: ENUM| |-------->| - status: ENUM         |
  | - createdAt: Date|          | - isActive: Bool |          | - dispatchedAt: Date   |
  +------------------+          +------------------+          +------------------------+
           |                             ^

           |       Evaluated Against     |
           +-----------------------------+
```

---

## 4. Architectural Decisions & AI Control Framework

### ADR-01: Extensible Notification Strategy Pattern

- **Context:** The requirement says: _"Make it flexible enough that we can add more channels later."_
- **Decision:** We implement a classic OOP **Strategy Pattern**. The core engine depends only on a `NotificationProvider` interface. Adding a new channel (e.g., Discord) will strictly require creating a new class implementing this interface and registering it in the NestJS dependency container—zero modifications to the core engine logic.
- **AI Guardrail:** Reject any code generated by AI that looks like: `if (channel === 'email') { ... } else if (channel === 'slack') { ... }`. Demand a factory or array-map of strategies.

### ADR-02: Angular State Management with Signals

- **Context:** Managing simple form states and admin dashboard streams can introduce heavy RxJS boilerplate if handled carelessly.
- **Decision:** Use Angular **Signals** for local component states, active list trackers, and dashboard metrics. Use RxJS `HttpClient` only for the asynchronous boundary, instantly mapping network streams into Signals via `toSignal()`.
- **AI Guardrail:** Reject `BehaviorSubject` or complex state stores (like NgRx) generated by the AI. Keep it minimal, modern, and high-performance using primitive Signals.
