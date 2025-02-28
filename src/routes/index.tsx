import { PageContainer } from "@/components/common/PageContainer";
import { Button } from "@/components/ui/button";
import { LandingHeader } from "@/features/landing/components/LandingHeader";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <>
      <LandingHeader />
      <PageContainer
        title="Landing Page"
        description="First page when you visit."
        keywords="app, landing, page, first, welcome"
      >
        <div className="w-full h-96 flex flex-col items-center justify-center gap-8">
          <Link to="/new">
            <Button variant={"outline"} size={"lg"}>
              Start a new Estimate
            </Button>
          </Link>
          <Button
            variant={"outline"}
            size={"lg"}
            onClick={() => console.log("We can load from JSON here")}
          >
            Load From JSON
          </Button>
        </div>
      </PageContainer>
    </>
  );
}

export default App;
