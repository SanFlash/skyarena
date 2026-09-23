# SkyArena Workers

Planned asynchronous job processing service.

Use workers for queue-backed, non-realtime processing such as:
- Analytics aggregation
- Match-result processing
- Notifications
- Scheduled maintenance

Do not use a background worker as the realtime gameplay loop.
