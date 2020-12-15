import { Link } from "react-router-dom";
import useFollowing from "../hooks/useFollowing";
import LoadingSpinner from "./LoadingSpinner";
import UserAvatar from "./UserAvatar";

const Following = ({ followingData = [] }) => {
  const { loading, followings, limit } = useFollowing(followingData);
  return loading ? (
    <LoadingSpinner size="32" />
  ) : (
    <>
      {followings.map((user) => (
        <article className="media" key={user.id}>
          <div className="media-left">
            {user.photoURL ? (
              <figure className="image is-1by1 is-48x48">
                <img
                  className="is-rounded"
                  src={user.photoURL}
                  alt={user.displayName}
                />
              </figure>
            ) : (
              <UserAvatar
                className="avatar-circle-small"
                name={user.displayName}
              />
            )}
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <Link
                  to={`/profile/${user.userName}`}
                  className="title is-5 mr-1"
                >
                  {user.displayName}
                </Link>
                <br />
                <span className="subtitle is-6">@{user.userName}</span>
              </p>
            </div>
          </div>
        </article>
      ))}
      {Array.isArray(followingData) && followingData.length > limit && (
        <p>{followingData.length - limit} more...</p>
      )}
    </>
  );
};

export default Following;
