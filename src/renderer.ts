declare global {
  interface Window {
    aptabase: {
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
  if (!window.aptabase) {
    console.warn(
      "Aptabase: You need to call `.exposeAptabase()` from the preload script."
    );
    return;
  }

  window.aptabase.trackEvent(eventName, props);
}
