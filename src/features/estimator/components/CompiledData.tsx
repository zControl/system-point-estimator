import { CompiledData } from "@/features/estimator/form/types";

const ResultsSummary = ({ data }: { data: CompiledData }) => {
  return (
    <>
      <div>
        <h1>Compiled Data</h1>
        <span>{data.details.project}</span>
      </div>
      <div>More Details</div>
    </>
  );
};

export { ResultsSummary };
