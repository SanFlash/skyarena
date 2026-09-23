# SkyArena

SkyArena is an original browser-first 3D multiplayer arena-combat game inspired by the fast, compact feel of classic jetpack arena shooters.

> Original IP only: do not copy Mini Militia's protected characters, maps, art, audio, UI, branding, or source code.

## Current status

**Phase 1 — Browser 3D Vertical Slice**

Unity is no longer required.

Current stack:
- Vite
- Three.js
- WebGL/WebGPU-capable browser rendering
- Render for future authoritative realtime services
- Vercel for the web client/admin
- PostgreSQL for persistent data

Current prototype:
- 3D arena
- Third-person camera
- WASD movement
- Jump
- Jetpack
- Mouse aim
- Shooting
- Reload
- Enemy bots
- Health/damage
- Respawn
- FFA kill counter
- Match timer
- Responsive HUD

The current build is a local gameplay prototype. Authoritative online multiplayer is the next phase.

## Repository layout

```text
skyarena/
├── src/
│   ├── main.js
│   └── style.css
├── game-server/
├── backend/
├── workers/
├── admin/
├── assets/
├── docs/
│   ├── architecture.md
│   ├── development-roadmap.md
│   ├── phase-1-checklist.md
│   └── web-game-architecture.md
├── index.html
├── package.json
├── .env.example
└── README.md
```

## Step-by-step setup

### 1. Install prerequisites

Install:
1. Git
2. Node.js LTS
3. VS Code or another JavaScript/TypeScript IDE
4. Modern Chrome or Edge

Optional:
- Blender for original 3D asset creation
- Docker for local backend development

### 2. Clone

```bash
git clone https://github.com/SanFlash/skyarena.git
cd skyarena
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start development server

```bash
npm run dev
```

Open the URL shown by Vite, normally:

```text
http://localhost:5173
```

### 5. Play

Desktop controls:

- **WASD** — movement
- **Mouse** — aim
- **Left click** — fire
- **Space** — jump
- **Shift** — jetpack
- **R** — reload
- **Esc** — release mouse lock

### 6. Production build

```bash
npm run build
npm run preview
```

Production output:

```text
dist/
```

### 7. Deploy to Vercel

Recommended Vercel configuration:

```text
Framework: Vite
Install: npm install
Build: npm run build
Output: dist
```

Connect the GitHub repository to Vercel and enable automatic deployment from `main`.

### 8. Online multiplayer architecture

The production game will use:

```text
Browser
   |
 WebSocket
   |
   v
Authoritative Game Server
   |
   +--- Matchmaking
   +--- Combat validation
   +--- Player state
   +--- Match state
   |
   v
PostgreSQL
```

The browser is an untrusted client. Never trust client-provided damage, kills, XP, currency or inventory.

### 9. Render

Render is the planned infrastructure for:
- Authoritative realtime game server
- Backend API
- PostgreSQL
- Asynchronous workers

Realtime gameplay should not be implemented as a normal serverless HTTP function.

### 10. Environment variables

Create a local environment file:

Linux/macOS:
```bash
cp .env.example .env
```

PowerShell:
```powershell
Copy-Item .env.example .env
```

Never commit `.env`.

### 11. Admin panel

The future admin application will be a separate Next.js application under:

```text
admin/
```

Planned modules:
- Dashboard
- Players
- Matches
- Reports
- Bans
- Weapons
- Characters
- Cosmetics
- Maps
- Missions
- Events
- Announcements
- Leaderboards
- Analytics

## Development roadmap

### Phase 1
Browser vertical slice.

### Phase 2
Authoritative WebSocket multiplayer.

### Phase 3
Team Deathmatch, Duel, Capture Zone, Capture Flag and custom rooms.

### Phase 4
More maps, characters, weapons, pickups and cosmetics.

### Phase 5
XP, levels, missions, achievements and rankings.

### Phase 6
Friends, parties, invites, reports and blocking.

### Phase 7
Production backend, anti-cheat, analytics and admin.

### Phase 8
Cosmetic-focused monetization.

### Phase 9
Performance and device optimization.

### Phase 10
Production release.

## Development rule

A feature is not considered complete merely because code exists. It must build, run, be tested, handle failures and meet its performance target.

## License

Choose a project license before external distribution. Maintain provenance and licensing records for all third-party or generated assets.
