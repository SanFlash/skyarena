# SkyArena

SkyArena is an original 3D multiplayer arena-combat game inspired by the fast, compact feel of classic jetpack arena shooters.

> This repository contains the production foundation and Phase 1 vertical-slice architecture. It does not copy Mini Militia's protected characters, maps, art, audio, UI, branding, or source code.

## Project status

**Current phase:** Phase 0 — Project Foundation + Phase 1 — MVP Vertical Slice

Target platforms:
- Android
- iOS
- Windows PC

Planned stack:
- Unity 6 LTS + C#
- URP
- Unity Input System
- Modular animation and data architecture
- Authoritative multiplayer server
- PostgreSQL-backed backend
- Render for backend/server infrastructure
- Next.js admin panel deployed on Vercel

## Repository layout

```text
skyarena/
├── game/
│   ├── Assets/
│   │   ├── Art/
│   │   ├── Animations/
│   │   ├── Audio/
│   │   ├── Data/
│   │   ├── Prefabs/
│   │   ├── Scenes/
│   │   ├── Scripts/
│   │   ├── UI/
│   │   └── VFX/
│   ├── Packages/
│   ├── ProjectSettings/
│   └── README.md
├── game-server/
│   └── README.md
├── backend/
│   └── README.md
├── workers/
│   └── README.md
├── admin/
│   └── README.md
├── assets/
│   ├── briefs/
│   └── provenance/
├── docs/
│   ├── architecture.md
│   ├── development-roadmap.md
│   └── phase-1-checklist.md
├── tests/
└── tools/
```

## Phase 1 vertical slice

The first playable milestone is intentionally small and testable:

- One original stylized 3D character
- One original Desert Outpost arena
- Pistol
- Assault rifle
- Shotgun
- Grenade
- Jetpack with fuel
- Health, armor, damage and death
- Respawn
- Bot combat
- Free For All
- 4-player-ready architecture
- Mobile HUD
- PC controls
- Animation/VFX/audio hooks

Initial match configuration:

- 4 combatants
- 5 minute match
- 10 kills to win
- 3 second respawn

## Step-by-step setup

### 1. Install prerequisites

Install these locally:

1. Git
2. Unity Hub
3. A supported Unity 6 LTS editor
4. Git LFS (recommended for large binary game assets)
5. Visual Studio 2022 or JetBrains Rider
6. Blender 4.x for room/asset authoring

Optional development tools:
- Node.js LTS for the admin panel
- Docker Desktop for local backend services

### 2. Clone the repository

```bash
git clone https://github.com/SanFlash/skyarena.git
cd skyarena
```

### 3. Open the Unity project

Open **Unity Hub**.

Choose:

**Add → Add project from disk**

Select:

```text
skyarena/game
```

Open the project with the Unity editor version configured for this repository.

### 4. Verify Unity packages

In Unity:

**Window → Package Manager**

Verify that the project has the packages required by the current milestone, including:
- Universal Render Pipeline
- Input System
- Cinemachine (when used)
- AI Navigation (when used)

Do not blindly upgrade packages during development. Keep package versions stable per milestone.

### 5. Run the game

Open the primary prototype scene under:

```text
game/Assets/Scenes/Prototype/
```

Press **Play**.

The Phase 1 runtime should eventually expose:
- Movement
- Jump
- Aim
- Shoot
- Reload
- Jetpack
- Grenade
- Damage
- Death
- Respawn
- Bot combat
- FFA match flow

### 6. Build for Windows

In Unity:

**File → Build Profiles**

Add the Windows target and build to:

```text
builds/windows/
```

### 7. Build for Android

Install the Android module from Unity Hub.

Then in:

**File → Build Profiles**

Select Android.

Configure:
- Package identifier
- Minimum supported Android version
- ARM64
- IL2CPP for production builds

Build an APK/AAB to:

```text
builds/android/
```

### 8. Build for iOS

On macOS, install the iOS module from Unity Hub.

Build the Xcode project from Unity, then open it in Xcode and configure:
- Signing team
- Bundle identifier
- Capabilities
- Release configuration

### 9. Backend development

The backend is planned as a separately deployable service.

Local development should eventually use:

```text
Game Client
   ↓
API / Auth
   ↓
Game Server
   ↓
PostgreSQL
```

Keep gameplay authority on the game server.

Never trust the client for:
- Damage
- Kills
- Score
- XP
- Inventory
- Currency

### 10. Render deployment

Use Render for server-side services such as:
- Backend API
- Authoritative game-server infrastructure where supported by the chosen networking stack
- PostgreSQL
- Background workers for asynchronous queue processing

Keep secrets in Render environment variables or secret configuration. Never commit them.

### 11. Vercel admin panel

The admin dashboard will be a Next.js application.

From the future `admin/` directory:

```bash
npm install
npm run dev
```

Deploy through Vercel after the admin application has a production-ready build.

### 12. Recommended development workflow

For every feature:
1. Create the smallest testable implementation.
2. Build the project.
3. Run the feature.
4. Test expected behavior.
5. Test failure behavior.
6. Test mobile/PC input as applicable.
7. Profile performance.
8. Commit only after validation.

### 13. Git workflow

Create feature branches:

```bash
git checkout -b feature/player-movement
git checkout -b feature/weapon-system
git checkout -b feature/jetpack
```

Commit examples:

```bash
git add .
git commit -m "feat: add phase 1 player movement foundation"
git push -u origin feature/player-movement
```

Merge only after local verification.

## Current development principles

- Gameplay responsiveness over unnecessary realism
- Modular systems instead of giant scripts
- Server-authoritative multiplayer
- Mobile-first performance
- Original intellectual property
- Explicit phase gates
- No secrets in source control
- No unverified "feature complete" claims

## Roadmap

### Phase 0
Project foundation and architecture.

### Phase 1
Playable offline vertical slice.

### Phase 2
Authoritative multiplayer.

### Phase 3
Additional game modes.

### Phase 4
Additional maps, weapons, characters, pickups and cosmetics.

### Phase 5
Progression, missions, achievements and rankings.

### Phase 6
Friends, parties, reporting and social features.

### Phase 7
Backend hardening and production services.

### Phase 8
Monetization focused on cosmetics and fair-play systems.

### Phase 9
Performance and device optimization.

### Phase 10
Release preparation for Android, iOS and Windows.

## License

Choose and add a project license before external distribution. Third-party assets, packages and generated content must retain their own licensing/provenance records.
