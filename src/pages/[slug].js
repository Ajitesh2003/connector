import Message from "@/Components/Message";
import { auth, db } from "@/Utils/Firebase";
import {
  Timestamp,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Details = () => {
  const Route = useRouter();
  const RouteData = Route.query;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const submitMessage = async () => {
    if (!auth.currentUser) return Route.push("/Auth/Login");

    if (!comment) {
      toast.error("Empty Comment", {
        position: "top-center",
        autoClose: 1500,
      });
      return;
    }

    const docRef = doc(db, "posts", RouteData.id);
    await updateDoc(docRef, {
      comments: arrayUnion({
        comment,
        avatar: auth.currentUser.photoURL,
        userName: auth.currentUser.displayName,
        time: Timestamp.now(),
      }),
    });

    setComment("");
  };

  const getComments = async () => {
    const docRef = doc(db, "posts", RouteData.id);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setAllComments(snapshot.data().comments);
    });

    return unsubscribe;
  };

  useEffect(() => {
    if (!Route.isReady) return;
    getComments();
  }, [Route.isReady]);

  return (
    <div>
      <Message {...RouteData}></Message>
      <div className="my-4">
        <div className="flex">
          <input
            onChange={(e) => setComment(e.target.value)}
            type="text"
            value={comment}
            placeholder="Send a comment"
            className="bg-gray-800 w-full p-2 text-white text-sm"
          />
          <button
            onClick={submitMessage}
            className="bg-cyan-500 text-white py-2 px-4 text-sm"
          >
            submit
          </button>
        </div>
        <div className="py-6">
          <h2 className="font-bold">Comments</h2>
          {allComments?.map((acomment) => {
            return (
              <div className="p-4 my-4 border-2" key={acomment.time}>
                <div className="flex items-center gap-2 mb-4">
                  <img className="w-10 rounded-full" src={acomment.avatar} />
                  <h2>{acomment.userName}</h2>
                </div>
                <h2>{acomment.comment}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Details;
