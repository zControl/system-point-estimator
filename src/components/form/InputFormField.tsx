import { Input } from "@/components/ui/input";
import { BaseFormField, BaseFormFieldProps } from "./BaseFormField";

interface InputFormFieldProps extends BaseFormFieldProps {
  placeholder?: string;
  type?: "text" | "number" | "email" | "password";
}

export function InputFormField({
  name,
  label,
  placeholder,
  type = "text",
}: InputFormFieldProps) {
  return (
    <BaseFormField name={name} label={label}>
      <Input type={type} placeholder={placeholder} />
    </BaseFormField>
  );
}
