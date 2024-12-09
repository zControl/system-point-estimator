import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { useFormContext } from "react-hook-form";

export interface BaseFormFieldProps {
  name: string;
  label?: string;
  description?: string;
}

export function BaseFormField({
  name,
  label,
  description,
  children,
}: React.PropsWithChildren<BaseFormFieldProps>) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {React.cloneElement(children as React.ReactElement, { ...field })}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
