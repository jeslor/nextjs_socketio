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

interface Props {
  handleCloseChangePassword: () => void;
}

const PasswordChange = ({ handleCloseChangePassword }: Props) => {
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
        <div>
          <Input
            placeholder="Current Password"
            type="password"
            className="w-full mt-4"
          />

          <button>submit</button>
        </div>
      </div>
    </div>
  );
};

export default PasswordChange;
