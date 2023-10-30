import { trackEvent } from "@aptabase/electron/renderer";

export function setupCounter(element: HTMLButtonElement) {
  let counter = 0;
  const setCounter = (count: number) => {
    counter = count;
    element.innerHTML = `count is ${counter}`;
  };
  setCounter(0);

  element.addEventListener("click", () => {
    setCounter(counter + 1);
    trackEvent("increment", { counter });
  });
}
