"use client";

import { auth, db } from "../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { AiFillEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Writes from "../../../components/Writes";
import Link from "next/link";

const Dashboard = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [allPosts, setAllPosts] = useState([]);

  const checkStatus = async () => {
    if (loading) return;
    if (!user) {
      router.push("/auth/login");
    }

    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, where("user", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
    return unsubscribe;
  };

  // Delete Posts
  const deletePosts = async (id) => {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
  };

  useEffect(() => {
    checkStatus();
  }, [user, loading]);

  // console.log(allPosts);
  return (
    <div className="px-2 m-4">
      <h1 className="text-2xl text-slate-500 font-medium mx-50px">
        Your Posts
      </h1>
      <div>
        {allPosts.map((post, idx) => {
          return (
            <Writes {...post} key={idx}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <Link href={{ pathname: "/posts", query: post }}>
                  <button
                    style={{
                      color: "rgb(8,145,178)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "5px",
                      marginTop: "15px",
                    }}
                  >
                    <AiFillEdit
                      style={{
                        color: "rgb(8,145,178)",
                        fontSize: "1.2rem",
                      }}
                    />
                    Edit
                  </button>
                </Link>

                <button
                  style={{
                    color: "red",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                    marginTop: "5px",
                  }}
                  onClick={() => deletePosts(id)}
                >
                  <BiTrash
                    style={{
                      color: "red",
                      fontSize: "1.2rem",
                    }}
                  />
                  Delete
                </button>
              </div>
            </Writes>
          );
        })}
      </div>
      <button
        className="font-medium text-white bg-slate-700 py-2 px-4 rounded-lg"
        onClick={() => auth.signOut()}
      >
        Sign out
      </button>
    </div>
  );
};

export default Dashboard;
