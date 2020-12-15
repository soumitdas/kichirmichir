import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "../hooks/useRouter";
import usePost from "../hooks/usePost";
import { dateToMonDDYYYYHHMMAP } from "../helpers/date";
import LoadingSpinner from "../components/LoadingSpinner";
import UserAvatar from "../components/UserAvatar";
import PostComments from "../components/PostComments";
import Like from "../components/Like";
import Share from "../components/Share";

const PostView = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [isCommentOpen, setIsCommentOpen] = useState(
    router.query.action === "comment" || false
  );
  const { post, deletePost } = usePost(router.query.postId);

  const handleDelete = async () => {
    try {
      const consent = window.confirm(
        `Are you sure to delete this Post.\nThis action cannot be undone.`
      );
      if (!consent) return;
      await deletePost();
    } catch {}
  };

  if (post === null) {
    return <LoadingSpinner size="32" />;
  }

  return post ? (
    <div className="card">
      <div className="card-content">
        <article className="media">
          <div className="media-left">
            {post.author?.photoURL ? (
              <figure className="image is-1by1 is-64x64">
                <img
                  className="is-rounded"
                  src={post.author?.photoURL}
                  alt={post.author?.displayName}
                />
              </figure>
            ) : (
              <UserAvatar
                className="avatar-circle-medium"
                name={post.author?.displayName}
              />
            )}
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <Link
                  to={`/profile/${post.author?.userName}`}
                  className="title is-5 mr-1"
                >
                  {post.author?.displayName}
                </Link>
                <br />
                <span className="subtitle is-6">@{post.author?.userName}</span>
                <br />
                <span
                  className="is-size-5 has-text-weight-medium"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {post.content}
                </span>
              </p>
              <p className="is-size-6">
                {dateToMonDDYYYYHHMMAP(post.createdAt)}
                <br />
                {Array.isArray(post?.likedBy) && post.likedBy.length > 0 && (
                  <small>{post.likedBy.length} people liked</small>
                )}
              </p>
            </div>
          </div>
          {user?.uid === post.author?.uid && (
            <div className="media-right">
              <button className="delete" onClick={handleDelete}></button>
            </div>
          )}
        </article>
      </div>
      <footer className="card-footer">
        <Like
          className="card-footer-item"
          postId={post?.id}
          likes={post?.likedBy}
        />
        <a
          href="#"
          className="card-footer-item"
          onClick={(e) => {
            e.preventDefault();
            setIsCommentOpen((value) => !value);
          }}
        >
          Comment
        </a>
        <span className="card-footer-item">
          <Share postId={post?.id} />
        </span>
      </footer>
      {isCommentOpen && (
        <div className="box">
          <PostComments postId={post.id} />
        </div>
      )}
    </div>
  ) : (
    <h2 className="title has-text-centered">Post not found</h2>
  );
};

export default PostView;
