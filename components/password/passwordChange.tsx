"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Form } from "@/components/ui/form";
import PasswordField from "@/components/password/passwordField";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCurrentUserStore } from "../providers/userProvider";
import toast from "react-hot-toast";
import { resetPasswordValidator } from "@/lib/validators/restPasswordValidator";

interface Props {
  handleCloseChangePassword: () => void;
}

const PasswordChange = ({ handleCloseChangePassword }: Props) => {
  const { currentUser } = useCurrentUserStore();

  const [isCurrentPassword, setIsCurrentPassword] = useState(false);
  const [currPassword, setCurrPassword] = useState("");

  const form = useForm({
    resolver: zodResolver(resetPasswordValidator),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const checkCurrentPassword = async () => {
    const email: string = currentUser.email;

    const response: any = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/checkpassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: currPassword }),
      }
    );
    const isPasswordValid = await response.json();
    if (isPasswordValid.status === 200) {
      if (isPasswordValid.confirmedPassword) {
        setIsCurrentPassword(true);
        toast.success(isPasswordValid.message);
      }
      if (!isPasswordValid.confirmedPassword) {
        setIsCurrentPassword(false);
        toast.error(isPasswordValid.message);
      }
    }
    if (isPasswordValid.status !== 200) {
      toast.error(isPasswordValid.message);
    }
  };

  const onSubmit = async (data: any) => {
    const email: string = currentUser.email;

    const response: any = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/confirmresetpassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      }
    );
    const res = await response.json();
    if (res.status === 200) {
      toast.success(res.message);
      handleCloseChangePassword();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className=" h-screen w-screen flex justify-center items-center bg-slate-100 fixed left-0 top-0 z-[100]">
      <div className="w-full max-w-[500px] bg-white rounded-lg shadow-lg p-8 relative">
        <button className="absolute top-8 right-4 p-2 hover:bg-primary rounded-full text-gray-600 hover:text-white bg-primary/50 cursor-pointer">
          <Icon
            icon="material-symbols:close"
            className=" size-[20px] top-4 right-4"
            onClick={handleCloseChangePassword}
          />
        </button>
        <h3 className="font-semibold text-[1.3rem]">Change Password</h3>
        <div className="flex flex-col items-start gap-y-2 justify-center mt-5 ">
          <label htmlFor="currentPassword">Your current Password</label>
          <div className="h-fit w-full relative">
            <Input
              placeholder="Current Password"
              id="currentPassword"
              type="password"
              className="w-full mt-0"
              onChange={(e) => setCurrPassword(e.target.value)}
              value={currPassword}
              disabled={isCurrentPassword}
            />
            <Icon
              icon="bx:show"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => {
                const input = document.getElementById(
                  "currentPassword"
                ) as HTMLInputElement;
                if (input.type === "password") {
                  input.type = "text";
                } else {
                  input.type = "password";
                }
              }}
            />
          </div>

          {!isCurrentPassword && (
            <button
              onClick={checkCurrentPassword}
              className="bg-primary7 text-white font-bold py-2 px-4  rounded-full hover:bg-primary8 transition duration-200 cursor-pointer"
            >
              submit
            </button>
          )}
        </div>
        {isCurrentPassword && (
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
        )}
      </div>
    </div>
  );
};

export default PasswordChange;
