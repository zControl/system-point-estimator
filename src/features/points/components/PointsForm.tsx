import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { Card, CardContent } from "@/components/ui/card";

import { Form } from "@/components/ui/form";

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

import { InputFormField } from "@/components/form/InputFormField";
import { PointsFormSchema } from "@/features/points/form/schema";

import { Trash2 } from "lucide-react";

export function PointsForm() {
  const form = useForm<z.infer<typeof PointsFormSchema>>({
    resolver: zodResolver(PointsFormSchema),
    resetOptions: {
      keepDefaultValues: true,
    },
    defaultValues: {
      points: [
        {
          pointDevice: 0,
          pointType: "AI",
          pointInstance: 1101,
          pointName: "New Point Name",
          pointDescription: "New Point Description",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray<
    z.infer<typeof PointsFormSchema>
  >({
    name: "points",
    control: form.control,
  });

  function onSubmit(data: z.infer<typeof PointsFormSchema>) {
    if (data.points.length === 0) {
      console.log("You didn't enter any points!");
      return null;
    }
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
              onSubmit={form.handleSubmit(onSubmit, onInvalid)}
              className="w-full space-y-6 px-4"
            >
              <Accordion type="multiple" defaultValue={["info"]}>
                <AccordionItem value="systems">
                  <AccordionTrigger>Systems and Points</AccordionTrigger>
                  <AccordionContent className="px-2">
                    <div className="space-y-2">
                      <p>
                        {" "}
                        Enter the number of wired inputs and outputs for each
                        system.
                      </p>
                    </div>
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
                                type="number"
                                name={`points.${index}.pointDevice`}
                                placeholder="Point Device"
                              />
                            </TableCell>
                            <TableCell>
                              <InputFormField
                                name={`points.${index}.pointType`}
                                placeholder="Point Type"
                              />
                            </TableCell>
                            <TableCell>
                              <InputFormField
                                name={`points.${index}.pointInstance`}
                                placeholder="Point Instance"
                              />
                            </TableCell>
                            <TableCell>
                              <InputFormField
                                type="number"
                                name={`points.${index}.pointInstance`}
                              />
                            </TableCell>
                            <TableCell>
                              <InputFormField
                                name={`points.${index}.pointDescription`}
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
                          pointName: "",
                          pointDescription: "",
                          pointDevice: 0,
                          pointInstance: 0,
                          pointType: "AI",
                        })
                      }
                    >
                      Add System
                    </Button>
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
    </section>
  );
}
