import { createRouter, RouterProvider } from "@tanstack/react-router";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./components/common/theme/ThemeProvider";
import { routeTree } from "./routeTree.gen";

// Set up a Router instance
const router = createRouter({
  routeTree,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
        <AppRouter />
      </ThemeProvider>
    </HelmetProvider>
  );
}
