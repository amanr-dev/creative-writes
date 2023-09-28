"use client";

import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../../utils/firebase";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

const Login = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  // Sign in with google
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    } else {
      console.log("login");
    }
  }, [user]);

  return (
    <section className="mt-[25vh]">
      <div className="shadow-xl p-10 text-gray-700 rounded-lg w-[400px] h-[300px] flex items-center flex-col mx-auto ">
        <h2 className="text-2xl font-medium">Join Today</h2>
        <div className="py-4 text-center">
          <h3 className="py-4">Sign in with Google</h3>
          <button
            onClick={GoogleLogin}
            className="text-white bg-gray-700 font-medium rounded-lg w-[200px] flex p-4  justify-center"
          >
            <FcGoogle className="text-2xl gap-8" />
            <span className="ml-2">Sign in</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
