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
  if (!window.__APTABASE__) {
    console.error(
      "Aptabase: You need to call `.exposeAptabase()` from the preload script.222"
    );
    return;
  }

  window.__APTABASE__.trackEvent(eventName, props);
}
