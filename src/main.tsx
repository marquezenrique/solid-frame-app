import "@/styles/global.css";

import { Debugger } from "@/utils/debugger";
import Interface from "@/components/Interface";
import { VisibilityProvider } from "@/providers/Visibility";
import { createEffect } from "solid-js";
/* @refresh reload */
import { render } from "solid-js/web";

const app = document.getElementById("app");

function App() {
  createEffect(() => {
    new Debugger([
      {
        action: "setColor",
        data: "0, 140, 234",
      },
      {
        action: "setVisible",
        data: true,
      },
    ]);
  });
  return (
    <VisibilityProvider>
      <Interface />
    </VisibilityProvider>
  );
}

render(() => <App />, app!);
