import { useState, useEffect, useRef } from "react";
import firebase, { db } from "../firebase";
import { useAuth } from "./useAuth";

export default function useComment(postId) {
  const auth = useAuth();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const lastDoc = useRef(null);

  const fetchComments = (limit = 5) => {
    setIsLoading(true);
    setHasMore(false);

    let dbRef = db.collection(`posts/${postId}/comments`).orderBy("createdAt");

    if (lastDoc.current) {
      dbRef = dbRef.startAfter(lastDoc.current);
    }

    dbRef
      .limit(limit)
      .get()
      .then((snap) => {
        lastDoc.current = snap.docs[snap.docs.length - 1];

        setIsLoading(false);
        setHasMore(true);
        if (!snap.empty) {
          const commentsDoc = [];
          snap.forEach((doc) => {
            const data = doc.data();
            commentsDoc.push({
              id: doc.id,
              ...data,
              createdAt: data.createdAt.toDate(),
              updatedAt: data.updatedAt.toDate(),
            });
          });
          setComments((prevComments) => [...prevComments, ...commentsDoc]);
        } else {
          setHasMore(false);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        setErrorMessage(e.message);
        //console.log(e);
      });
  };

  useEffect(() => {
    lastDoc.current = null;
    setComments([]);
    fetchComments();
  }, []);

  const addComment = (comment) => {
    return db
      .collection(`posts/${postId}/comments`)
      .add({
        author: {
          uid: auth.user.uid,
          displayName: auth.user.displayName,
          photoURL: auth.user.photoURL,
          userName: auth.user.userName,
        },
        content: comment,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        lastDoc.current = null;
        setComments([]);
        fetchComments();
      });
  };

  const deleteComment = (commentId) => {
    const index = comments.findIndex((comment) => comment.id === commentId);
    if (index < 0) return;

    return db
      .doc(`posts/${postId}/comments/${commentId}`)
      .delete()
      .then(() => {
        comments.splice(index, 1);
        setComments([...comments]);
      });
  };

  return {
    loading: isLoading,
    comments,
    hasMore,
    error: errorMessage,
    fetchComments,
    addComment,
    deleteComment,
  };
}
