"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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
import { loginValidator } from "@/lib/validators/loginValidator";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

const LoginForm = () => {
  const Router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginValidator),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginValidator>) => {
    try {
      await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      }).then((res: any) => {
        if (res?.error) {
          toast.error("Invalid Email or password.", {
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
          form.reset();
        }
        if (!res?.error) {
          toast.success("Logged out successfully");
          Router.push("/chat");
        }
      });
      // if(res.ok){
      //   Router.push("/chat")
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-[400px]">
      <h2 className="text-3xl font-semibold">Welcome back!</h2>
      <p className="text-sm font-semibold pb-[4rem]">
        Enter your credentials to access your account
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel className="opacity-90">Password</FormLabel>
                  <Link
                    className="text-blue-500 text-[10px] font-semibold"
                    href={"/forgot_password"}
                  >
                    Forgot password
                  </Link>
                </div>
                <FormControl>
                  <Input placeholder="password" {...field} type="password" />
                </FormControl>

                <FormMessage className="text-red-600 text-[9px]" />
              </FormItem>
            )}
          />
          <button type="submit" className="mainBtn w-full py-2">
            Login now
          </button>
        </form>
      </Form>
      <div className="text-center pt-10">
        <p>
          Don't have an account?{" "}
          <Link href="/sign_up" className="text-primary6 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
