import React, { useEffect, useState } from "react";
import Message from "@/Components/Message";
import { db } from "@/Utils/Firebase";
import Link from "next/link";
import { LiaCommentSolid } from "react-icons/lia";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export default function Home() {
  const [allPosts, setAllPosts] = useState([]);

  // Whenever a post is required, get it from the db using the collectionRef method..
  const getPosts = async () => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("timeStamp", "desc"));
    // realtime stuff using snapshot method...
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return unsubscribe;
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="my-12 text-lg font-medium">
      <h2>See what others are saying...</h2>

      {allPosts.map((post) => (
        <Message {...post}>
          <Link href={{ pathname: `/${post.id}`, query: { ...post } }}>
            <button className="flex items-center justify-center gap-2">
              {" "}
              {post.comments?.length > 0 ? post.comments.length : 0}{" "}
              <LiaCommentSolid />{" "}
            </button>
          </Link>
        </Message>
      ))}
    </div>
  );
}
