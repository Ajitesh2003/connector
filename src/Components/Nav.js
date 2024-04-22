import React from "react";
import Link from "next/link";
import { auth } from "@/Utils/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Nav = () => {
  // whenever u need to do something with the user , use the two hooks, auth and useAuthState
  const [user, loading] = useAuthState(auth);

  return (
    <nav className="flex justify-between items-center py-10">
      <Link href="/">
        <button className="text-lg font-medium">Create Wit..</button>
      </Link>
      <ul className="flex items-center gap-10">
        {!user && (
          <Link href={"/Auth/Login"}>
            <div className="py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-medium ml-8">
              Join Now
            </div>
          </Link>
        )}
        {user && (
          <div className="flex items-center gap-6">
            <Link href="/Post">
              <button className="font-medium bg-cyan-500 text-white py-2 px-4 rounded-mg text-sm">
                POST
              </button>
            </Link>
            <Link href="/Dashboard">
              <img
                className="w-12 rounded-full cursor-pointer"
                src={user.photoURL}
                alt=""
              />
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
