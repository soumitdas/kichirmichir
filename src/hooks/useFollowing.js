import { useEffect, useState } from "react";
import { db } from "../firebase";

const FOLLOWINGS_FETCH_LIMIT = 10;

export default function useFollowing(followingUids = []) {
  const [followings, setFollowings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async (limit = 5) => {
    try {
      setIsLoading(true);
      const promises = followingUids.slice(0, limit).map((uid) =>
        db
          .doc(`users/${uid}`)
          .get()
          .then((snap) => ({ id: snap.id, ...snap.data() }))
      );
      const users = await Promise.all(promises);
      console.log(users);
      setFollowings((prevData) => [...prevData, ...users]);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (followingUids.length > 0) {
      setFollowings([]);
      fetchUsers(FOLLOWINGS_FETCH_LIMIT);
    }
  }, [followingUids]);

  return {
    loading: isLoading,
    followings,
    limit: FOLLOWINGS_FETCH_LIMIT,
  };
}
