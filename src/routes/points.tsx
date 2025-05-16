import { PageContainer } from "@/components/common/PageContainer";
import { Tile } from "@/components/composites/Tile";
import { PointsForm } from "@/features/points/components/PointsForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/points")({
  component: PointsPage,
});

function PointsPage() {
  return (
    <PageContainer
      title="Points"
      description="Create a list of points and generate bacnet objects"
      keywords="systems, point, count, estimation"
    >
      <Tile
        title="Points Form"
        description="Fill out the form to create a list of points."
      >
        <div>
          <PointsForm />
        </div>
      </Tile>
    </PageContainer>
  );
}
