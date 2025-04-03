"use client";

import { useCurrentUserStore } from "@/components/providers/userProvider";
import { updateUser } from "@/lib/actions/user.actions";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const PrivacyOption = ({privacyTitle, privacyValue }:{privacyTitle:string, privacyValue:string}) => {
    const {currentUser, updateCurrentUser} = useCurrentUserStore();
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (currentUser) {
            setIsChecked(currentUser.privacySettings[privacyValue]? currentUser.privacySettings[privacyValue] : false);
        }
    }
    , [currentUser, privacyValue]);

    const handleSeetingChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setIsChecked(!isChecked);
        const updatedUser = {
            ...currentUser,
            privacySettings: {
                ...currentUser.privacySettings,
                [name]: !isChecked,
            },
        };
        updateCurrentUser(updatedUser);
        try {
            await updateUser(currentUser._id, updatedUser).then((res: any) => {
                if (res.status === 200) {
                    toast.success("Privacy settings updated successfully");
                }
                else {
                    toast.error("Error updating privacy settings");
                }
            });

        } catch (error) {
            toast.error("Error updating privacy settings");
            console.log(error);
        }
    }
    

  return (
    <div className="flex items-center  px-2">
      <input onChange={handleSeetingChange} type="checkbox" className="toggle toggle-md" checked ={isChecked} name={privacyValue} />
      <label className="ml-2" htmlFor="public">
        {privacyTitle}
      </label>
    </div>
  );
};

export default PrivacyOption;
