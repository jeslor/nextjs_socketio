"use client";
import { useCurrentUserStore } from "@/components/providers/userProvider";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";

const dummyContacts = Array.from({ length: 7 });

const page = () => {
  const { currentUser, setNewProfilePhoto } = useCurrentUserStore();
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
    if (profileImage) {
      await setNewProfilePhoto(profileImage);
    }
  };

  return (
    <div className="flex items-center justify-start w-full py-10">
      <div className="max-w-[1000px] w-full flex flex-col items-start justify-start pl-10 pr-4 pb-8 h-full overflow-y-scroll">
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
                  <button onClick={saveProfileImage} className="bg-primary/50 hover:bg-primary/75 p-2 rounded-md text-[13px] text-[#fff] cursor-pointer">
                  save profile image
                  <span className="ml-2">

                  </span>
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
              </h3>
              <div className="bg-primary/10 w-full  mb-5 py-5 px-6 rounded-[10px]">
                {currentUser.contacts.length ? (
                  currentUser.contacts.map((contact: any) => (
                    <div className="flex flex-col items-center justify-center">
                      <div>
                        <img
                          src={contact.profileImage}
                          alt=""
                          className="w-12 rounded-full"
                        />
                      </div>
                      <h1>{contact.username}</h1>
                      <h3>{contact.email}</h3>
                    </div>
                  ))
                ) : (
                  <div>
                    <p className="pb-3">You don't have contacts yet 😞</p>
                    <div className="avatar-group  space-y-3 flex-wrap">
                      {dummyContacts.map((contact: any, i: number) => (
                        <div
                          key={i}
                          className=" flex flex-col gap-y-1 items-center mx-3"
                        >
                          <div className="w-12 h-12 bg-base-100 p-2 rounded-full">
                            <Icon
                              icon="icon-park-twotone:user"
                              className="h-full w-full opacity-45"
                            />
                          </div>
                          <p className="text-[12px]  opacity-55">dummy user</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-start justify-start w-full px-4">
                <h3 className="text-lg font-bold text-[25px] mt-7 pb-1">
                  Privacy settings
                </h3>
                <div className="flex flex-col items-start gap-y-7 mt-3 justify-between w-full">
                  <div className="flex items-center  px-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="toggle toggle-md"
                    />
                    <label className="ml-2" htmlFor="public">
                      Public
                    </label>
                  </div>
                  <div className="flex items-center  px-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="toggle toggle-md"
                    />
                    <label className="ml-2" htmlFor="private">
                      Private
                    </label>
                  </div>
                  <div className="flex items-center  px-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="toggle toggle-md"
                    />
                    <label className="ml-2" htmlFor="private">
                      Private
                    </label>
                  </div>
                  <div className="flex items-center  px-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="toggle toggle-md"
                    />
                    <label className="ml-2" htmlFor="private">
                      Private
                    </label>
                  </div>
                  <div className="flex items-center  px-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="toggle toggle-md"
                    />
                    <label className="ml-2" htmlFor="private">
                      Private
                    </label>
                  </div>
                  <div className="flex items-center  px-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="toggle toggle-md"
                    />
                    <label className="ml-2" htmlFor="private">
                      Private
                    </label>
                  </div>
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
