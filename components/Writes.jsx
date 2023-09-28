// import Link from "next/link";
import React from "react";
// import { AiFillEdit } from "react-icons/ai";
// import { BiTrash } from "react-icons/bi";

const Writes = ({
  children,
  avatar,

  username,
  desc,
}) => {
  return (
    <div
      style={{
        background: "white",
        borderBottom: "2px solid gray",
        borderRadius: "20px",
        padding: "25px 30px",
        margin: "20px auto",
        width: "50%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          style={{ width: "40px", borderRadius: "50%" }}
          src={avatar}
          alt="user"
        />
        <h4>{username}</h4>
      </div>
      <div>
        <p>{desc}</p>
      </div>
      {children}
      {/* <div
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
      </div> */}
    </div>
  );
};

export default Writes;
