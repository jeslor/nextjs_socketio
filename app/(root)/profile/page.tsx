"use client";
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
              <div className="bg-primary/10 w-full  mb-5 py-5 px-6 rounded-[10px]">
                {myContacts.length ? (
                  <div className="flex items-center justify-start gap-x-5 flex-wrap">
                  { myContacts.map((contact: any) => (
                    <div key={contact._id} className="flex flex-col items-center justify-center relative group border-[1px] border-black/5  w-[200px] h-[200px] bg-white/10 rounded-[10px] p-2">
                      {contact.profileImage ? (
                        <div className="w-12 h-12 bg-base-100 p-2 rounded-full flex items-center justify-center relative">
                          <div className="absolute  h-full w-full border-3  border-primary  rounded-full opacity-0 group-hover:opacity-75 transition-all"></div>
                          {onlineContacts.includes(contact._id) && <span className='absolute h-3 w-3 rounded-full bg-green-700 top-0 left-9 border-[1px] border-green-300'></span>}
                        <img
                          src={contact.profileImage}
                          alt=""
                          className="size-[90%] rounded-full"
                        />
                      </div>
                      ):(
                        <div className="w-12 h-12 bg-base-100 p-2 rounded-full relative flex items-center justify-center">
                          <div className="absolute  h-full w-full border-3  border-primary  rounded-full opacity-0 group-hover:opacity-75"></div>
                          {onlineContacts.includes(contact._id) && <span className='absolute h-3 w-3 rounded-full bg-green-700 top-0 left-9 border-[1px] border-green-300'></span>}

                        <Icon
                          icon="icon-park-twotone:user"
                          className="h-full w-full opacity-45"
                        />
                      </div>
                      )
                    }
                      <h1 className="font-semibold text-[13px]">{contact.username}</h1>
                      <h3 className="text-[10px] text-primary/50">{contact.email}</h3>
                      <button onClick={()=>handleRemoveContacts(contact)} className="py-1 px-2 bg-primary/80 hover:bg-primary mt-2 rounded-[5px] text-[11px] text-base-100 font-semibold cursor-pointer">remove</button>
                    </div>
                  ))}
                 </div>
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
                      Show my profile photo
                    </label>
                  </div>
                  <div className="flex items-center  px-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="toggle toggle-md"
                    />
                    <label className="ml-2" htmlFor="private">
                      Show online status
                    </label>
                  </div>
                  <div className="flex items-center  px-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="toggle toggle-md"
                    />
                    <label className="ml-2" htmlFor="private">
                      Show my last seen
                    </label>
                  </div>
                  <div className="flex items-center  px-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="toggle toggle-md"
                    />
                    <label className="ml-2" htmlFor="private">
                      Find me by my email
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
