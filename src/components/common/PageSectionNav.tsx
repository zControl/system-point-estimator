import { useRouter } from "@tanstack/react-router";
import { Button } from "../ui/button";

export interface PageSection {
  id: string;
  title: string;
  children: React.ReactNode;
}

interface PageSectionNavProps {
  sections: PageSection[];
}

const PageSectionNav = ({ sections }: PageSectionNavProps) => {
  const router = useRouter();

  const handleNavigation = (id: string) => {
    router.navigate({
      hash: `${id}`,
    });
  };
  return (
    <nav className="px-4 py-2">
      <p className="text-left text-sm font-semibold mb-2">On this page</p>
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <Button
              variant={"link"}
              key={section.id}
              onClick={() => handleNavigation(section.id)}
            >
              {section.title}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export { PageSectionNav };
