"use client";
import { useEffect } from "react";
import { useCurrentUserStore } from "./providers/userProvider";
import { useSession } from "next-auth/react";

const UserSetter = ({ currUser }: any) => {
  const {data:session} = useSession ();
  const { setCurrentUser } = useCurrentUserStore();


  return null;
};

export default UserSetter;