import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { BaseFormFieldProps } from "./BaseFormField";

interface DateFormFieldProps extends BaseFormFieldProps {}

export function DateFormField({ name, label }: DateFormFieldProps) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="date"
              {...field}
              value={field.value ? field.value.toISOString().split("T")[0] : ""}
              onChange={(e) => field.onChange(new Date(e.target.value))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
