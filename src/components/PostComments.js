import useComment from "../hooks/useComment";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import LoadingSpinner from "./LoadingSpinner";

const PostComments = ({ postId }) => {
  const {
    loading,
    hasMore,
    comments,
    addComment,
    fetchComments,
    deleteComment,
  } = useComment(postId);
  return (
    <>
      <CommentForm addComment={addComment} />
      {comments.map((commentData) => (
        <Comment
          key={commentData.id}
          data={commentData}
          deleteComment={deleteComment}
        />
      ))}
      {hasMore && (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            fetchComments();
          }}
        >
          Load More
        </a>
      )}
      {loading && <LoadingSpinner size="32" />}
    </>
  );
};

export default PostComments;
