"use client"
 
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginValidator } from "@/lib/validators/loginValidator"
 

 
const LoginForm =()=> {
    const form = useForm({
        resolver: zodResolver(loginValidator),
        defaultValues: {
            username: "",
            password: "",
        },
    })


    const onSubmit  = async (values:z.infer<typeof loginValidator>) => {}


 
  return (
    <div>
    <h2 className="text-3xl">Welcome back!</h2>
    <p className="text-sm font-semibold pb-[4rem]">Enter your credentials to access your account</p>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="opacity-90">Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="opacity-90">Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} type="password"  className="text-[20px]"/>
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <button
          type="submit"
            className="mainBtn w-full"
        >
            Login
        </button>
      </form>
    </Form>
    </div>
  )
}


export default LoginForm
