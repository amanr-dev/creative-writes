"use client";

import React, { useEffect, useState } from "react";
import Writes from "../../../components/Writes";
import { useRouter, useSearchParams } from "next/navigation";
import { auth, db } from "../../../utils/firebase";
import { toast } from "react-toastify";
import {
  Timestamp,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

const SlugDetails = () => {
  const route = useRouter();
  const searchQuery = useSearchParams();
  const [comments, setComments] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    setPosts({
      avatar: searchQuery.get("avatar"),
      desc: searchQuery.get("desc"),
      id: searchQuery.get("id"),
      timestamps: searchQuery.get("timestamps"),
      user: searchQuery.get("user"),
      username: searchQuery.get("username"),
    });
  }, []);
  //   console.log(posts);

  //   Submit comments
  const submitComments = async () => {
    let id = searchQuery.get("id");

    // Check the user is logged or not
    if (!auth.currentUser) return route.push("/auth/login");
    if (!comments) {
      toast.error("Don't leave an empty comment😅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
      return;
    }

    const docRef = doc(db, "posts", id);
    await updateDoc(docRef, {
      comments: arrayUnion({
        comments,
        avatar: auth.currentUser.photoURL,
        userName: auth.currentUser.displayName,
        time: Timestamp.now(),
      }),
    });

    setComments("");
  };

  //   Get Comments
  const getComments = async () => {
    let id = searchQuery.get("id");
    const docRef = doc(db, "posts", id);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setAllComments(snapshot.data().comments);
    });
    return unsubscribe;
  };
  useEffect(() => {
    setTimeout(() => {
      getComments();
     //  console.log("getting the comments");
    }, 2500);
  }, []);

  return (
    <div>
      <Writes {...posts}></Writes>
      <div className="my-4 ">
        <div className="flex">
          <input
            onChange={(e) => setComments(e.target.value)}
            type="text"
            value={comments}
            placeholder="Add Comments Here"
            className="bg-slate-700 w-1/2 p-2 text-white text-sm ml-[25%] rounded-lg"
          />
          <button
            onClick={() => submitComments()}
            className="bg-cyan-500 text-white py-2 px-4 rounded-lg text-sm"
          >
            Submit
          </button>
        </div>
        <div className="py-6">
          <h6 className="font-bold">Comments</h6>
          {allComments?.map((comment) => (
            <div className="bg-white p-4 my-4 border-2" key={comment.time}>
              <div className="flex items-center gap-2 mb-4">
                <img
                  className="w-10 rounded-full"
                  src={comment.avatar}
                  alt="user"
                />
                <h2>{comment.userName}</h2>
              </div>
              <h2>{comment.comments}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlugDetails;
