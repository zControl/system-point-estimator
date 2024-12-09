import * as z from "zod";
const FormSchema = z.object({
  project: z.string().min(1, "Required"),
  partner: z.string().min(1, "Required"),
  description: z.string().optional(),
  engineering: z.boolean(),
  programming: z.boolean(),
  commissioning: z.boolean(),
  training: z.boolean(),

  systems: z.array(
    z.object({
      name: z.string().min(1, "Required"),
      inputs: z.coerce.number().min(0, "Invalid"),
      outputs: z.coerce.number().min(0, "Invalid"),
      netVars: z.coerce.number().min(0, "Invalid"),
      typicals: z.coerce.number().min(0, "Invalid"),
      complexity: z.coerce.number().min(1).max(10),
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

export { FormSchema };
