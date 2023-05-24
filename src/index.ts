declare global {
  interface Window {
    __APTABASE__: {
      trackEvent(
        eventName: string,
        props?: Record<string, string | number | boolean>
      ): void;
    };
  }
}

export function trackEvent(
  eventName: string,
  props?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") {
    console.error(
      "Aptabase: to track events in the main process you must import 'trackEvent' from '@aptabase/electron/main'."
    );
    return;
  }

  if (!window.__APTABASE__) {
    console.error(
      "Aptabase: You need to call `.exposeAptabase()` from the preload script."
    );
    return;
  }

  window.__APTABASE__.trackEvent(eventName, props);
}
