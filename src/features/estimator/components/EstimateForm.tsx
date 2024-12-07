import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { FieldErrors, useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { Checkbox } from "@/components/ui/checkbox";
import { MoreVertical, Trash2 } from "lucide-react";

interface CompiledData {
  details: {
    partner: string | undefined;
    project: string | undefined;
    description?: string | undefined;
    dueDate?: string | undefined;
    notes?: string | undefined;
    extras: {
      haveDrawings: boolean;
      haveBOM: boolean;
      existingSite: boolean;
      corporateAccount: boolean;
    };
  };
  tasks: {
    engineering: boolean;
    programming: boolean;
    commissioning: boolean;
  };
  systems: Array<{
    name: string;
    inputs: number;
    outputs: number;
    netvars: number;
    typicals: number;
    complexity: number;
  }>;
}

const FormSchema = z.object({
  project: z.string({}).optional(),
  partner: z.string({}).optional(),
  description: z.string().optional(),
  engineering: z.boolean(),
  programming: z.boolean(),
  commissioning: z.boolean(),

  systems: z.array(
    z.object({
      name: z.string(),
      inputs: z.coerce.number(),
      outputs: z.coerce.number(),
      netvars: z.coerce.number(),
      typicals: z.coerce.number(),
      complexity: z.coerce.number(),
    }),
  ),
  notes: z.string().optional(),
  dueDate: z.date().optional(),
  extras: z.object({
    haveDrawings: z.boolean(),
    haveBOM: z.boolean(),
    existingSite: z.boolean(),
    corporateAccount: z.boolean(),
  }),
});

function formatDate(date: Date) {
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function EstimateForm() {
  const [showResults, setShowResult] = useState(false);
  const [compiledData, setCompiledData] = useState<CompiledData | null>(null);
  const [isUpdated, setIsUpdated] = useState(true);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      const adjustHeight = () => {
        textarea.style.height = "auto";
        textarea.style.height = `${Math.min(textarea.scrollHeight, 400)}px`;
      };

      adjustHeight();
      textarea.addEventListener("input", adjustHeight);

      return () => textarea.removeEventListener("input", adjustHeight);
    }
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      project: "",
      partner: "",
      description: "",
      engineering: false,
      programming: false,
      commissioning: false,
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
          netvars: 0,
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

    console.log(data);

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
      },
      systems: data.systems,
    };

    console.log(compiledData);

    setCompiledData(compiledData);
    setIsUpdated(true);
    setShowResult(true);
  }

  function onInvalid() {
    console.log("Form is invalid");
    //TODO nofity user (toast) of invalid form, and focus on first cusor to first error field.
    const errors: FieldErrors = form.formState.errors;
    console.log(errors);
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
              <Accordion type="multiple">
                <AccordionItem value="info">
                  <AccordionTrigger>Project Information</AccordionTrigger>
                  <AccordionContent className="px-2">
                    <div className="mt-2 space-y-2">
                      <FormField
                        control={form.control}
                        name="project"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Enter project name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="partner"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Enter partner or project location"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                placeholder="Description of project intent and scope of work"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="options">
                  <AccordionTrigger>Select service options</AccordionTrigger>
                  <AccordionContent className="px-2">
                    <div className="flex flex-col md:flex-row items-top justify-around gap-4">
                      <div>
                        <FormField
                          control={form.control}
                          name="engineering"
                          render={({ field }) => (
                            <FormItem className="rounded-lg border p-4">
                              <div className="flex items-center justify-between space-y-0.5 w-fit">
                                <FormLabel className="text-lg">
                                  Engineering
                                </FormLabel>
                                <FormControl className="mx-4">
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div>
                        <FormField
                          control={form.control}
                          name="programming"
                          render={({ field }) => (
                            <FormItem className="rounded-lg border p-4">
                              <div className="flex items-center justify-between space-y-0.5 w-fit">
                                <FormLabel className="text-lg">
                                  Programming
                                </FormLabel>
                                <FormControl className="mx-4">
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div>
                        <FormField
                          control={form.control}
                          name="commissioning"
                          render={({ field }) => (
                            <FormItem className="rounded-lg border p-4">
                              <div className="flex items-center justify-between space-y-0.5 w-fit">
                                <FormLabel className="text-lg">
                                  Commissioning
                                </FormLabel>
                                <FormControl className="mx-4">
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="systems">
                  <AccordionTrigger>Add Systems and Points</AccordionTrigger>
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
                              <FormField
                                control={form.control}
                                key={row.id}
                                name={`systems.${index}.name`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input type="string" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TableCell>
                            <TableCell>
                              <FormField
                                control={form.control}
                                key={row.id}
                                name={`systems.${index}.inputs`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TableCell>
                            <TableCell>
                              <FormField
                                control={form.control}
                                key={row.id}
                                name={`systems.${index}.outputs`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TableCell>
                            <TableCell>
                              <FormField
                                control={form.control}
                                key={row.id}
                                name={`systems.${index}.netvars`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TableCell>
                            <TableCell>
                              <FormField
                                control={form.control}
                                key={row.id}
                                name={`systems.${index}.typicals`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TableCell>
                            <TableCell>
                              <FormField
                                control={form.control}
                                key={row.id}
                                name={`systems.${index}.complexity`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
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
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  console.log("more options clicked")
                                }
                              >
                                <MoreVertical />
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
                          netvars: 0,
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
                  <AccordionTrigger>Additional Information</AccordionTrigger>
                  <AccordionContent className="px-2">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-full flex flex-row justify-start space-x-8">
                        <FormField
                          control={form.control}
                          name="dueDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Due Date</FormLabel>
                              <FormControl>
                                <Input
                                  type="date"
                                  {...field}
                                  value={
                                    field.value
                                      ? field.value.toISOString().split("T")[0]
                                      : ""
                                  }
                                  onChange={(e) =>
                                    field.onChange(new Date(e.target.value))
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-3 gap-8">
                          <FormField
                            control={form.control}
                            name="extras.corporateAccount"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Corporate Account</FormLabel>
                                  <FormDescription>
                                    Select if the site is for a corporate
                                    account.
                                  </FormDescription>
                                </div>
                              </FormItem>
                            )}
                          />
                          <span>Existing Site</span>
                          <span>Corporate Account</span>
                          <span>OEM</span>
                          <span>OEM</span>
                        </div>
                      </div>
                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                ref={textareaRef}
                                placeholder="Enter any additional notes here..."
                                className="w-full min-h-[100px] max-h-[400px] overflow-y-auto resize-none"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Button variant="outline" type="submit">
                Update Summary
              </Button>
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
              <Button variant="destructive">Discard</Button>
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
