"use client";
import { db } from "../../utils/firebase";
import { useEffect, useState } from "react";
import Writes from "../../components/Writes";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import {
  Blocks,
  Audio,
  ColorRing,
  Discuss,
  ProgressBar,
  Puff,
  TailSpin,
  Vortex,
} from "react-loader-spinner";

export default function Home() {
  // State of all the posts
  const [allPosts, setAllPosts] = useState([]);

  const getPosts = async () => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("timestamps", "desc"));
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

  useEffect(() => {
    getPosts();
  }, []);

  // #0891B2

  if (!allPosts.length)
    return (
      <div className="flex flex-col justify-center items-center w-full h-[100vh]">
        <Puff
          height={100}
          width={100}
          secondaryColor="#10a8cc"
          radius={50}
          color="#0891B2"
        />
        <h4 className="text-slate-500 text-xl font-semibold mt-2">
          Please wait, Loading...
        </h4>
      </div>
    );

  return (
    <main className="w-full p-2">
      <div className="my-12">
        <h4 className="text-2xl text-slate-500">See What People sharing</h4>
      </div>
      <section className="grid grid-cols-2 gap-6">
        {allPosts.map((post) => (
          <Writes key={post.id} {...post}>
            <Link href={{ pathname: `${post.id}`, query: { ...post } }}>
              <span
                className="text-sm pt-2 text-cyan-500"
                style={{ paddingLeft: "50px", paddingTop: "10px" }}
              >
                {post.comments?.length > 0 ? post.comments?.length : 0} comments
              </span>
            </Link>
          </Writes>
        ))}
      </section>
    </main>
  );
}
