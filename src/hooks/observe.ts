import { onCleanup } from "solid-js";

type Message<T> = {
  action: string;
  data: T;
};

export const observe = <T>(action: string, handler: (data: T) => void) => {
  const messageListener = (event: MessageEvent) => {
    const message: Message<T> = event.data;
    if (message?.action === action) {
      console.log("handled", message);
      handler(message.data);
    }
  };
  window.addEventListener("message", messageListener);
  onCleanup(() => {
    window.removeEventListener("message", messageListener);
  });
};