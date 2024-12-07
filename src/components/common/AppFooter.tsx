import { CustomLink } from "@/components/ui/custom-link";

const AppFooter = () => {
  return (
    <footer className="bg-accent text-accent-foreground p-2">
      <div className="container mx-auto w-1/2">
        <div className="flex flex-wrap justify-center text-xs gap-4">
          <CustomLink to="/terms">Terms</CustomLink>
          <CustomLink to="/privacy">Privacy</CustomLink>
          <CustomLink to="/status">Status</CustomLink>
        </div>
        <div className="flex justify-center items-center space-x-4 py-2">
          <span className="text-sm">&copy; 2024 All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export { AppFooter };
