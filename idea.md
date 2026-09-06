# DriveNest — Idea & Concept

## One-liner

DriveNest is a car-hire marketplace for Kenya: a single place to compare and book
vehicles — self-drive or with a driver — from verified local operators, with
upfront pricing in KES and payment by M-Pesa or card.

## The problem it's solving

Car hire in Kenya today is fragmented and opaque:

- Renters have to individually contact operators (via phone, WhatsApp, Instagram DMs,
  or walking up at the airport) to find out what's available and what it costs.
- Prices are frequently negotiated on the spot rather than quoted up front, which
  makes it hard to compare options or trust that you're getting a fair rate.
- There's no consistent way to verify that an operator or vehicle is legitimate,
  insured, and roadworthy before you hand over money.
- Payment is usually cash or an ad-hoc M-Pesa transfer with no structure around
  deposits, refunds, or recourse if something goes wrong.

DriveNest's premise is that this becomes a normal, trustworthy e-commerce
transaction — like booking a hotel room — instead of a round of phone calls and
haggling.

## Who it's for

- **Renters** — Kenyan residents and diaspora, plus inbound tourists and business
  travellers — who want a specific vehicle for specific dates, know the total cost
  before committing, and can pay digitally.
- **Operators** — individual car owners and small/medium car-hire fleets across
  Kenya — who get a booking channel and payment rail without having to build their
  own website or booking system. (See "Become an operator" in the footer/nav —
  the supply side of the marketplace.)

## Core value proposition

1. **Transparent pricing** — daily rates are shown up front, in KES, before any
   contact with an operator.
2. **Verified operators** — trust is designed in as a first-class feature ("Every
   operator is vetted," roadside rescue included), not bolted on.
3. **Two rental modes** — toggle between **self drive** and **chauffeured**,
   which are genuinely different products (different pricing, different use
   cases — e.g. a chauffeured Mercedes S 350 for a wedding vs. a self-drive
   Suzuki Swift for a solo trip).
4. **Local payment rails** — M-Pesa alongside card, because M-Pesa is the
   dominant way money moves in Kenya.
5. **Marketplace breadth, not a single fleet** — the pitch is "compare quotes
   from multiple trusted operators," i.e. DriveNest itself doesn't necessarily
   own the cars; it aggregates supply the way an OTA aggregates hotels.

## What's actually built right now

This repo currently implements the **marketing / discovery landing page** —
the top-of-funnel experience — not yet the booking, payment, or operator-facing
flows. Concretely, `src/routes/index.tsx` renders:

- **Hero + search bar** — start/return location, dates, and a search button, styled
  as a real booking search but not yet wired to a search results flow.
- **Self drive / Chauffeured toggle** — establishes the two rental modes as a
  top-level choice.
- **Trust strip** — verified operators, transparent pricing, M-Pesa & card,
  roadside rescue.
- **Vehicle catalogue** (`src/lib/fleet.ts`) — 16 vehicles across 9 categories
  (Small car, Medium car, Mid-size SUV, SUV, Safari, Pickup truck, Minivan, Van,
  Bus), each with a Kenyan-market example model (e.g. "Mazda Demio," "Toyota
  Prado J150," "Toyota Coaster"), a KES/day price, seat count, minimum rental
  days, transmission, fuel type, luggage capacity, and a short descriptive
  blurb. Prices span roughly KES 3,800/day (Compact City Car) to KES 35,000/day
  (Standard Safari Land Cruiser with driver-guide), reflecting a deliberately
  wide market spread from budget self-drive to premium chauffeured.
- **Category filter** — client-side filtering of the vehicle grid by category.
- **Cities we serve** — Nairobi, Mombasa, Diani, Kisumu, Naivasha, Nanyuki —
  signalling national (not just Nairobi) coverage, spanning capital, coast,
  lakeside, and safari/mountain destinations.
- **Reviews** — three illustrative testimonials covering three real use cases:
  a self-drive safari trip, a chauffeured business trip, and a corporate
  account use case (billed pickups for a company).
- **Operator callout & footer links** — "Become an Operator" and a vetting
  message, marking where the supply (operator) side of the marketplace will
  eventually hook in.

Note that `fleet.ts` already models more data (`slug`, `minDays`, transmission,
fuel, luggage) than the homepage currently displays — this is groundwork for
vehicle detail pages and a real booking flow that don't exist yet as routes.

## What isn't built yet (implied by the design)

- Vehicle detail pages / booking flow (dates → availability → checkout).
- Real search (the location/date/search controls are currently non-functional UI).
- M-Pesa/card payment integration.
- Operator-facing side: listing a vehicle, managing availability/pricing,
  payouts.
- Accounts, trip history, corporate billing (hinted at by the "Operations,
  Nairobi" review).
- Reviews as a real, user-generated system rather than static seed content.

## Overall goal

Turn Kenyan car hire into a **trustworthy, price-transparent, two-sided
marketplace** — the renter gets hotel-booking-style clarity and choice, and the
operator gets distribution and a payment/trust layer they don't have to build
themselves.

## Tech context (for how this idea is currently implemented)

- **TanStack Start** (React 19) + **Vite**, server-rendered via **Nitro**.
- **Tailwind CSS v4** + **shadcn/ui** component library (`src/components/ui/`)
  for the design system.
- Deployed as a Netlify Function (Nitro's `netlify` preset) — see
  `netlify.toml`.
