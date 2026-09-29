# EventFit

### Don't just find an event. Find one you can actually make.

▶️[Live Demo](https://eventfit.vercel.app/) 
---
<img width="1870" height="902" alt="{DC9BB549-D9E2-49BF-98F5-0D852B811CC5}" src="https://github.com/user-attachments/assets/a0a6f8ff-13b3-419f-a409-67b3b42da4ea" />
<img width="1915" height="938" alt="{CA9FEF03-DBDC-4564-B5AF-2F32851F10A2}" src="https://github.com/user-attachments/assets/61ca5216-eca7-4446-9b48-980fd097c759" />
<img width="1834" height="938" alt="{9151E543-9382-4402-9551-45740420E8A3}" src="https://github.com/user-attachments/assets/dac78e3a-b601-4828-8035-a7918bef0fcd" />
<img width="1853" height="919" alt="{BE175C78-2780-4491-A4DE-C62CEBA56640}" src="https://github.com/user-attachments/assets/a02c9048-9df9-4416-a01e-0baf2e976b4c" />
<img width="1897" height="929" alt="{8C10C67C-4A0F-46A9-AB9D-B45A064BD590}" src="https://github.com/user-attachments/assets/f7c2ec13-e790-47fa-bb88-0fef93ef4474" />
---

## The Problem

Event discovery is easy.

Deciding whether you can actually attend is not.

You find an event that looks interesting. Then the real questions begin:

- Does it fit my schedule?
- Is it relevant to what I actually care about?
- Is it the kind of event I usually attend?
- How far is it from where I am?
- Will I realistically make it there on time?

Most event platforms stop at: You might like this event.

EventFit asks a different question: Does this event realistically fit your life?

---

# The Moment Behind EventFit

- Imagine finding an event you genuinely want to attend.
- The topic is interesting.
- The speakers look great.
- The event is exactly the kind of thing you would normally say yes to.
- So you click **Register**.
- Then you check the timing.
- You check your calendar.
- You think about the commute.
- You realize the event ends late, the location is far away, or it simply doesn't fit the hours you have available.
- The problem wasn't event discovery.
- The problem was **decision-making**.
- That observation became the starting point for EventFit.

---

# The Idea

Instead of treating event discovery as a simple search problem, EventFit treats it as a **fit problem**.

- An event is not simply: Interesting / Not Interesting
- It can be: Interesting + Available + Reachable + Relevant

EventFit therefore creates a personalized **Event Fit Score** for every event.

For example:

```text
87% FIT

✓ Matches your interests
✓ Fits your available hours
✓ Within your travel range
✓ Matches your preferred event type

⚠ Ends late
```

- The goal isn't to hide the reasoning behind a recommendation.
- The goal is to make the reasoning visible.

## What EventFit Does

- EventFit is a full-stack event discovery and registration platform built around one additional layer:
Personalized event feasibility.

Users can:
- Discover events
- Search and filter events
- Create a personal preference profile
- Define interests and preferred event types
- Define available days and hours
- Set a maximum travel range
- View personalized Event Fit scores
- Understand why an event fits
- View event details
- Register for events
- Track registered events in My Events

## The platform is designed with an India-first context, using:

- INR pricing
- Indian cities and locations
- 12-hour time formatting
- Travel distance calculations
- Asia/Kolkata timezone assumptions

## From Idea to Product

The product evolved through a series of engineering decisions.

```text
Problem
   ↓
Product hypothesis
   ↓
Data model
   ↓
Event discovery
   ↓
Authentication
   ↓
User preferences
   ↓
Fit calculation engine
   ↓
Registration system
   ↓
Product design
   ↓
Production deployment
```

Each stage solved a different part of the original problem.

# Development Journey
## Phase 01: Starting With the Problem

- The first decision was to avoid building another generic event listing application.
- A basic event platform could already:
- Search → View Event → Register
- That didn't solve the original problem.

So the product needed an additional layer:
```text
Search
   ↓
Understand the event
   ↓
Compare it with the user's context
   ↓
Decide whether it is realistic
   ↓
Register
```
- This became the core product direction.

## Phase 02: Building the Foundation

- The application started with a Next.js application using the App Router and TypeScript.

The initial foundation included:

- Next.js
- React
- TypeScript
- Tailwind CSS
- ESLint

The decision to keep the application inside Next.js was intentional.

Instead of creating a separate frontend and Express backend, the project uses:

Server Components
Server-side data fetching
Route Handlers
Server-side authentication
MongoDB services

This keeps the application architecture relatively small while still allowing clear separation between UI, services, models, and APIs.

## Phase 03: Designing the Data Layer

The next question was:

What does an event actually need to contain for EventFit to work?

A simple event title and date were not enough.

The event model therefore includes:
```text
Event
├── title
├── description
├── category
├── tags
├── date
├── startTime
├── endTime
├── location
│   ├── venue
│   ├── address
│   ├── city
│   ├── state
│   ├── country
│   └── coordinates
├── price
├── currency
├── capacity
└── image
```
Coordinates were intentionally included from the beginning.

They are not just metadata.

They allow the platform to eventually reason about:

"Can this person realistically travel to this event?"

## Phase 04: Authentication

Once personalization became part of the product, EventFit needed to know whose preferences it was evaluating.

Google authentication was implemented using NextAuth.

The authentication flow became:
```text
Google
  ↓
NextAuth
  ↓
User synchronization
  ↓
MongoDB User
  ↓
User Preferences
```
A user receives a preference document when their account is created.

This gave the application a stable relationship between:
```text
User → Preferences → Events → Fit Score
```
## Phase 05: Building the Fit Engine

This became the central engineering problem.

The goal was deliberately not to build a black-box AI recommendation system.

Instead, EventFit uses an explainable scoring model.

The score is composed of four dimensions:

Dimension	Weight
Interests	35%
Schedule	30%
Travel	20%
Event Type	15%
Total	100%

Conceptually:
Event Fit
    =
    Interest Match
    + Schedule Compatibility
    + Travel Compatibility
    + Event Type Match
Interest Match

The user's interests are compared with the event's tags.

```text
-- For example:

User:
AI, Startups, Product

Event:
AI, Machine Learning, Startups
```
Matching tags contribute to the interest score.

1. Schedule Compatibility

The system checks:

preferred days
preferred start time
preferred end time

- An event that completely fits inside the user's available window receives the full schedule score.
- Partial overlap receives a reduced score.
- No meaningful overlap receives zero.

2. Travel Compatibility

- The user's home coordinates are compared with the event coordinates using the Haversine distance formula.
- The resulting distance is converted into an approximate travel time using an assumed average urban travel speed.
- The score then considers the user's configured maximum travel time.
- This is intentionally an approximation rather than pretending to provide real-time traffic data.

3. Event Type

Users can specify preferred event categories.

-- For example:

Technology
Design
Startups

An event matching one of those preferences receives the event-type contribution.

## Why Not AI?

- This was an intentional product decision.
- The first version of EventFit does not need a language model to determine whether:

Saturday
6:30 PM – 9:00 PM
Technology
15 km away

fits a user's:

Available: Saturday
09:00 AM – 10:00 PM
Preferred type: Technology
Maximum travel: 60 minutes

A deterministic system is:

easier to explain
easier to test
easier to debug
more predictable
cheaper to operate

The interesting engineering problem was not:

"How can I add AI?"

It was:

"How can I model a user's real-world constraints clearly?"

## Phase 06: Making the Score Explainable

- A percentage alone isn't particularly useful.
- So the scoring engine also produces reasons and warnings.
```text
Instead of:

87%

the interface can communicate:

87% FIT

✓ Matches your interests
✓ Fits your available hours
✓ Within your travel range

⚠ Ends late
```
This turned the score from a mysterious recommendation into an explanation.

## Phase 07: Event Registration

Once users could discover suitable events, the next logical step was allowing them to act on the decision.

A registration model was introduced:
```text
User
 │
 ├──── Preferences
 │
 └──── Registrations
             │
             └──── Event
```
The registration system handles:

- authentication
- event existence
- capacity
- duplicate registrations
- registration status

1. A unique database index on:

- userId + eventId
- prevents duplicate registrations for the same user and event.

## Phase 08: Product Design

The visual direction was intentionally different from the typical event-management SaaS aesthetic.

Instead of:

1. generic purple gradients
2. excessive glassmorphism
3. dashboard-heavy layouts
4. large collections of cards

EventFit uses an editorial event-culture aesthetic.

-- Design principles
- Dark
- Editorial
- Utilitarian
- Bold
- Minimal
- Event-focused

-- The primary visual language uses:

- near-black backgrounds
- red accent color
- strong typography
- editorial borders
- rounded event cards
- subtle motion
- sketch-style star graphics

The homepage was structured as a narrative rather than a dashboard:
```text
Hero
 ↓
Problem
 ↓
Events
 ↓
Insight
 ↓
How It Works
 ↓
Final CTA
```
The design therefore reinforces the same story as the product:

Discovery is easy. Deciding isn't.

## Phase 09: Seeding Realistic Event Data

The initial development dataset contained only a few events.

That was enough to test functionality, but not enough to understand the product experience.

The dataset was expanded to 12 events across Indian cities including:

- New Delhi
- Gurugram
- Noida
- Bengaluru
- Mumbai
- Pune
- Hyderabad
- Chennai
- Jaipur

Events cover categories such as:

- Technology
- Design
- Startups
- Product

Each event includes realistic:

- dates
- times
- prices
- locations
- coordinates
- categories
- tags
- capacity

This made it possible to test personalization across different user preferences and locations.

## Phase 10: Debugging the Real System


## Architecture

EventFit follows a relatively simple full-stack architecture.
```text
┌──────────────────────────────┐
│          Next.js UI          │
│                              │
│ Homepage / Events / Forms    │
│ My Events / Preferences      │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│      Server Components       │
│       Route Handlers         │
└──────────────┬───────────────┘
               │
       ┌───────┴────────┐
       ▼                ▼
┌─────────────┐  ┌─────────────┐
│   Services  │  │    Auth     │
│             │  │  NextAuth   │
│ Events      │  │   + Google  │
│ Preferences │  └─────────────┘
│ Registrations│
│ Event Fit   │
└──────┬──────┘
       │
       ▼
┌──────────────────────────────┐
│          MongoDB             │
│                              │
│ Users                        │
│ Preferences                  │
│ Events                       │
│ Registrations                │
└──────────────────────────────┘
```
# Tech Stack
## Frontend
Next.js 16
React
TypeScript
Tailwind CSS
## Backend
Next.js Route Handlers
Server Components
Mongoose
MongoDB Atlas
Zod
## Authentication
NextAuth
Google OAuth
## Deployment
Vercel
MongoDB Atlas

## Project Structure

```text
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   ├── events/
│   │   ├── preferences/
│   │   └── registrations/
│   │
│   ├── events/
│   │   └── [id]/
│   │
│   ├── my-events/
│   ├── settings/
│   │   └── preferences/
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── events/
│   ├── layout/
│   └── ui/
│
├── lib/
│   ├── auth.ts
│   ├── mongodb.ts
│   └── validations/
│
├── models/
│   ├── Event.ts
│   ├── Preference.ts
│   ├── Registration.ts
│   └── User.ts
│
└── services/
    ├── event-fit.ts
    ├── events.ts
    ├── preferences.ts
    ├── registrations.ts
    └── users.ts

scripts/
└── seed-events.ts
```
## Key Engineering Decisions
1. Keep the architecture small: Instead of introducing a separate Express backend, Next.js handles both application rendering and API routes.
2. Keep personalization explainable: The Event Fit engine is deterministic rather than dependent on an opaque recommendation model.
3. Store money as data

```text
Instead of storing:

"₹499"

the database stores:

{
  "price": 499,
  "currency": "INR"
}
```
This keeps monetary values usable for sorting, filtering and future payment integration.

4. Store coordinates early: Location is part of the product logic, not just event metadata.

5. Validate API input: Event creation uses Zod validation before data reaches MongoDB.

6. Protect ownership server-side: When an authenticated user creates an event, the API derives the organizer from the authenticated session rather than trusting a client-provided organizerId.

7. Database constraints matter: Registration uniqueness is enforced at the database level using:

userId + eventId

rather than relying only on frontend checks.

## Running Locally
1. Clone the repository
git clone <your-repository-url>
cd eventfit
2. Install dependencies
npm install
3. Create environment variables

## Create:

.env.local

## Add:

- MONGODB_URI=your_mongodb_connection_string
- GOOGLE_CLIENT_ID=your_google_client_id
- GOOGLE_CLIENT_SECRET=your_google_client_secret
- NEXTAUTH_SECRET=your_nextauth_secret
4. Start the development server
npm run dev

## Open:

http://localhost:3000

## Environment Configuration

The application requires:
1. MONGODB_URI	MongoDB Atlas connection
2. GOOGLE_CLIENT_ID	Google OAuth client
3. GOOGLE_CLIENT_SECRET	Google OAuth secret
4. NEXTAUTH_SECRET	NextAuth session encryption

## Production

EventFit is deployed on Vercel.

## Live application

https://eventfit.vercel.app/

The production environment uses:
```text
Vercel
   │
   ├── Next.js application
   │
   └── Environment variables
            │
            ▼
       MongoDB Atlas
```
Google OAuth is configured for both local development and the production Vercel domain.

## Key Takeaways

- A product feature begins with a user problem.
- The Event Fit score exists because the original problem wasn't event discovery. It was uncertainty around whether an event could realistically be attended.
- Explainability can be a feature: A score becomes more useful when users understand why they received it.
- Simpler systems can be better systems.
- A deterministic scoring model was enough to prove the product hypothesis while remaining transparent and testable.
- Data relationships need to be designed alongside features.
- A feature isn't really finished when it works on localhost.
- The production environment exposed issues that local testing alone didn't reveal.

## Future Direction

EventFit currently focuses on deterministic, explainable personalization. Future versions could explore:

- Real-time travel time instead of approximate travel duration
- Calendar integration
- Smarter event recommendations
- Attendance history
- Personalized event discovery
- Saved events
- Event organizer dashboards
- Event creation UI
- Notifications and reminders
- Maps and route visualization
- More advanced recommendation models

The long-term direction is not simply:

"Find more events."

It is:

Help people make better decisions about the events they actually want to attend.

## Status
EventFit v1.0
 - Event discovery
 - Search and filtering
 - User authentication
 - User preferences
 - Personalized Event Fit
 - Explainable scoring
 - Event details
 - Registration
 - My Events
 - MongoDB persistence
 - Production deployment
 - Google OAuth production setup

## Closing Thought

Event platforms are good at answering:

"What's happening?"

EventFit is built around a different question:

"What can I realistically make?"

That difference is the product.
