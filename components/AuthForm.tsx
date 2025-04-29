"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import InputFormField from "./ui/form-field/InputFormField";
import { Loader2 } from "lucide-react";
import { signIn, signUp } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import PlaidLink from "./PlaidLink";

const signUpSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(20, { message: "Password must be 20 characters or less" }),
  firstName: z.string().min(3),
  lastName: z.string().optional(),
  address1: z.string().max(50),
  city: z.string().max(50),
  state: z.string().max(2).min(2),
  postalCode: z.string().min(3).max(6),
  dateOfBirth: z.string(),
  SSN: z.string().min(3),
});

const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(20, { message: "Password must be 20 characters or less" }),
});

const AuthForm = ({ type }: { type: "sign-in" | "sign-up" }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formSchema = type === "sign-in" ? signInSchema : signUpSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    console.log("Form data:", data);

    try {
      const userData = {
        firstName: data.firstName!,
        lastName: data.lastName!,
        address1: data.address1!,
        city: data.city!,
        state: data.state!,
        postalCode: data.postalCode!,
        dateOfBirth: data.dateOfBirth!,
        ssn: data.SSN!,
        email: data.email,
        password: data.password,
      };

      // Signup with Appwrite & create plaid token
      if (type === "sign-up") {
        const newUser = await signUp(userData);
        setUser(newUser);
      }

      if (type === "sign-in") {
        const { email, password } = data;
        const user = await signIn({ email, password });

        if (user) {
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href={"/"} className="flex cursor-pointer items-center gap-2">
          <Image src={"/icons/logo.svg"} alt="Logo" width={34} height={34} />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user
              ? "Link your account"
              : type === "sign-in"
              ? "Sign in"
              : "Sign up"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your bank account to get started."
                : "Please enter your details to continue."}
            </p>
          </h1>
        </div>
      </header>
      {user && (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
      )}
      {!user && (
        <>
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <InputFormField
                      name={"firstName"}
                      label="First Name"
                      form={form.control}
                    />
                    <InputFormField
                      name={"lastName"}
                      label="Last Name"
                      form={form.control}
                    />
                  </div>
                  <InputFormField
                    name={"address1"}
                    label="Address"
                    form={form.control}
                  />
                  <InputFormField
                    name={"city"}
                    label="City"
                    form={form.control}
                  />
                  <div className="flex gap-4">
                    <InputFormField
                      name={"state"}
                      label="State"
                      placeholder="e.g. CA"
                      form={form.control}
                    />
                    <InputFormField
                      name={"postalCode"}
                      label="Postal Code"
                      placeholder="e.g. 90210"
                      form={form.control}
                    />
                  </div>
                  <div className="flex gap-4">
                    <InputFormField
                      name={"dateOfBirth"}
                      label="Date of Birth"
                      type="date"
                      placeholder="YYYY-MM-DD"
                      form={form.control}
                    />
                    <InputFormField
                      name={"SSN"}
                      label="Social Security Number"
                      placeholder="e.g. 123-45-6789"
                      form={form.control}
                    />
                  </div>
                </>
              )}
              <InputFormField
                name={"email"}
                label="Email"
                form={form.control}
              />
              <InputFormField
                name={"password"}
                label="Password"
                type="password"
                form={form.control}
              />
              <div className="flex flex-col gap-2">
                <Button className="form-btn" disabled={isLoading} type="submit">
                  {type === "sign-in" ? "Sign In" : "Sign Up"}
                  {isLoading && (
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex flex-col gap-4">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
              <Link
                href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                className="ml-2 form-link"
              >
                {type === "sign-in" ? "Sign Up" : "Sign In"}
              </Link>
            </p>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
