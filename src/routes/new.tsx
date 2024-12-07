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
      title="New Estimate"
      description="Create a system point count estimation"
      keywords="systems, point, count, estimation"
    >
      <Tile
        title="Enter Systems and Points"
        description="Use this form to enter the systems and points."
      >
        <EstimateForm />
      </Tile>
    </PageContainer>
  );
}
