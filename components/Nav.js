"use client";

import React from "react";
import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Nav() {
  const [user, loading] = useAuthState(auth);
  return (
    <nav
      className="flex items-center"
      style={{
        justifyContent: "space-between",
        padding: "20px 10px",
        borderBottom: "2px solid #0891b2",
        background: "#fff",
      }}
    >
      <Link href="/">
        <button
          style={{
            fontSize: "1.4rem",
            color: "rgb(8,145,178)",
            fontWeight: "600",
            textTransform: "capitalize",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src="https://e7.pngegg.com/pngimages/217/193/png-clipart-homework-test-education-student-computer-icons-student-people-essay.png"
            alt="creative-writes"
            style={{
              width: "90px",
              filter: "brightness(1.1)",
            }}
          />
          creative writes
        </button>
      </Link>

      {!user && (
        <button
          style={{
            background: "rgb(8,145,178)",
            color: "#fff",
            fontSize: "1.1rem",
            padding: "5px 10px",
            borderRadius: "8px",
          }}
        >
          <Link href={"/auth/login"}>
            <span>Join Now</span>
          </Link>
        </button>
      )}

      {user && (
        <div
          style={{
            display: "flex",
            color: "#fff",
            fontSize: "1.1rem",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <Link
            href="/posts"
            style={{
              padding: "5px 15px",
              background: "rgb(8,145,178)",
              borderRadius: "8px",
            }}
          >
            <span>write✍️</span>
          </Link>
          <Link href="/dashboard">
            <img
              src={user.photoURL}
              alt="user"
              style={{
                width: "50px",
                borderRadius: "50%",
              }}
            />
          </Link>
        </div>
      )}
    </nav>
  );
}
