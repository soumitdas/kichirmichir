import { useState, useRef, useEffect } from "react";
import { db } from "../firebase";

export default function useProfilePosts(profileUid) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const lastDoc = useRef(null);

  const fetchPosts = (limit = 10) => {
    setIsLoading(true);
    setHasMore(false);

    db.collection("posts")
      .where("author.uid", "==", profileUid)
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

  return {
    loading: isLoading,
    posts,
    hasMore,
    error: errorMessage,
    fetchPosts,
  };
}
