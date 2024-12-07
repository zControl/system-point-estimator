import React from "react";
import ReactDOM from "react-dom/client";
import { Spinner } from "./components/ui/spinner";
import App from "./app";

// Render the app to the root element
const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner size="xl" />
        </div>
      }
    >
      <App />
    </React.Suspense>,
  );
}
