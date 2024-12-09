import { PageContainer } from "@/components/common/PageContainer";
import { Tile } from "@/components/composites/Tile";
import { EstimateForm } from "@/features/estimator/components/EstimateForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/new")({
  component: EstimateTile,
});

function EstimateTile() {
  return (
    <PageContainer
      title="Quote Request Form"
      description="Request quote from a point count estimator."
      keywords="systems, point, count, estimation"
    >
      <Tile
        title="Quote Request Form"
        description="Fill out the form with project and system details to request a quote."
      >
        <EstimateForm />
      </Tile>
    </PageContainer>
  );
}
