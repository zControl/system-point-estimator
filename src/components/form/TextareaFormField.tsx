import { Textarea } from "@/components/ui/textarea";
import { BaseFormField, BaseFormFieldProps } from "./BaseFormField";

interface TextareaFormFieldProps extends BaseFormFieldProps {
  placeholder?: string;
}

export function TextareaFormField({
  name,
  label,
  placeholder,
}: TextareaFormFieldProps) {
  return (
    <BaseFormField name={name} label={label}>
      <Textarea
        placeholder={placeholder}
        className="min-h-[200px] max-h-[800px] resize-y-auto"
      />
    </BaseFormField>
  );
}
