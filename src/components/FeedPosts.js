import Post from "./Post";
import LoadingSpinner from "./LoadingSpinner";

const FeedPosts = ({ isLoading, postsData, hasMore, loadMore }) => {
  return (
    <>
      {postsData.map((post) => (
        <Post key={post.id} data={post} />
      ))}
      {hasMore && (
        <div className="has-text-centered">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              loadMore();
            }}
          >
            Load More
          </a>
        </div>
      )}
      {isLoading && <LoadingSpinner size="32" />}
    </>
  );
};

export default FeedPosts;
