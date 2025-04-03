"use client";
import PrivacyOption from "@/components/profile/privacyOption/privacyOption";
import UserContacts from "@/components/profile/userContacts/userContacts";
import { useCurrentUserStore } from "@/components/providers/userProvider";
import { updateUser } from "@/lib/actions/user.actions";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const dummyContacts = Array.from({ length: 7 });

const page = () => {
  const { currentUser, setNewProfilePhoto, onlineContacts, updateCurrentUser } = useCurrentUserStore();
  const [myContacts, setMyContacts] = useState<any[]>([])
  const[isSavingImage, setIsSavingImage] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const proFileImageRef = useRef<any>(null);

  const editProfile = () => {
    if (proFileImageRef.current) {
      proFileImageRef.current.click();
    }
  };

  const handleSetProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        setProfileImage(reader.result as string);
      }
    };
  };

  const saveProfileImage = async () => {
    try {
      setIsSavingImage(true);
      if (profileImage) {
        await setNewProfilePhoto(profileImage).then((res: any) => {
          if (res.status === 200) {
            setProfileImage(null);
            alert("Profile image updated successfully");
          } else {
            throw new Error("Error updating profile image");
          }
        }
        );
      }
    } catch (error) {
      alert("Error saving profile image");
    }finally {
      setIsSavingImage(false);
    }
  
  };

  useEffect(() => {
    if (currentUser) {
      setMyContacts(currentUser.contacts);
    }
  }
  , [currentUser]);

  const handleRemoveContacts = async (contact:any) => {
    try {
      const updatedCurrUser = {...currentUser, contacts: currentUser.contacts.filter((c:any) => c._id !== contact._id) }
      updateCurrentUser(updatedCurrUser);
      const updatedUser = await updateUser(currentUser._id, { contacts: updatedCurrUser });
      if(updatedUser.status === 200){
       toast.success("Contact removed successfully");
      }
    } catch (error) {
      console.log("Error removing contact", error);
      alert("Error removing contact");
    } finally{     
      setMyContacts((prev) => prev.filter((c) => c._id !== contact._id));
    }
  }

  return (
    <div className=" w-full py-10 overflow-y-scroll noScrollBar h-screen">
      <div className="max-w-[1000px] w-full flex flex-col items-start justify-start pl-10 pt-8 pr-4 pb-8 h-fit ">
        {currentUser && (
          <div>
            <div className="flex items-center justify-start gap-x-5 w-full">
              
              <div className=" h-[200px] w-[200px] rounded-[10px] bg-gray-600 flex flex-col items-center justify-center relative">
                <input
                  ref={proFileImageRef}
                  type="file"
                  onChange={handleSetProfileImage}
                  className="hidden"
                />
                <button
                  onClick={editProfile}
                  className="absolute top-0 -right-3 bg-primary6 p-2 rounded-full cursor-pointer"
                >
                  <Icon icon="bx:edit" className="text-[#fff] h-6 w-6" />
                </button>
                {currentUser.profileImage || profileImage ? (
                  <img
                    src={currentUser.profileImage || profileImage}
                    alt=""
                    className="w-full h-full object-cover rounded-[10px]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon
                      icon="token:sei-network"
                      className="h-full w-full text-base-200"
                    />
                  </div>
                )}
              </div>
              {
                profileImage && (
                  <button onClick={saveProfileImage} className="bg-primary/50 hover:bg-primary/75 p-2 rounded-md text-[13px] text-[#fff] cursor-pointer flex items-center justify-center">
                  save profile image
                  {isSavingImage&&(
                    <span className="ml-2 h-4 w-4 rounded-full animate-spin border-2 border-base border-t-transparent "></span>
                  )}
                </button>
                )
              }
           
            </div>
            <div className="flex flex-col items-start justify-center mt-5">
              <div className="flex flex-col gay-y-2 items-start justify-center">
                <h1 className="text-lg font-bold text-[25px]">
                  {currentUser?.username}
                </h1>
                <h3 className="opacity-50">{currentUser?.email}</h3>
              </div>
              <div className="flex flex-col items-start justify-center mt-5 w-full">
                <p className=" text-[13px] opacity-70">
                  A passionate software developer with over 5 years of
                  experience in full-stack development. Loves coding, coffee,
                  and solving complex problems. Always eager to learn new
                  technologies and collaborate with like-minded professionals.
                </p>
              </div>
              <h3 className="text-lg font-bold text-[25px] mt-7 pb-1">
                Your contacts
                <span className="ml-1">({myContacts.length})</span>
              </h3>
              <UserContacts myContacts={myContacts} onlineContacts={onlineContacts} handleRemoveContacts={handleRemoveContacts} dummyContacts={dummyContacts} />
              <div className="flex flex-col items-start justify-start w-full px-4">
                <h3 className="text-lg font-bold text-[25px] mt-7 pb-1">
                  Privacy settings
                </h3>
                <div className="flex flex-col items-start gap-y-7 mt-3 justify-between w-full">
                  <PrivacyOption privacyTitle="Hide my profile photo" privacyValue="hideProfilePhoto" />
                  <PrivacyOption privacyTitle="Hide online status" privacyValue="hideOnlineStatus" />
                  <PrivacyOption privacyTitle="Hide last seen" privacyValue="hideLastSeen" />
                  <PrivacyOption privacyTitle="Do not find me by search" privacyValue="noFindingMe" />
                  <PrivacyOption privacyTitle="Show only my contacts" privacyValue="hideOtherContacts" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
