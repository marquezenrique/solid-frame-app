import {
  Show,
  children,
  createContext,
  createSignal,
  useContext,
} from "solid-js";
import { cn, isEnvBrowser } from "@/utils/misc";

import { Post } from "@/hooks/post";
import { TransitionGroup } from "solid-transition-group";
import { listen } from "@/hooks/listen";
import { observe } from "@/hooks/observe";

type VisibilityContextType = {
  current: () => boolean;
  set: (v: boolean) => void;
};

const VisibilityContext = createContext<VisibilityContextType>();

export const useVisibilityContext = () => {
  const ctx = useContext(VisibilityContext);
  if (!ctx)
    throw new Error(
      "useVisibilityContext must be used within a VisibilityProvider"
    );
  return ctx;
};

export const VisibilityProvider = (props: { children: any }) => {
  const [current, setCurrent] = createSignal(false);
  const c = children(() => props.children);

  const visibility = {
    current,
    set: setCurrent,
  };

  observe<string>("setColor", (data) => {
    document.documentElement.style.setProperty("--main-color", data);
  });

  observe<boolean>("setVisible", visibility.set);

  listen("keyup", ({ code }) => {
    if (code === "Escape") {
      if (!isEnvBrowser()) Post.create("removeFocus");
      visibility.set(false);
    }
  });

  return (
    <VisibilityContext.Provider value={visibility}>
      <div class={cn("h-screen", { "bg-gray-600": isEnvBrowser() })}>
        <TransitionGroup name="fade">
          <Show when={visibility.current()}>{c()}</Show>
        </TransitionGroup>
      </div>
    </VisibilityContext.Provider>
  );
};
