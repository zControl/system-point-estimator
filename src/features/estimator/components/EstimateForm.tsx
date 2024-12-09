import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Form, FormLabel } from "@/components/ui/form";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { CheckboxFormField } from "@/components/form/CheckboxFormField";
import { DateFormField } from "@/components/form/DateFormField";
import { InputFormField } from "@/components/form/InputFormField";
import { SwitchFormField } from "@/components/form/SwitchFormField";
import { TextareaFormField } from "@/components/form/TextareaFormField";
import { FormSchema } from "@/features/estimator/form/schema";
import { CompiledData } from "@/features/estimator/form/types";
import { formatDate } from "@/features/estimator/form/utils";
import { Trash2 } from "lucide-react";

export function EstimateForm() {
  const [showResults, setShowResult] = useState(false);
  const [compiledData, setCompiledData] = useState<CompiledData | null>(null);
  const [isUpdated, setIsUpdated] = useState(true);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    resetOptions: {
      keepDefaultValues: true,
    },
    defaultValues: {
      project: "",
      partner: "",
      description: "",
      engineering: false,
      programming: false,
      commissioning: false,
      training: false,
      dueDate: new Date(),
      notes: "",
      extras: {
        haveDrawings: false,
        haveBOM: false,
        existingSite: false,
        corporateAccount: false,
      },
      systems: [
        {
          name: "",
          inputs: 0,
          outputs: 0,
          netVars: 5,
          typicals: 1,
          complexity: 1,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "systems",
    control: form.control,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.systems.length === 0) {
      console.log("You didn't enter any systems!");
      return null;
    }

    const compiledData: CompiledData = {
      details: {
        partner: data.partner,
        project: data.project,
        description: data.description,
        dueDate: data.dueDate && formatDate(data.dueDate),
        notes: data.notes,
        extras: {
          haveDrawings: data.extras.haveDrawings,
          haveBOM: data.extras.haveBOM,
          existingSite: data.extras.existingSite,
          corporateAccount: data.extras.corporateAccount,
        },
      },
      tasks: {
        engineering: data.engineering,
        programming: data.programming,
        commissioning: data.commissioning,
        training: data.training,
      },
      systems: data.systems,
    };

    console.log(compiledData);

    setCompiledData(compiledData);
    setIsUpdated(true);
    setShowResult(true);
  }

  function onInvalid() {
    console.log("Form validation error");
  }

  return (
    <section className="space-y-4">
      {/* Form Card */}
      <Card>
        <CardContent>
          <Form {...form}>
            <form
              onChange={() => setIsUpdated(false)}
              onSubmit={form.handleSubmit(onSubmit, onInvalid)}
              className="w-full space-y-6 px-4"
            >
              <Accordion type="multiple" defaultValue={["info"]}>
                <AccordionItem value="info">
                  <AccordionTrigger>Project Information</AccordionTrigger>
                  <AccordionContent className="px-2">
                    <div className="mt-2 space-y-2">
                      <InputFormField
                        name="project"
                        label="Project Name"
                        placeholder="Enter project name"
                      />

                      <InputFormField
                        name="partner"
                        label="Client or Location"
                        placeholder="Enter partner or project location"
                      />

                      <TextareaFormField
                        name="description"
                        label="Description"
                        placeholder="Enter a brief description of the project requirements, and any other relevant information about the requested scope of work."
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="options">
                  <AccordionTrigger>Service options</AccordionTrigger>
                  <AccordionContent className="px-2">
                    <div className="flex flex-col md:flex-row items-top justify-around gap-4">
                      <SwitchFormField name="engineering" label="Engineering" />
                      <SwitchFormField name="programming" label="Programming" />
                      <SwitchFormField
                        name="commissioning"
                        label="Commissioning"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="systems">
                  <AccordionTrigger>Systems and Points</AccordionTrigger>
                  <AccordionContent className="px-2">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="min-w-[200px]">Name</TableHead>
                          <TableHead className="min-w-[110px]">
                            Inputs
                          </TableHead>
                          <TableHead className="min-w-[110px]">
                            Outputs
                          </TableHead>
                          <TableHead className="min-w-[110px]">
                            NetVars
                          </TableHead>
                          <TableHead className="min-w-[110px]">
                            Typicals
                          </TableHead>
                          <TableHead className="min-w-[110px]">
                            Complexity
                          </TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {fields.map((row, index) => (
                          <TableRow key={row.id}>
                            <TableCell>
                              <InputFormField
                                key={row.id}
                                name={`systems.${index}.name`}
                                placeholder="Enter system name"
                              />
                            </TableCell>
                            <TableCell>
                              <InputFormField
                                key={row.id}
                                type="number"
                                name={`systems.${index}.inputs`}
                              />
                            </TableCell>
                            <TableCell>
                              <InputFormField
                                key={row.id}
                                type="number"
                                name={`systems.${index}.outputs`}
                              />
                            </TableCell>
                            <TableCell>
                              <InputFormField
                                key={row.id}
                                type="number"
                                name={`systems.${index}.netVars`}
                              />
                            </TableCell>
                            <TableCell>
                              <InputFormField
                                key={row.id}
                                type="number"
                                name={`systems.${index}.typicals`}
                              />
                            </TableCell>
                            <TableCell>
                              <InputFormField
                                key={row.id}
                                type="number"
                                name={`systems.${index}.complexity`}
                              />
                            </TableCell>
                            <TableCell className="flex flex-row items-center justify-center">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => remove(index)}
                              >
                                <Trash2 />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <Button
                      variant="outline"
                      className="m-3 float-right"
                      onClick={() =>
                        append({
                          name: "",
                          inputs: 0,
                          outputs: 0,
                          netVars: 0,
                          typicals: 1,
                          complexity: 1,
                        })
                      }
                    >
                      Add System
                    </Button>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="extras">
                  <AccordionTrigger>Optional Information</AccordionTrigger>
                  <AccordionContent className="px-2">
                    <div className="flex flex-col gap-4">
                      <div className="w-full flex flex-row justify-start space-x-8">
                        <DateFormField name="dueDate" label="Due Date" />
                      </div>
                      <FormLabel className="text-left">Site Details</FormLabel>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <CheckboxFormField
                          name="extras.corporateAccount"
                          label="Corporate Account"
                          description="Select if the site is for a corporate account."
                        />
                        <CheckboxFormField
                          name="extras.existingSite"
                          label="Existing Site"
                          description="Select if the site is an existing site."
                        />
                        <CheckboxFormField
                          name="extras.haveBOM"
                          label="Have BOM"
                          description="Select if the site has a BOM."
                        />
                        <CheckboxFormField
                          name="extras.haveDrawings"
                          label="Have Drawings"
                          description="Select if the site has drawings."
                        />
                      </div>
                      <TextareaFormField
                        name="notes"
                        label="Notes"
                        placeholder="Enter any additional notes."
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="flex flex-row justify-end gap-4 px-4">
                <Button variant="outline" type="submit">
                  Update Summary
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Results Card */}
      {showResults ? (
        <Card
          className={`w-full ${isUpdated ? "border-t-4 border-t-green-500" : "border-t-4 border-t-yellow-500"}`}
        >
          <CardHeader>
            <div className="flex flex-row justify-end gap-4">
              <Button
                variant="destructive"
                onClick={() => {
                  form.reset();
                  setShowResult(false);
                  setCompiledData(null);
                  setIsUpdated(false);
                }}
              >
                Discard
              </Button>
              <Button variant="outline">Save For Later</Button>
              <Button variant="default">Send to PDS for Quote</Button>
            </div>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            //TODO: Make this prettier
            <pre>{JSON.stringify(compiledData, null, 2)}</pre>
          </CardContent>
          <CardFooter className="flex justify-end gap-4"></CardFooter>
        </Card>
      ) : (
        <Label>No results yet.</Label>
      )}
    </section>
  );
}
