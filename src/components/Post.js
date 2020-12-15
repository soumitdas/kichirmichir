import { Link } from "react-router-dom";
import { useRouter } from "../hooks/useRouter";
import { dateToRelativeTime } from "../helpers/date";
import UserAvatar from "../components/UserAvatar";
import Like from "./Like";
import Share from "./Share";

const Post = ({ isComment = false, data }) => {
  const router = useRouter();

  //Ref : https://css-tricks.com/block-links-the-search-for-a-perfect-solution/#method-4-sprinkle-javascript-on-the-second-method
  const handleCardClick = () => {
    if (isComment) return;
    const noTextSelected = !window.getSelection().toString();
    if (noTextSelected) {
      router.push(`/posts/${data?.id}`);
    }
  };

  return (
    <div className="card">
      <div
        className="card-content"
        style={!isComment && { cursor: "pointer" }}
        onClick={handleCardClick}
      >
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
                  onClick={(e) => e.stopPropagation()}
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
              {Array.isArray(data?.likedBy) && data.likedBy.length > 0 && (
                <p className="is-size-7">{data.likedBy.length} people liked</p>
              )}
            </div>
          </div>
        </article>
      </div>
      {!isComment && (
        <footer className="card-footer">
          <Like
            className="card-footer-item"
            postId={data?.id}
            likes={data?.likedBy}
          />
          <Link
            to={`/posts/${data?.id}?action=comment`}
            className="card-footer-item"
          >
            Comment
          </Link>
          <span className="card-footer-item">
            <Share postId={data?.id} />
          </span>
        </footer>
      )}
    </div>
  );
};

export default Post;
