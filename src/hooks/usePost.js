import { useState, useEffect } from "react";
import { db } from "../firebase";

export default function usePost(postId) {
  const [post, setPost] = useState(null);
  const [errorMessage, seterrorMessage] = useState(null);

  useEffect(() => {
    if (postId) {
      db.doc(`posts/${postId}`)
        .get()
        .then((snap) => {
          if (snap.exists) {
            const data = snap.data();
            setPost({
              id: snap.id,
              ...data,
              createdAt: data.createdAt.toDate(),
              updatedAt: data.updatedAt.toDate(),
            });
          } else {
            setPost(false);
          }
        })
        .catch((e) => seterrorMessage(e.message));
    }
  }, [postId]);

  const deletePost = () =>
    db
      .doc(`posts/${postId}`)
      .delete()
      .then(() => setPost(false));

  return { post, error: errorMessage, deletePost };
}
