# Specification

## Summary
**Goal:** Build a tablet-friendly, dark industrial touchscreen UI for an incubator that polls an ESP32 controller for live status and provides basic control screens and commands.

**Planned changes:**
- Create a consistent dark industrial design system (typography, colors avoiding blue/purple dominance, spacing, touch-sized components, smooth screen transitions).
- Implement Dashboard screen with animated circular temperature and humidity gauges, incubation day/day remaining, system status (including clear Alarm styling), egg turning countdown, and display current mode.
- Add Dashboard bottom controls: Manual Egg Turn (calls `GET /manualTurn` with success/error feedback), Species Selection navigation, Settings navigation, and Alarm Mute button with visible tapped feedback.
- Implement Species Selection screen with five large icon buttons (Chicken, Duck, Quail, Goose, Custom) that call `GET /setMode?value=SPECIES` and provide success/error feedback.
- Implement Settings screen with temperature slider, humidity slider, egg turning interval control, base URL editor, and Save action that calls `GET /setTemp?value=` and `GET /setHumidity?value=`; persist settings locally.
- Add ESP32 HTTP communication layer: poll `GET /status` every 3 seconds, parse JSON, and update UI across screens; handle offline/invalid JSON states; add loading + success/error states for all commands.
- Add kiosk-friendly UI state/toggle and a Help/About area with guidance for Android screen pinning/kiosk behavior.
- Add app navigation across Dashboard, Species Selection, and Settings; ensure all user-facing text is English.
- Include static industrial-style icon assets for species buttons and an optional incubator panel logo mark, loaded from frontend static assets.

**User-visible outcome:** Users can run the app full-screen on a tablet to monitor live incubator temperature/humidity/status/day/timers updated every 3 seconds, change species mode, adjust temperature/humidity/turning interval, configure the ESP32 base URL, trigger a manual egg turn, and optionally enable a kiosk-oriented UI mode with in-app guidance for Android pinning.
