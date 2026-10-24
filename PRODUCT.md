# Product

<!-- impeccable:product-schema 1 -->

<!-- Written 2026-10-24 from the Deya project's history and the app's own strings, not from a fresh interview. Facts marked (inferred) need Yevhen's confirmation. -->

## Platform

web

## Users

Drivers in Ukraine, mostly in cities, whose phone navigation breaks when GPS is jammed or spoofed during air alerts (the blue dot jumps to an airport, another country, or freezes). They drive with the phone in a windscreen or dashboard holder and need to keep following a route. The site is read in Ukrainian, often on a phone, usually by someone who heard about Deya and wants to know if it works and how to install it. (inferred: audience mix beyond private drivers, such as taxi and delivery drivers, is not confirmed.)

## Product Purpose

Deya (Дея) is an offline Android navigator that keeps the driver on the map when GPS is jammed or spoofed. The landing page explains what it does in seconds, earns trust (privacy, honesty about accuracy), and gets the visitor to install it. Success: a visitor understands the mechanism, believes the camera footage stays on the phone, and installs.

## Positioning

Deya does not trust GPS blindly. It tracks the car with the phone's motion sensors, optionally the rear camera (measures speed from the road ahead), and an offline OpenStreetMap road graph, running a cloud of thousands of possible positions that each sit on a real road. It detects fake GPS (position outside Ukraine, disagreement with motion sensors, drifting off roads, mismatch with Doppler speed) and ignores it. A status pill always says where the position comes from and shows the possible error in metres.

## Operating Context

- Phone in a holder, screen facing the driver, rear camera facing the road.
- Internet is needed once, to download the city map; after that everything is offline.
- Start the first drive with working GPS so Deya can calibrate in a minute or two.
- If Deya gets lost, the driver taps the pin button and taps the map where they are.
- Optional setting: Deya acts as Android's mock location source so Waze, Google Maps and other apps follow it while GPS is jammed or spoofed.

## Capabilities and Constraints

- Status pill states (exact app strings): "GPS" (green), "Немає GPS, працюю за датчиками" (orange), "Фальшивий GPS ігнорую, працюю за датчиками" (red), "Позицію задали ви" (blue).
- Camera is optional; without it the app warns accuracy may be lower.
- Android 8.0+, needs gyroscope and accelerometer.
- No accounts, no ads, no analytics; camera images never leave the phone. Opt-in ride upload exists in the app but is not a landing-page claim.
- Not yet on Google Play. A direct APK download is being prepared on a separate branch and must not go live before the first release exists.
- Static site on GitHub Pages (public repo zheniaslius/deya-site), no build step.
- Accuracy without GPS is not measured on real drives; only qualitative claims (good in cities with turns, error grows on long straights).

## Brand Commitments

- Name: "Deya" in English, "Дея" in Ukrainian, from the "Де я?" sheep meme. Icon: a detailed white sheep on the app's blue (#1F8FD6), no question mark.
- The app's UI direction: calm, "not vibe coded", inspired by Waze.
- Site language: Ukrainian.

## Evidence on Hand

- Real app screenshots of the current design, Ukrainian: onboarding pages, day and night navigation, map with the status pill (img/, sources in the deya repo's screenshots/ branches).
- 12 s hero motion graphic (img/hero.webm/.mp4) and a 34 s Ukrainian explainer video (img/deya-explainer-uk.mp4).
- Privacy policy: https://zheniaslius.github.io/deya-privacy/
- No testimonials, user counts, press, or measured accuracy figures exist. Do not invent them.

## Product Principles

1. Honesty first: always show where the position comes from and how sure Deya is.
2. Nothing leaves the phone that does not have to.
3. Works when the network and GPS do not.
4. Calm under stress: the driver is anxious; the interface is not.
