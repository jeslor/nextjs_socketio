"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Form } from "@/components/ui/form";
import PasswordField from "@/components/password/passwordField";
import React, { use, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { resetPasswordValidator } from "@/lib/validators/restPasswordValidator";
import { useRouter } from "next/navigation";

const page = ({ params }: { params: Promise<{ token: string }> }) => {
  const Router = useRouter();
  const { token } = React.use(params);
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [isValidToken, setIsValidToken] = useState(true);

  const fetchEmail = useCallback(async () => {
    try {
      const response: any = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify_token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
          }),
        }
      );
      const res = await response.json();
      if (res.status === 200) {
        setCurrentUserEmail(res.userEmail);
        setIsValidToken(true);
      } else {
        setIsValidToken(false);
      }
    } catch (error: any) {
      setIsValidToken(false);
    }
  }, [token]);

  useEffect(() => {
    fetchEmail();
  }, [fetchEmail]);

  const form = useForm({
    resolver: zodResolver(resetPasswordValidator),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const response: any = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/confirmresetpassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: currentUserEmail,
            password: data.password,
            confirmPassword: data.confirmPassword,
          }),
        }
      );
      const res = await response.json();
      if (res.status === 200) {
        toast.success(res.message);
        Router.push("/login");
      } else {
        throw new Error(res.message);
      }
    } catch (error: any) {
      toast.error("Error changing password", error.message);
    }
  };

  return (
    <div className=" h-screen w-screen flex justify-center items-center bg-slate-100  left-0 top-0 z-[100]">
      <div className="w-full max-w-[500px] bg-white rounded-lg shadow-lg p-8 relative">
        <h3 className="font-semibold text-[1.3rem] text-primary7">
          Change Password
        </h3>

        {isValidToken ? (
          <div className="flex flex-col items-start gap-y-2 justify-center mt-8 w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <PasswordField
                  name="password"
                  control={form.control}
                  placeholder="New Password"
                  label="New Password"
                  type="password"
                />
                <PasswordField
                  name="confirmPassword"
                  control={form.control}
                  placeholder="Confirm Password"
                  label="Confirm Password"
                  type="password"
                />

                <button
                  type="submit"
                  className="bg-primary7 text-white font-bold py-2 px-4 rounded-full hover:bg-primary8 transition duration-200 cursor-pointer"
                >
                  Change Password
                </button>
                <p className="text-gray-500 text-sm">
                  By clicking "Change Password", you agree to our{" "}
                  <span className="text-primary cursor-pointer">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-primary cursor-pointer">
                    Privacy Policy
                  </span>
                  .
                  <br />
                  <span className="text-primary cursor-pointer">
                    {" "}
                    Need help?
                  </span>
                </p>
              </form>
            </Form>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-8 w-full">
            <h3 className="text-[2rem] text-center text-black/70 pt-6 font-extrabold">
              Invalid or expired token
            </h3>
            <p className="text-center text-gray-500">
              Please click on the rest button to start the reset process again.
            </p>
            <a
              className="mt-4 bg-primary7 text-white font-bold py-2 px-4 rounded-full hover:bg-primary8 transition duration-200 cursor-pointer"
              href="/login"
            >
              Back to login
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
