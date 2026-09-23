# Browser Game Architecture

SkyArena is now browser-first. Unity is no longer required for the player or the game client.

## Client

- Vite
- TypeScript/JavaScript
- Three.js
- WebGL/WebGPU-capable renderer
- Rapier planned for production physics

## Server

- Node.js
- WebSocket-based authoritative match server
- Render deployment target

## Persistence

- PostgreSQL
- Render database target

## Web

- Vercel hosts the game web application and future Next.js admin application.

## Phase 1 browser prototype

The current repository contains a lightweight Three.js vertical-slice prototype with:
- Third-person camera
- Stylized 3D arena generated from primitives
- Player movement
- Jump
- Jetpack
- Mouse aiming
- Shooting
- Ammo/reload
- Enemy bots
- Health/damage
- Respawn
- FFA kill counter
- Responsive HUD

This is a local prototype, not yet an authoritative online multiplayer implementation.

## Next production step

Move combat state to a server-authoritative WebSocket match server and keep the browser client as an untrusted renderer/input device.
