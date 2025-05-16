import * as z from "zod";
const PointsFormSchema = z.object({
  points: z.array(
    z.object({
      pointDevice: z.coerce.number().min(0, "Invalid"),
      pointType: z.coerce.string().min(1, "Required"),
      pointInstance: z.coerce.number().min(0, "Invalid"),
      pointName: z.string().min(1, "Required"),
      pointDescription: z.string(),
    }),
  ),
});

export { PointsFormSchema };
