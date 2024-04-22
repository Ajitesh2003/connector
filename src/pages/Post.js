import React, { useEffect, useState } from "react";
import { auth, db } from "@/Utils/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

const Post = () => {
  const [post, setPost] = useState({ description: "" });
  const [user, loading] = useAuthState(auth);
  const Router = useRouter();
  const updateData = Router.query;

  const SubmitPost = async (e) => {
    e.preventDefault();
    // Running Checks...
    if (!post.description) {
      toast.error("Description Not found :(", {
        position: "top-center",
        autoClose: 1500,
      });

      return;
    }
    if (post.description.length > 300) {
      toast.error("Description too long :(", {
        position: "top-center",
        autoClose: 1500,
      });

      return;
    }

    if (post?.hasOwnProperty("id")) {
      const docRef = doc(db, "posts", post.id);
      const updatedPost = { ...post, timeStamp: serverTimestamp() };
      await updateDoc(docRef, updatedPost);
      return Router.push("/");
    } else {
      // Making of a new Post...
      const collectionRef = collection(db, "posts");
      await addDoc(collectionRef, {
        ...post,
        timeStamp: serverTimestamp(),
        user: user.uid,
        avatar: user.photoURL,
        username: user.displayName,
      });
      setPost({ description: "" });
      toast.success("Post has been made :)", {
        position: "top-center",
        autoClose: 1500,
      });
      return Router.push("/");
    }
  };

  const CheckUser = async () => {
    if (loading) return;
    if (!user) Router.push("/Auth/Login");
    if (updateData.id) {
      setPost({ description: updateData.description, id: updateData.id });
    }
  };

  useEffect(() => {
    CheckUser();
  }, [user, loading]);

  return (
    <div className="my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto">
      <form onSubmit={SubmitPost}>
        <h1 className="text-2xl font-bold">
          {post.hasOwnProperty("id") ? "Edit Your Post" : "Create Your Post"}
        </h1>
        <div className="py-2">
          <h3 className="text-lg font-medium py-2">Description</h3>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            className="bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-sm"
          ></textarea>
          <p
            className={`text-cyan-600 font-medium text-sm ${
              post.description.length > 300 ? "text-red-600" : ""
            }`}
          >
            {post.description.length}/300
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-cyan-600 text-white font-medium p-2 my-2 rounded-lg text-sm"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Post;
