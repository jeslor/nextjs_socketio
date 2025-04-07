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
import toast from "react-hot-toast";

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
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/forgot_password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) {
            toast.success("Password reset link sent to your email");
            form.reset();
          } else {
            throw new Error(res.message);
          }
        });
    } catch (error: any) {
      toast.error(error.message, {
        style: {
          boxShadow: "0 4px 12px 0 rgba(0,0,0,0.05)",
          padding: "16px",
          color: "#8e0707",
          fontSize: "13px",
          fontWeight: "500",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
    }
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
