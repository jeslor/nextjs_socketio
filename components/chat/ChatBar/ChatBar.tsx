import { useCurrentUserStore } from "@/components/providers/userProvider";
import { updateUser } from "@/lib/actions/user.actions";

import { Icon } from "@iconify/react/dist/iconify.js";
import React, { memo, useEffect, useState } from "react";
import toast from "react-hot-toast";

const ChatBar = memo(() => {
  const [adding, setAdding] = useState(false);
  const {
    selectedUser,
    setSelectedUser,
    onlineContacts,
    currentUser,
    updateCurrentUser,
  } = useCurrentUserStore();
  const [alreadyAContact, setAlreadyAContact] = useState<boolean>(false);

  const addContact = async () => {
    try {
      setAdding(true);
      const updatedCurrentUser = {...currentUser, contacts: [...currentUser.contacts, selectedUser]};
      const updatedUser = await updateUser(
        currentUser._id,
        updatedCurrentUser
      );
      if (updatedUser.status === 200) {
        updateCurrentUser(updatedCurrentUser)
        toast.success("Contact added successfully");
      }
      if (updatedUser.status !== 200) {
        toast.error("Error adding contact");
        throw new Error("Error adding contact");
      }
    } catch (error) {
      console.log("Error in updating current user with contacts", error);
    } finally {
      setAdding(false);
    }
  };

  useEffect(() => {
    if (adding) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
    } else {
      document.body.style.overflow = "auto";
        document.body.style.position = "static";
    }
    
  }, [adding]);

  useEffect(() => {
    if (selectedUser) {
      currentUser.contacts
        .map((user: any) => user._id)
        .includes(selectedUser._id)
        ? setAlreadyAContact(true)
        : setAlreadyAContact(false);
    }
  }, [currentUser.contacts, selectedUser]);



  return (
    <div className="h-[70px] w-full bg-base-200 p-4 flex justify-between items-center">
      {adding && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-base-200/80 flex justify-center items-center z-50">
          <div className="flex-flex-col justify-center items-center gap-y-8 bg-white/80 p-4 rounded-lg shadow-lg max-w-[300px] w-full">
            <div className="flex items-center gap-x-4">
              <div className="h-6 w-6  rounded-full animate-spin border-4 border-primary border-t-transparent"></div>
              <h3 className="text-primary font-bold text-sm">
                Adding contact...
              </h3>
            </div>
            <div className="mt-5 flex items-center gap-x-4">
              <div>
                <img className="h-12" src={selectedUser.profileImage} alt="" />
              </div>
              <div className="text-primary">
                <h3 className="font-bold">{selectedUser.username}</h3>
                <p className="opacity-70 text-[10px]">
                  {!selectedUser?.privacySettings?.hideOnlineStatus&&(onlineContacts.includes(selectedUser._id)
                    ? "online"
                    : "offline")}
                </p>
                <p className="opacity-50 text-[10px] text-black">
                  {selectedUser.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center">
        {(selectedUser.profileImage && selectedUser.profileImage.length > 0) &&!selectedUser?.privacySettings?.hideProfilePhoto ? (
          <img
            src={selectedUser.profileImage}
            alt=""
            className="w-10 h-10 rounded-full mr-4"
          />
        ) : (
          <div className="flex justify-center items-center w-10 h-10 rounded-full mr-4 bg-primary/20">
            <Icon
              icon="ix:user-profile-filled"
              className="text-base-200 size-[70%]"
            />
          </div>
        )}
        <div>
          <h3 className="font-bold">{selectedUser.username}</h3>
          <p className="opacity-40 text-[10px]">
            {!selectedUser?.privacySettings?.hideOnlineStatus&&(onlineContacts.includes(selectedUser._id) ? "online" : "offline")}
          </p>
        </div>
      </div>
      <div className="flex gap-x-4">
        <button className="text-[17px] hover:bg-primary/10 rounded-full p-2 cursor-pointer">
          <Icon icon="akar-icons:phone" className="text-primary text-[22px]" />
        </button>
        <button className="text-[17px] hover:bg-primary/10 rounded-full p-2 cursor-pointer">
          <Icon icon="akar-icons:video" className="text-primary text-[22px]" />
        </button>
        {!alreadyAContact && (
          <button
            onClick={addContact}
            className="text-[17px] hover:bg-primary/10 rounded-full p-2 cursor-pointer"
          >
            <Icon icon="mi:user-add" className="text-primary text-[22px]" />
          </button>
        )}
        <button
          onClick={() => setSelectedUser(null)}
          className="text-[17px] hover:bg-primary/10 rounded-full p-2 cursor-pointer"
        >
          <Icon icon="ic:baseline-close" className="text-primary text-[22px]" />
        </button>
      </div>
    </div>
  );
});

export default ChatBar;
