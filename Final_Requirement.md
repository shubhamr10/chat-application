# Chat App Requirements

Treat this like a real spec, not a tutorial checklist. Build it in phases — each phase should work end-to-end before you touch the next one.
> Stack: React + TypeScript (frontend), Node.js + Express + TypeScript (backend), Socket.io, PostgreSQL (pick Postgres over Mongo here deliberately — designing a relational schema is a skill you're currently missing, and TypeScript across the whole stack is close to a baseline expectation at product companies now).

## Phase 1 — MVP (~week 1)

- Single global room, no auth
- User enters a display name, joins, sees a live message feed
- Message broadcasts in real time to every connected client
- Each message shows sender name + timestamp
- Plain server + minimal client is fine here — goal is proving the socket connection works both ways

## Phase 2 — Real app (~weeks 2–3)

- Proper React frontend, TypeScript throughout
- Multiple rooms/channels, not just one global room
- Real authentication (signup/login, JWT-based)
- Messages persisted to Postgres — load chat history when a user joins a room
- "X is typing…" indicator
- Online/offline presence list

## Phase 3 — Production-grade concerns (~weeks 3–4)
This is the phase that actually proves depth. Even if you don't fully implement every item, you must be able to explain your approach for each one:

- Reconnection handling — client auto-reconnects after a dropped connection without duplicating or losing messages
- Message ordering — what guarantees you when two messages race
- Input sanitization — prevent XSS via message content
- Rate limiting — stop one user from flooding a room
- Pagination — never load full chat history in one query
- Horizontal scaling awareness — research the Socket.io Redis adapter and understand why a single in-memory socket server breaks once you have more than one server instance, even if you never deploy multiple instances yourself
Graceful failure — what happens if the DB connection drops mid-session

## Phase 4 — Deployment (mandatory, don't skip)

- Backend on Render/Railway/Fly.io, frontend on Vercel/Netlify
- Environment variables and secrets handled properly, never hardcoded
- Basic logging so you can see what's happening in production

> A working local-only project is worth far less in an interview than a live deployed link you can pull up and reason about under questioning.

## Interview-readiness check
Before you consider this project "done," you should be able to answer without notes:

- How would this handle 100,000 concurrent users? What breaks first?
- Two users send a message in the same room in the same millisecond — what happens?
- How do you stop spam without blocking legitimate users?
- Your server restarts mid-conversation — what does the client experience?

*If you can answer those about your own code, you've closed the exact gap you told me about at the start of this conversation. If you can't yet, that's your signal for where to spend the next study session — not the next course.*