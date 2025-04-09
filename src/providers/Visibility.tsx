import { cn, isEnvBrowser } from "@/utils/misc";

import AnimationProvider from "./Animation";
import { Post } from "@/hooks/post";
import { children } from "solid-js";
import { listen } from "@/hooks/listen";
import { observe } from "@/hooks/observe";
import { useVisibility } from "@/stores/useVisibility";

export const VisibilityProvider = (props: any) => {
  const data = useVisibility();
  observe<string>("setColor", (data) => {
    document.documentElement.style.setProperty("--main-color", data);
  });
  observe<boolean>("setVisible", data().set);

  listen("keyup", ({ code }) => {
    if (["Escape"].includes(code)) {
      if (!isEnvBrowser()) Post.create("removeFocus");
      data().set(false);
    }
  });

  const c = children(() => props.children);

  return (
    <div
      class={cn("h-screen", {
        "bg-gray-600": isEnvBrowser(),
      })}
    >
      <AnimationProvider show={data().current}>{c()}</AnimationProvider>
    </div>
  );
};
