"use cleint";

import { Controller, FieldValues, Path, Control } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  label?: string;
  type?: "text" | "email" | "password" | "file";
}

const passwordFeild = <T extends FieldValues>({
  name,
  placeholder,
  label,
  control,
  type = "text",
}: FormFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="opacity-90">{label}</FormLabel>
          <FormControl>
            <Input placeholder="New password" type="password" {...field} />
          </FormControl>

          <FormMessage className="text-red-600 text-[9px]" />
        </FormItem>
      )}
    />
  );
};

export default passwordFeild;
