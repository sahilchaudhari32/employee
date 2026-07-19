# Smart Survey

Smart Survey is a React Native field inspection and survey management app built with Expo SDK 54 and Expo Router. It helps field teams create surveys, capture evidence, use device data, and review completed inspections from one mobile workspace.

## Features

### Dashboard

- Welcome header and student profile summary.
- Today’s survey count.
- Quick actions for surveys, history, camera, and location.
- Recent survey cards that open the full preview.
- Water-themed glassmorphism UI with gradient backgrounds.

### New Survey

- Site name, client name, description, priority, date, and notes.
- Required-field validation before preview.
- Location capture directly inside the survey form.
- Foreground location permission handling.
- Latitude, longitude, and accuracy display.
- Refresh location before submission.

### Survey Preview

- Review site, client, description, priority, date, notes, contact, and location.
- Displays captured survey photo when available.
- Edit the draft or submit it to history.
- Generates a unique survey ID when submitted.

### Survey History

- Persistent survey list using AsyncStorage.
- Search by site or client.
- Filter by Low, Medium, High, or All priority.
- Open any survey in Preview.
- Delete surveys with confirmation.

### Camera

- Camera permission request.
- Loading state while opening the camera.
- Capture and preview a photo.
- Display capture time.
- Retake, save to media library, and delete with confirmation.

### Location

- Request foreground location permission.
- Display latitude, longitude, and accuracy.
- Refresh the current position.
- Copy coordinates to the clipboard with a success alert.

### Contacts

- Request contacts permission.
- Fetch device contacts with phone numbers.
- Search contacts.
- Contact count and pull-to-refresh.
- Initial-based avatars.
- Copy a phone number.
- Display `No Number` when unavailable.

### Clipboard

- Copy a survey ID.
- Copy location text.
- Paste clipboard content into notes.
- Clear clipboard data.

## Navigation

The app uses nested Expo Router navigators:

- **Drawer:** Dashboard, New Survey, Survey History, Camera, Contacts, Location, Clipboard, and Profile.
- **Bottom tabs:** Dashboard, New Survey, History, and Profile.
- **Hidden routes:** Preview, Camera, Location, Clipboard, and Contacts remain available through the drawer and internal actions without taking over the main tab bar.
- **Modal:** The existing `app/modal.tsx` route is hidden from the drawer.

The drawer is implemented with `Drawer` from `expo-router/drawer`. A custom drawer content component provides branded navigation rows and explicit Expo Vector Icons. The custom app header contains the hamburger button.

## Project structure

```text
app/
├── _layout.tsx                 # Theme, provider, and root Drawer
├── modal.tsx
└── (tabs)/
    ├── _layout.tsx             # Bottom Tabs
    ├── index.tsx               # Dashboard
    ├── survey.jsx              # New Survey
    ├── history.jsx             # Survey History
    ├── profile.jsx             # Profile
    ├── camera.jsx              # Camera
    ├── contacts.jsx            # Contacts
    ├── location.jsx            # Location
    ├── clipboard.jsx            # Clipboard
    └── preview.jsx             # Survey Preview

components/
├── SurveyUI.jsx                # Shared UI, colors, cards, buttons, SafeScreen
└── ui/                         # Expo starter UI helpers

context/
└── SurveyContext.jsx           # Draft state and persisted survey history
```

## Design system

The shared UI uses a water-inspired glass theme:

- Background: `#DFF7FF`
- Water accent: `#7FCDFF`
- Primary content blue: `#328FC1`
- Secondary blue-violet: `#5B67D5`
- Primary text: `#123B5D`
- Glass surfaces: translucent white with rounded borders and shadows

Reusable primitives are defined in `components/SurveyUI.jsx`, including `SafeScreen`, `Header`, `Card`, `GlassCard`, `Button`, `GradientButton`, `Field`, and `Pill`.

## Requirements

- Node.js compatible with Expo SDK 54.
- npm.
- Expo Go, an Android emulator, an iOS simulator, or a development build.

## Installation

```bash
npm install
```

## Run the app

```bash
npx expo start
```

Useful commands:

```bash
npm run android
npm run ios
npm run web
npm run lint
npx tsc --noEmit
```

## Device permissions

The app requests permissions only when a feature needs them:

- **Camera:** required before taking photos.
- **Media Library:** requested when saving a captured photo.
- **Location:** required for location capture and survey coordinates.
- **Contacts:** required before reading device contacts.

For native permission behavior, test Camera, Contacts, Location, and Media Library on a physical device or development build. Web export can render the UI but does not provide the same native device APIs.

## Data storage

Survey history is stored locally with AsyncStorage under the key `smart-field-surveys`. There is no remote backend or account authentication in this version. Clearing app storage removes locally saved surveys.

## Validation

The project is validated with:

```bash
npm run lint
npx tsc --noEmit
npx expo export --platform web
```

## Expo SDK

This project targets Expo SDK 54 with React Native 0.81 and React 19. Expo modules are installed with SDK-compatible versions through `npx expo install`.
