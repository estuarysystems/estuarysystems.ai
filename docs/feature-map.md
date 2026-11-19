# Feature map

Read this before you change a screen. Update this file in the same change when a route changes.

Public frame is SI (systems intelligence). Header and footer wrap every page. The drafting-board background sits behind every page.

## Header

- Wordmark links to `/`.
- Nav: Offers, Use cases, Fabricators, Industries, Free AI audit, Playground.

## Footer

- Copyright, Privacy, Terms.

## Routes

### `/`

Home. Name, “Power Your Business with Superintelligence”, the rotating use-case bar, and the intro-call panel. Near the panel: “Engagements start at $2,000/month. Custom solutions are scoped to your business.”

### `/offers`

Two offer boxes and the same engagement line. Recurring retainer slider and one-time slider. Phone and email stay on both boxes.

### `/use-cases`

Section headings. Each module is a title and one sentence. Cards use the shared card style.

### `/fabricators`

Heading, “Schedule a demo”, and two solution cards.

### `/industries`

Retail and Legal firm. Each item is a title and one sentence. No prices. No client names. Not on the home bar.

### `/audit`

Free AI audit. The visitor selects hand tasks, sets time and cadence, and sees the time tally. Book-a-call link stays on the page.

### `/connect`

Short trust lines, then the Cal.com schedule embed. Booking copy says 20 minutes. The Cal.com event slug stays `cal.com/george-lu-ouzdmq/15min`.

### `/playground`

Playground index. A card grid. Each card has a title, one line, and a link to the item. One item today.

### `/playground/voice-song`

Voice Song Maker. Fully client-side.

- Recorder: microphone, a chosen note range (default C4 to C5, up to two octaves), reference tone, note name, Hz, live pitch meter, short clip, keep / record again / skip. Keys: Space hears the note, S skips, B goes back.
- Player: Twinkle Twinkle, Ode to Joy, Happy Birthday, or an uploaded MIDI file. Playback uses saved clips only and pitch-shifts the nearest clip when a note is missing. Piano roll, tempo control, WAV download.
- Clips stay in this browser (IndexedDB). No upload, no account, no analytics.
- The page has a short “Do it yourself” section and a link to the X post that prompted the idea.

### `/privacy`, `/terms`

Legal pages. Footer links only.

## Parked

These redirect to `/`: `/about`, `/alexandria`, `/tools`, `/tools/:path*`, `/pricing`, `/capabilities`, `/blog`.
