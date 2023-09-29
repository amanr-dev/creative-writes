"use client";
import { db } from "../../utils/firebase";
import { useEffect, useState } from "react";
import Writes from "../../components/Writes";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";

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
