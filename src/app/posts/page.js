"use client";
import { auth, db } from "../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

const Posts = () => {
  const route = useRouter();
  const queryParams = useSearchParams();
  const [posts, setPosts] = useState({ desc: "" });
  const [user, loading] = useAuthState(auth);

  // const query = window.document.URL;
  // // .slice(28);
  // // console.log(queryParams.has("id"));

  // Submit posts
  const submitPosts = async (e) => {
    e.preventDefault();

    // Run checks for desc
    if (!posts.desc) {
      toast.error("Post is empty", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }
    if (posts.desc.length > 300) {
      toast.error("Post length is too long", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }

    // add edit post to new collection
    if (posts.hasOwnProperty("id")) {
      const docRef = doc(db, "posts", posts.id);
      const updatedPost = { ...posts, timestamps: serverTimestamp() };
      await updateDoc(docRef, updatedPost);
      return route.push("/");
    } else {
      //     Make a new collection
      const collectionRef = collection(db, "posts");
      await addDoc(collectionRef, {
        ...posts,
        timestamps: serverTimestamp(),
        user: user.uid,
        avatar: user.photoURL,
        username: user.displayName,
      });
      setPosts({ desc: "" });
      toast.success("Your Post has been added.🔥", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      route.push("/");
    }
  };

  const checkUser = async () => {
    if (loading) return;
    if (!user) {
      route.push("/auth/login");
    }
    if (queryParams.has("id")) {
      setPosts({
        desc: queryParams.get("desc"),
        id: queryParams.get("id"),
      });
    }
  };
  useEffect(() => {
    checkUser();
  }, [user, loading]);

  return (
    <div className="my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto">
      <form onSubmit={submitPosts}>
        <h1 className="text-2xl font-bold text-slate-500">
          {posts.hasOwnProperty("id")
            ? "Edit your thoughts"
            : "Write your thoughts"}
        </h1>
        <div className="py-2 text-slate-500">
          <h3 className="text-lg font-medium py-2">Description</h3>
          <textarea
            value={posts.desc}
            placeholder="Write and share your thoughts"
            onChange={(e) => setPosts({ ...posts, desc: e.target.value })}
            className="bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-sm"
          />
          <p
            className={
              posts.desc.length >= 300 ? "text-red-800 font-semibold" : ""
            }
          >
            {posts.desc.length}/300
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-cyan-600 text-white font-medium p-2 my-2 rounded-md"
        >
          sumbit
        </button>
      </form>
    </div>
  );
};

export default Posts;
