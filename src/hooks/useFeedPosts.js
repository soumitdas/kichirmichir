import { useEffect, useState, useRef } from "react";
import { useAuth } from "./useAuth";
import firebase, { db } from "../firebase";

export default function useFeedPosts() {
  const auth = useAuth();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const lastDoc = useRef(null);
  const following =
    auth.user?.following instanceof Array ? auth.user?.following : [];

  const fetchPosts = (limit = 10) => {
    setIsLoading(true);
    setHasMore(false);

    db.collection("posts")
      .where("author.uid", "in", [...following.slice(0, 9), auth.user.uid])
      .orderBy("createdAt", "desc")
      .startAfter(lastDoc.current || [])
      .limit(limit)
      .get()
      .then((snap) => {
        lastDoc.current = snap.docs[snap.docs.length - 1];

        setIsLoading(false);
        setHasMore(true);
        if (!snap.empty) {
          const postDocs = [];
          snap.forEach((doc) => {
            const data = doc.data();
            postDocs.push({
              id: doc.id,
              ...data,
              createdAt: data.createdAt.toDate(),
              updatedAt: data.updatedAt.toDate(),
            });
          });
          setPosts((prevPosts) => [...prevPosts, ...postDocs]);
        } else {
          setHasMore(false);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        setErrorMessage(e.message);
      });
  };

  useEffect(() => {
    lastDoc.current = null;
    setPosts([]);
    fetchPosts();
  }, []);

  const createPost = (postContent) => {
    return db
      .collection("posts")
      .add({
        author: {
          uid: auth.user.uid,
          displayName: auth.user.displayName,
          photoURL: auth.user.photoURL,
          userName: auth.user.userName,
        },
        content: postContent,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setPosts([]);
        lastDoc.current = null;
        fetchPosts();
      });
  };

  return {
    loading: isLoading,
    posts,
    hasMore,
    error: errorMessage,
    fetchPosts,
    createPost,
  };
}
