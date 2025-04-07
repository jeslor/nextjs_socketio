"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
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
import { useState } from "react";

interface Props {
  handleCloseChangePassword: () => void;
}

const PasswordChange = ({ handleCloseChangePassword }: Props) => {
  const [isCurrentPassword, setIsCurrentPassword] = useState(false);
  const [currPassword, setCurrPassword] = useState("");

  const checkCurrentPassword = async () => {
    const isPasswordValid: any = await fetch("/api/check_password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currPassword }),
    });
    if (isPasswordValid.status === 200) {
      if (isPasswordValid.confirmedPassword) {
        setIsCurrentPassword(true);
      }
      if (!isPasswordValid.confirmedPassword) {
        setIsCurrentPassword(false);
      }
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
          <Input
            placeholder="Current Password"
            type="password"
            className="w-full mt-4"
            onChange={(e) => setCurrPassword(e.target.value)}
            value={currPassword}
          />
          {!isCurrentPassword && (
            <button
              onClick={() => checkCurrentPassword}
              className="bg-primary7 text-white font-bold py-2 px-4  rounded-full hover:bg-primary8 transition duration-200 cursor-pointer"
            >
              submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordChange;
