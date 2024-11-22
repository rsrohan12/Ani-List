"use client";

import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import SocialBtns from "./SocialBtns";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";

const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});
  
type FormValues = z.infer<typeof formSchema>;
export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const supabase = createClientComponentClient()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (payload: FormValues) => {

    setIsLoading(true)
    const {data, error} = await supabase.auth.signUp({ // functionality of supabase
        email: payload.email,
        password: payload.password,
        options: {
            data: {
                name: payload.name
            }
        }
    })

    form.reset()
    setIsLoading(false)

    if(error){
        toast.error(error.message, {theme: "colored"})
    }
    else if(data.user){ // agr hume user mil gya hai toh use login bhi krwa do
        await supabase.auth.signInWithPassword({
            email: payload.email,
            password: payload.password
        })

        //toast.success('Account created successfully!', { theme: 'colored' })
        router.push("/?success=Account created successfully!");
    }
  };
  return (
    <>
    <ToastContainer />
        <div className="mx-auto min-h-screen max-w-md mt-5 p-6 bg-background rounded-lg shadow-lg">
            <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="text-muted-foreground">Enter your details to sign up</p>
            </div>
          <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your name"
                            type="text"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="hello@example.com"
                            type="email"
                            disabled={isLoading}
                            {...field}
                          />
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
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="••••••••"
                            type="password"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing up..." : "Sign up"}
                  </Button>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  <SocialBtns />
        
                </form>
              </Form>
        </div>
    </>
  )
}
