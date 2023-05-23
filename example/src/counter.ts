import { trackEvent } from "@aptabase/electron";

export function setupCounter(element: HTMLButtonElement) {
  let counter = 0;
  const setCounter = (count: number) => {
    counter = count;
    element.innerHTML = `count is ${counter}`;
    trackEvent("increment", { count });
  };
  element.addEventListener("click", () => setCounter(counter + 1));
  setCounter(0);
}
