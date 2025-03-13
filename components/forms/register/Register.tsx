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
import { registerValidator } from "@/lib/validators/registerValidator"
import Link from "next/link"
 

 
const RegisterForm =()=> {
    const form = useForm({
        resolver: zodResolver(registerValidator),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    })


    const onSubmit  = async (values:z.infer<typeof registerValidator>) => {}


 
  return (
    <div className="w-full max-w-[400px]">
    <h2 className="text-3xl font-semibold mb-[4rem]">Get started</h2>
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
             
              <FormMessage className="text-red-600 text-[9px]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="opacity-90">Your Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field}  type="email"/>
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
              <FormLabel className="opacity-90">Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} type="password"  className="text-[20px]"/>
              </FormControl>
             
              <FormMessage className="text-red-600 text-[9px]" />
            </FormItem>
          )}
        />
        <button
          type="submit"
            className="mainBtn w-full py-2"
        >
            Register
        </button>
      </form>
    </Form>
    <div className="text-center pt-10">
      <p>Have an account already? <Link href="/login" className="text-primary6 font-semibold">Login</Link></p>
    </div>
    </div>
  )
}


export default RegisterForm
