"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React from "react";
import { useCurrentUserStore } from "../providers/userProvider";

const NavSide = () => {
  const { logoutUser, currentUser } = useCurrentUserStore();

  return (
    <aside className="h-[50px] tablet:h-full fixed bottom-0 w-full z-500  bg-base-100 tablet:bg-transparent  tablet:relative flex tablet:flex-col justify-between gap-y-6 tablet:py-10 px-4 tablet:px-1 tablet:w-fit border-r-[1px] border-primary/20 ">
      <div className="flex justify-center items-center tablet:flex-col gap-y-4">
        <div className="flex justify-center items-center p-1 border-2 bg-white border-base-300 h-fit w-fit rounded-full">
          {currentUser && currentUser.profileImage ? (
            <img
              src={currentUser.profileImage}
              className="size-7 tablet:size-16 rounded-full object-cover object-top"
            />
          ) : (
            <img
              src="/images/logo.webp"
              className="size-7 tablet:size-16 rounded-md object-contain"
            />
          )}
        </div>
        <Link
          className="cursor-pointer p-3.5 rounded hover:bg-base-200 flex justify-center items-center"
          href="/profile"
        >
          <Icon className="size-7" icon="fluent-mdl2:profile-search" />
        </Link>
        <Link
          className="cursor-pointer p-3.5 rounded hover:bg-base-200 flex justify-center items-center"
          href="/chat"
        >
          <Icon className="size-7" icon="mynaui:chat-messages" />
        </Link>
        <Link
          className="cursor-pointer p-3.5 rounded hover:bg-base-200 flex justify-center items-center"
          href="/settings"
        >
          <Icon className="size-7" icon="lets-icons:setting-line" />
        </Link>
        <Link
          className="cursor-pointer p-3.5 rounded hover:bg-base-200 flex justify-center items-center"
          href="/settings"
        >
          <Icon className="size-7" icon="fluent-mdl2:favorite-list" />
        </Link>
      </div>
      <button
        onClick={logoutUser} // Call logout function properly
        className="self-end tablet:mb-8 p-3.5 rounded hover:bg-base-200 flex justify-center items-center cursor-pointer font-bold"
      >
        <span className="hidden tablet:block">Logout</span>
        <Icon icon="material-symbols:logout" className="size-7 tablet:hidden" />
      </button>
    </aside>
  );
};

export default NavSide;
