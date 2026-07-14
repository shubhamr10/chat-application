# Chat App Requirements



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