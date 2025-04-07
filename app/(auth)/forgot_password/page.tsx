"use client";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const passwordResetValidator = z.object({
  email: z.string().email("Invalid email address"),
});
const page = () => {
  const form = useForm({
    resolver: zodResolver(passwordResetValidator),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof passwordResetValidator>) => {
    // Handle password reset logic here
    console.log("Password reset email sent to:", values.email);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800">
          Forgot Password
        </h1>
        <p className="mt-4 text-center text-gray-500">
          Please enter your email to reset your password.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="opacity-90">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" type="email" {...field} />
                  </FormControl>

                  <FormMessage className="text-red-600 text-[9px]" />
                </FormItem>
              )}
            />

            <button type="submit" className="mainBtn w-full py-2">
              Send link
            </button>
          </form>
        </Form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Remembered your password?{" "}
          <a
            href="/login"
            className="font-semibold text-primary7 hover:underline"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default page;
