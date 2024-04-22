import React, { useEffect, useState } from "react";
import { auth, db } from "@/Utils/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Message from "@/Components/Message";
import { BsTrashFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const Route = useRouter();
  const [posts, setPosts] = useState([]);

  const GetData = async () => {
    if (loading) return;
    if (!user) return Route.push("/Auth/Login");
    const collectionRef = collection(db, "posts");
    // this time it will only show your posts thats why, only you will have the ability to delete your post
    const q = query(collectionRef, where("user", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return unsubscribe;
  };

  const deletePost = async (id) => {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
  };

  useEffect(() => {
    GetData();
  }, [user, loading]);

  return (
    <div>
      <h1>Your Posts</h1>
      {posts.map((post) => {
        return (
          <Message {...post}>
            <div className="flex gap-4">
              <button
                onClick={() => deletePost(post.id)}
                className="text-red-600 flex items-center justify-center gap-2 py-2 text-sm"
              >
                <BsTrashFill className="text-2xl" />
                Delete
              </button>
              <Link href={{ pathname: "/Post", query: post }}>
                <button className="text-yellow-600 flex items-center justify-center gap-2 py-2 text-sm">
                  <FaEdit className="text-2xl" />
                  Edit
                </button>
              </Link>
            </div>
          </Message>
        );
      })}
      <button
        className="font-medium text-blue-800 bg-gray-800 py-2 px-4 my-6 "
        onClick={() => auth.signOut()}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;
