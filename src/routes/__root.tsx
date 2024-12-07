import { ErrorPage } from "@/components/common/ErrorPage";
import { NotFound } from "@/components/common/NotFound";
import { Toaster } from "@/components/ui/toaster";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "../globals.css";

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
  errorComponent: ErrorPage,
});

function RootLayout() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
      <Toaster />
    </>
  );
}
