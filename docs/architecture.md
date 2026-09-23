# Architecture

## High-level

```text
                    +----------------+
                    | Unity Client   |
                    | Android/iOS/PC |
                    +-------+--------+
                            |
              +-------------+-------------+
              |                           |
              v                           v
       +-------------+             +-------------+
       | Backend API |             | Game Server |
       +------+------+             +------+------+
              |                           |
              v                           v
       +-------------+             +-------------+
       | PostgreSQL  |             | Match State|
       +-------------+             +-------------+

                 +------------------+
                 | Next.js Admin    |
                 |      Vercel      |
                 +------------------+
```

## Trust boundary

The client is an untrusted participant.

Competitive state must be validated server-side.

## Infrastructure intent

- Render: backend/server-side infrastructure
- Vercel: admin web application
- PostgreSQL: durable relational state
- Queue/worker: asynchronous processing
