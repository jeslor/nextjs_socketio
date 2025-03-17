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
  console.log(session);

  useEffect(() => {
    if (session) {
      setUser(session?.user);
    }
  }, []);



  return (
    <div className="flex flex-col items-center justify-start w-full py-10">
      <div className="max-w-[1000px] w-full flex flex-col items-start justify-start pl-10 pr-4 pb-8 h-full overflow-y-scroll">
        <h1 className="text-4xl font-bold pb-5 text-primary7 text-center ">
          Profile
        </h1>

        {currentUser && (
          <>
            <div className=" h-[200px] w-[200px] rounded-[10px] bg-gray-600">
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
                <p>
                  Here’s an improved version of your sentence for better clarity
                  and professionalism: "Ms. Nakkungu is employed as the Head of
                  Procurement at Calm Consult Limited in Uganda. She is using
                  her approved work leave to visit me, and I assure you that she
                  will return to Uganda before her visa expires to resume her
                  professional responsibilities."
                </p>
              </div>
              <h3 className="text-lg font-bold text-[25px] mt-7 pb-1">
                Your contacts
              </h3>
              <div className="bg-primary/10 w-full  mb-5 py-5 px-6 rounded-[10px]">
                {currentUser.contacts.length ? (
                  currentUser.contacts.map((contact: any) => (
                    <div className="flex flex-col items-center justify-center">
                      <h1>{contact.username}</h1>
                      <h3>{contact.email}</h3>
                    </div>
                  ))
                ) : (
                  <div>
                    <p className="pb-3">
                      You don't have contacts yet 😞
                    </p>
                    <div className="avatar-group space-x-2 space-y-3 flex-wrap">
                      {dummyContacts.map((contact: any) => (
                        <div className="avatar">
                          <div className="w-12">
                            <Icon
                              icon="icon-park-twotone:user"
                              className="h-full w-full opacity-45"
                            />
                          </div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default page;
