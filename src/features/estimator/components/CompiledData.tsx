import { CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CompiledData } from "@/features/estimator/form/types";
import { formatDate } from "../form/utils";

const ResultsSummary = ({ data }: { data: CompiledData }) => {
  return (
    <div className="results-summary">
    <section>
      <CardTitle>
        <h2 className="text-2xl font-bold">
          Project Details
          </h2>
          </CardTitle>
      <CardContent>

      <p><strong>Project:</strong> {data.details.project}</p>
      <p><strong>Partner:</strong> {data.details.partner}</p>
      <p><strong>Description:</strong> {data.details.description}</p>
      <p><strong>Due Date:</strong> {data.details.dueDate ? formatDate(new Date(data.details.dueDate)) : 'N/A'}</p>
      </CardContent>
    </section>

    <section>
      <CardTitle>

      <h2 className="text-2xl font-bold">Tasks</h2>
      </CardTitle>
      <CardContent>

      <p><strong>Engineering:</strong> {data.tasks.engineering ? 'Yes' : 'No'}</p>
      <p><strong>Programming:</strong> {data.tasks.programming ? 'Yes' : 'No'}</p>
      <p><strong>Commissioning:</strong> {data.tasks.commissioning ? 'Yes' : 'No'}</p>
      <p><strong>Training:</strong> {data.tasks.training ? 'Yes' : 'No'}</p>
      </CardContent>
    </section>

    <section>
      <CardTitle>

      <h2 className="text-2xl font-bold">Systems</h2>
      </CardTitle>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Inputs</TableHead>
            <TableHead>Outputs</TableHead>
            <TableHead>Network Variables</TableHead>
            <TableHead>Typicals</TableHead>
            <TableHead>Complexity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.systems.map((system, index) => (
            <TableRow key={index}>
              <TableCell>{system.name}</TableCell>
              <TableCell>{system.inputs}</TableCell>
              <TableCell>{system.outputs}</TableCell>
              <TableCell>{system.netVars}</TableCell>
              <TableCell>{system.typicals}</TableCell>
              <TableCell>{system.complexity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  </div>
  );
};

export { ResultsSummary };

