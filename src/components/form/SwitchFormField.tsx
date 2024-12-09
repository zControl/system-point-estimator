import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useFormContext } from "react-hook-form";
import { BaseFormFieldProps } from "./BaseFormField";

interface SwitchFormFieldProps extends BaseFormFieldProps {}

export function SwitchFormField({ name, label }: SwitchFormFieldProps) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="rounded-lg border p-4">
          <div className="flex items-center justify-between space-y-0.5 w-fit">
            <FormLabel className="text-lg">{label}</FormLabel>
            <FormControl className="mx-4">
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
