import useProfilePosts from "../hooks/useProfilePosts";
import Post from "./Post";
import LoadingSpinner from "./LoadingSpinner";

const ProfilePosts = ({ profileUid }) => {
  const { loading, posts, hasMore, fetchPosts } = useProfilePosts(profileUid);

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} data={post} />
      ))}
      {hasMore && (
        <div className="has-text-centered">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              fetchPosts();
            }}
          >
            Load More
          </a>
        </div>
      )}
      {loading && <LoadingSpinner size="32" />}
    </>
  );
};

export default ProfilePosts;
