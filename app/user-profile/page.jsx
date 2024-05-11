"use client";
import Loader from "@/components/Loader";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useGetUser } from "@/lib/actions/actions";
import React from "react";

function Profile() {
  const [user, userLoading, reloadUser] = useGetUser();
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col gap-4">
        <h1 className="text-center text-3xl">My profile</h1>

        {userLoading ? (
          <div className="">
            <div className=" z-50 flex justify-center items-start pt-6">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <h2>Name : {user.full_name}</h2>
            <h2>Email : {user.email}</h2>
            <h2>User Id : {user.user_id}</h2>
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  );
}

export default Profile;
