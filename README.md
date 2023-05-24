![Aptabase](https://aptabase.com/og.png)

# Electron SDK for Aptabase

Instrument your Electron apps with Aptabase, an Open Source, Privacy-First and Simple Analytics for Mobile, Desktop and Web Apps.

## Install

Install the SDK using your preferred JavaScript package manager

```bash
pnpm add @aptabase/electron
# or
npm add @aptabase/electron
# or
yarn add @aptabase/electron
```

## Usage

First you need to get your `App Key` from Aptabase, you can find it in the `Instructions` menu on the left side menu.

On your Electron main's process, initialize the SDK after the app is ready:

```js
import { initialize } from "@aptabase/electron/main";

app.whenReady().then(() => {
  initialize("<YOUR_APP_KEY>"); // 👈 this is where you enter your App Key

  // ... the rest of your app initialization code
});
```

## Tracking Events from the Main process

Simply import the `trackEvent` from the `@aptabase/electron/main` package and call it:

```js
import { trackEvent } from "@aptabase/electron";

trackEvent("connect_click"); // An event with no properties
trackEvent("play_music", { name: "Here comes the sun" }); // An event with a custom property
```

## Tracking Events from the Renderer process

This SDK does not use nodeIntegration, so you need to expose the SDK to the renderer process.

On your preload script, add this:

```js
import { exposeAptabase } from "@aptabase/electron/preload";

exposeAptabase();
```

Afterwards you can use the `trackEvent` function, but this time from the `@aptabase/electron` package:

```js
import { trackEvent } from "@aptabase/electron";

trackEvent("connect_click"); // An event with no properties
trackEvent("play_music", { name: "Here comes the sun" }); // An event with a custom property
```

A few important notes:

1. The SDK will automatically enhance the event with some useful information, like the OS, the app version, and other things.
2. You're in control of what gets sent to Aptabase. This SDK does not automatically track any events, you need to call `trackEvent` manually.
   - Because of this, it's generally recommended to at least track an event at startup
3. You do not need to await the `trackEvent` function, it'll run in the background.
4. Only strings and numbers values are allowed on custom properties
