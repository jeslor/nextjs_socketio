"use client";
import { useCurrentUserStore } from "@/components/providers/userProvider";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const dummyContacts = Array.from({ length: 7 });

const page = () => {
  const { currentUser } = useCurrentUserStore();
  const { data: session } = useSession();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    if (session) {
      setUser(session?.user);
    }
  }, []);



  return (
    <div className="flex items-center justify-start w-full py-10">
      <div className="max-w-[1000px] w-full flex flex-col items-start justify-start pl-10 pr-4 pb-8 h-full overflow-y-scroll">
        {currentUser && (
          <div>
            <div className=" h-[200px] w-[200px] rounded-[10px] bg-gray-600 flex flex-col items-center justify-center">
              {currentUser.profileImage ? (
                <img
                  src={currentUser.profileImage}
                  alt=""
                  className="w-full h-full rounded-full"
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
            <div className="flex flex-col items-start justify-center mt-5">
              <div className="flex flex-col gay-y-2 items-start justify-center">
                <h1 className="text-lg font-bold text-[25px]">
                  {currentUser?.username}
                </h1>
                <h3 className="opacity-50">{currentUser?.email}</h3>
              </div>
              <div className="flex flex-col items-start justify-center mt-5 w-full">
                <p className=" text-[13px] opacity-70">
                A passionate software developer with over 5 years of experience in full-stack development. Loves coding, coffee, and solving complex problems. Always eager to learn new technologies and collaborate with like-minded professionals.
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
                    <p className="pb-3">
                      You don't have contacts yet 😞
                    </p>
                    <div className="avatar-group  space-y-3 flex-wrap">
                      {dummyContacts.map((contact: any, i:number) => (
                        <div key={i} className=" flex flex-col gap-y-1 items-center mx-3">
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
                  <input type="checkbox" defaultChecked className="toggle toggle-md" />
                    <label  className="ml-2" htmlFor="public">Public</label>
                  </div>
                  <div className="flex items-center  px-2">
                  <input type="checkbox" defaultChecked className="toggle toggle-md" />
                    <label className="ml-2"  htmlFor="private">Private</label>
                  </div>
                  <div className="flex items-center  px-2">
                  <input type="checkbox" defaultChecked className="toggle toggle-md" />
                    <label className="ml-2"  htmlFor="private">Private</label>
                  </div>
                  <div className="flex items-center  px-2">
                  <input type="checkbox" defaultChecked className="toggle toggle-md" />
                    <label className="ml-2"  htmlFor="private">Private</label>
                  </div>
                  <div className="flex items-center  px-2">
                  <input type="checkbox" defaultChecked className="toggle toggle-md" />
                    <label className="ml-2"  htmlFor="private">Private</label>
                  </div>
                  <div className="flex items-center  px-2">
                  <input type="checkbox" defaultChecked className="toggle toggle-md" />
                    <label className="ml-2"  htmlFor="private">Private</label>
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
