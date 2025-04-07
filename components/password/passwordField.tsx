"use client";

import { useState } from "react";
import { Controller, FieldValues, Path, Control } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Icon } from "@iconify/react";

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  label?: string;
  type?: "text" | "email" | "password" | "file";
}

const PasswordField = <T extends FieldValues>({
  name,
  placeholder,
  label,
  control,
  type = "password",
}: FormFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {label && (
            <FormLabel className="opacity-90 text-primary">{label}</FormLabel>
          )}
          <FormControl>
            <div className="relative">
              <Input
                className="min-w-[300px] max-w-[400px] w-full"
                placeholder={placeholder}
                type={showPassword ? "text" : type}
                {...field}
              />
              <span
                onClick={togglePassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                <Icon icon={showPassword ? "bx:hide" : "bx:show"} width={20} />
              </span>
            </div>
          </FormControl>
          <FormMessage className="text-red-600 text-xs">
            {fieldState.error?.message}
          </FormMessage>
        </FormItem>
      )}
    />
  );
};

export default PasswordField;
