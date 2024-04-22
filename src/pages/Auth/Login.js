import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/Utils/Firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
  const Route = useRouter();
  const [user, loading] = useAuthState(auth);

  //SignIN with google

  const GoogleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, GoogleProvider);
      Route.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      Route.push("/");
    } else {
      console.log("done");
    }
  }, [user]);

  return (
    <div className="shadow-xl mt-32 p-10 text-gray-700 rounded-lg">
      <h2 className="text-2xl font-medium ">Join Today...</h2>
      <div className="py-4">
        <h3 className="py-4">Sign In with the following </h3>
        <button
          onClick={GoogleLogin}
          className="text-white bg-gray-700 w-full font-medium rounded-lg flex align-middle p-4 gap-3"
        >
          <FcGoogle className="text-2xl" />
          Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
