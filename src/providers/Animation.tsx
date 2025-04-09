import { Show, children, createEffect, createSignal } from "solid-js";

const duration = 200;

const transitionStyle = (state: string) => ({
  opacity: state === "entered" ? 1 : 0,
  transition: `opacity ${duration}ms ease`,
});

interface AnimationProviderProps {
  children: any;
  show?: boolean;
}

export default function AnimationProvider(props: AnimationProviderProps) {
  const [status, setStatus] = createSignal("unmounted");

  createEffect(() => {
    if (props.show) {
      setStatus("entering");
      setTimeout(() => setStatus("entered"), 0);
    } else {
      setStatus("exiting");
      setTimeout(() => setStatus("exited"), duration);
    }
  });

  createEffect(() => {
    if (status() === "exited") {
      setStatus("unmounted");
    }
  });
  const c = children(() => props.children);

  return (
    <Show when={status() !== "unmounted"}>
      <div style={transitionStyle(status())}>{c()}</div>
    </Show>
  );
}
