import { useState } from "react";
import firebase, { db } from "../firebase";
import { useAuth } from "./useAuth";

export default function useLike(postId, likes = []) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(likes.includes(user?.uid));

  // useEffect(() => {
  //   db.doc(`posts/${postId}/likes/${user?.uid}`)
  //     .get()
  //     .then((snap) => setIsLiked(snap.exists));
  // }, []);

  const addLike = () =>
    db
      .doc(`posts/${postId}/likes/${user?.uid}`)
      .set({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => setIsLiked(true));

  const removeLike = () =>
    db
      .doc(`posts/${postId}/likes/${user?.uid}`)
      .delete()
      .then(() => setIsLiked(false));

  const toggleLike = () => {
    if (isLiked === null) return;
    if (isLiked === true) {
      return removeLike();
    } else {
      return addLike();
    }
  };

  return {
    isLiked,
    toggleLike,
  };
}
