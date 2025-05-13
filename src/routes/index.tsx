import { PageContainer } from "@/components/common/PageContainer";
import { Button } from "@/components/ui/button";
import { LandingHeader } from "@/features/landing/components/LandingHeader";
import { toast } from "@/hooks/use-toast";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const handleLoadFromJSON = () => {
    toast({
      title: "Load From JSON",
      description: "This feature is not implemented yet.",
    })
  };
  return (
    <>
      <LandingHeader />
      <PageContainer
        title="System Point Count Estimator"
        description="Estimate point counts from a system  list."
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
