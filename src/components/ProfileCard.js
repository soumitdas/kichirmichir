import UserAvatar from "./UserAvatar";
import FollowButton from "./FollowButton";
import { useAuth } from "../hooks/useAuth";

const ProfileCard = ({ data }) => {
  const auth = useAuth();
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-3by1">
          <img
            src={
              data?.coverPhoto
                ? data?.coverPhoto
                : `https://cdn.statically.io/og/theme=dark/${
                    data?.displayName || "Cover Photo"
                  }.jpg`
            }
            alt={`${data?.displayName} Cover Photo`}
          />
        </figure>
        <div className="ml-5">
          {data?.photoURL ? (
            <figure
              className="image is-1by1 is-128x128 is-avatar-profile"
              style={{ paddingTop: 0 }}
            >
              <img
                className="is-rounded"
                src={data?.photoURL}
                alt={data?.displayName}
              />
            </figure>
          ) : (
            <UserAvatar
              className="avatar-circle-profile is-avatar-profile"
              name={data?.displayName}
            />
          )}
        </div>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content mt-6">
            <p className="title is-4">{data?.displayName}</p>
            <p className="subtitle is-6">@{data?.userName}</p>
            <p>{data?.bio}</p>
          </div>
          {auth.user?.userName !== data?.userName && (
            <div className="media-right">
              <FollowButton data={data} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
