import { Link } from "react-router-dom";
import { dateToRelativeTime } from "../helpers/date";
import UserAvatar from "./UserAvatar";
import { useAuth } from "../hooks/useAuth";

const Comment = ({ data = {}, deleteComment }) => {
  const { user } = useAuth();
  const handleDelete = async () => {
    try {
      const consent = window.confirm(
        `Are you sure to delete the comment.\nThis action cannot be undone.`
      );
      if (!consent) return;
      await deleteComment(data.id);
    } catch {}
  };

  return (
    <article className="media">
      <div className="media-left">
        {data?.author?.photoURL ? (
          <figure className="image is-1by1 is-48x48">
            <img
              className="is-rounded"
              src={data?.author?.photoURL}
              alt={data?.author?.displayName}
            />
          </figure>
        ) : (
          <UserAvatar
            className="avatar-circle-small"
            name={data?.author?.displayName}
          />
        )}
      </div>
      <div className="media-content">
        <div className="content">
          <p>
            <Link
              to={`/profile/${data?.author?.userName}`}
              className="title is-6 mr-1"
            >
              {data?.author?.displayName}
            </Link>
            <span className="subtitle is-7">@{data?.author?.userName}</span>
            <span className="mx-2">&middot;</span>
            <span className="subtitle is-7">
              {dateToRelativeTime(data?.createdAt)}
            </span>
            <br />
            <span style={{ whiteSpace: "pre-wrap" }}>{data?.content}</span>
          </p>
        </div>
      </div>
      {user.uid === data.author?.uid && (
        <div className="media-right">
          <button className="delete" onClick={handleDelete}></button>
        </div>
      )}
    </article>
  );
};

export default Comment;
