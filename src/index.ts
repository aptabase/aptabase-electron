declare global {
  interface Window {
    __aptabase_ipc__?: {
      trackEvent: (
        eventName: string,
        props?: Record<string, string | number | boolean>
      ) => Promise<void>;
    };
  }
}

export async function trackEvent(
  eventName: string,
  props?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") {
    console.error(
      "Aptabase: to track events in the main process you must import 'trackEvent' from '@aptabase/electron/main'."
    );
    return;
  }

  try {
    if (window.__aptabase_ipc__) {
      console.log("USING IPC");
      await window.__aptabase_ipc__.trackEvent(eventName, props);
    } else {
      console.log("USING PROTOCOL");

      await fetch("aptabase-ipc://trackEvent", {
        method: "POST",
        body: JSON.stringify({ eventName, props }),
      });
    }
  } catch (err) {
    console.error("Aptabase: Failed to send event", err);
  }
}
