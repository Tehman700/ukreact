  import { createRoot } from "react-dom/client";
import { startTransition } from "react";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Root element not found');

const root = createRoot(rootElement);

// Use startTransition for non-urgent updates to improve perceived performance
startTransition(() => {
  root.render(<App />);
});
