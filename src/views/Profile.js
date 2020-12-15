import { useEffect, useState } from "react";
import { useRouter } from "../hooks/useRouter";
import { db } from "../firebase";
import ProfileCard from "../components/ProfileCard";
import ProfilePosts from "../components/ProfilePosts";
import Following from "../components/Following";
import LoadingSpinner from "../components/LoadingSpinner";

const Profile = () => {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(null);
  const [tab, setTab] = useState("posts");

  useEffect(() => {
    db.collection("users")
      .where("userName", "==", router.query.profileId)
      .limit(1)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          const data = snapshot.docs[0].data();
          setUserProfile({ uid: snapshot.docs[0].id, ...data });
        } else {
          setUserProfile(false);
        }
      })
      .catch((e) => {
        console.log(e);
        setUserProfile(false);
      });
  }, [router.query.profileId]);

  if (userProfile === false) {
    return <h2 className="title has-text-centered">User not found</h2>;
  }

  return userProfile ? (
    <>
      <ProfileCard data={userProfile} />
      <div className="tabs is-centered">
        <ul>
          <li className={tab === "posts" ? "is-active" : ""}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setTab("posts");
              }}
            >
              Posts
            </a>
          </li>
          <li className={tab === "followings" ? "is-active" : ""}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setTab("followings");
              }}
            >
              Followings
            </a>
          </li>
        </ul>
      </div>
      {tab === "posts" && <ProfilePosts profileUid={userProfile.uid} />}
      {tab === "followings" && (
        <Following followingData={userProfile.following} />
      )}
    </>
  ) : (
    <LoadingSpinner size="32" />
  );
};

export default Profile;
