import useLike from "../hooks/useLike";

const Like = ({ className, postId, likes = [] }) => {
  const { isLiked, toggleLike } = useLike(postId, likes);

  const handleClick = async (e) => {
    e.preventDefault();
    if (isLiked === null) return;
    try {
      await toggleLike();
    } catch {}
  };

  return (
    <a href="#" className={className} onClick={handleClick}>
      {isLiked ? "Liked" : "Like"}
    </a>
  );
};

export default Like;
