# AI Health Coach

An AI-powered personal health coach (iOS-first, React Native + Expo) that
dynamically calculates maintenance calories, calorie deficit/surplus,
macronutrient targets, and workout calories burned, and provides intelligent
nutrition guidance.

> **Status:** Architecture & scaffolding only. Domain types, service
> boundaries, navigation and state are in place. Business logic (calorie/macro
> math, AI calls, HealthKit queries) is stubbed with clearly marked `TODO`s.

## Tech Stack

| Concern         | Choice                                   |
| --------------- | ---------------------------------------- |
| Framework       | React Native via **Expo** (SDK 52)       |
| Language        | **TypeScript** (strict)                  |
| Auth            | **Firebase Authentication**              |
| Database        | **Cloud Firestore**                      |
| State           | **Zustand**                              |
| Navigation      | **React Navigation** (native stack + tabs) |
| Styling         | **NativeWind / Tailwind CSS**            |
| Health          | **Apple HealthKit** via `react-native-health` |
| AI              | **OpenAI** (via backend proxy placeholder) |

## Architecture

The project follows a **clean, feature-oriented architecture**. The app depends
on stable internal boundaries (services, stores, types) rather than third-party
SDKs directly, keeping integrations swappable and testable.

```
/src
  /screens        Cross-cutting screens (Splash)
  /components     Shared UI primitives (Screen, Text, Button, Card, Input)
  /services       Integration boundary
      /firebase   config, auth, firestore, collections, userProfile
      /ai         openai.service (placeholder)
      /health     healthkit.service (placeholder)
  /hooks          useAuth, useHealthKit, useColorScheme
  /store          Zustand stores (auth, user, onboarding, nutrition)
  /navigation     Root / Auth / Onboarding / MainTab navigators + typed routes
  /types          Domain model (User, NutritionTargets, DailyMetrics, ...)
  /utils          env, logger, constants, formatters, validators, calories
  /features
      /auth        Login, SignUp, ForgotPassword
      /onboarding  Welcome, Goals, BodyMetrics, ActivityLevel, HealthPermissions
      /dashboard   Dashboard
      /nutrition   Nutrition
      /health      Progress
      /workouts    Workouts, WorkoutDetail
      /aiCoach     AICoach
      /profile     Profile
```

### Layering rules

- **Screens / components** render state and dispatch intent. No SDK calls.
- **Hooks** orchestrate side effects and bridge services ↔ stores.
- **Stores** are pure state containers (no async logic).
- **Services** are the only place third-party SDKs are touched. They return
  domain types exclusively.
- **Types** are framework-agnostic and shared everywhere via `@types`.

### Navigation flow

```
RootNavigator
├─ Splash            (while resolving the persisted session)
├─ Auth              (signed out)        → Login / SignUp / ForgotPassword
├─ Onboarding        (signed in, !onboarded)
└─ Main (tabs)       (signed in, onboarded)
   ├─ Dashboard
   ├─ Nutrition
   ├─ Progress
   ├─ AI Coach
   └─ Profile
   + WorkoutDetail   (modal route above the tabs)
```

## Getting Started

### Prerequisites

- Node 18+
- An iOS simulator / device (HealthKit requires a real device + a dev build —
  it is **not** available in Expo Go)
- A Firebase project (Auth + Firestore enabled)

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
#   then fill in your Firebase web config + OpenAI proxy URL

# 3. Type-check
npm run typecheck

# 4. Run
npm run ios       # or: npm start
```

### HealthKit / native modules

HealthKit and other native modules require a **development build**, not Expo Go:

```bash
npx expo prebuild
npm run ios
```

## Environment Variables

See [`.env.example`](./.env.example). All client-exposed values are prefixed
`EXPO_PUBLIC_`. The Firebase web config is safe to ship (secured by Firestore
Security Rules). **Never** put an OpenAI secret in the client — point
`EXPO_PUBLIC_OPENAI_PROXY_URL` at a backend you control.

## Path Aliases

Configured in `tsconfig.json` and `babel.config.js`:

`@/*`, `@components/*`, `@features/*`, `@hooks/*`, `@navigation/*`,
`@screens/*`, `@services/*`, `@store/*`, `@types`, `@utils/*`

## Next Steps (post-scaffolding)

- Implement the calorie/macro engine in `src/utils/calories.ts`.
- Build out forms + validation in auth and onboarding screens.
- Wire dashboard/nutrition/progress to Firestore via the stores.
- Implement the OpenAI proxy + streaming in `openai.service.ts`.
- Implement HealthKit queries in `healthkit.service.ts`.
- Author Firestore Security Rules for the `users/{uid}/**` data model.
