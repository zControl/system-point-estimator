import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "./useTheme";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <>
      {theme === "light" ? (
        <Button size="icon" variant="ghost" onClick={() => setTheme("dark")}>
          <MoonIcon />
        </Button>
      ) : (
        <Button size="icon" variant="ghost" onClick={() => setTheme("light")}>
          <SunIcon />
        </Button>
      )}
    </>
  );
};

export { ThemeToggle };
