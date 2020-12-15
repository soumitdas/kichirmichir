import CreatePost from "../components/CreatePost";
import FeedPosts from "../components/FeedPosts";
import useFeedPosts from "../hooks/useFeedPosts";

const Home = () => {
  const { loading, posts, hasMore, createPost, fetchPosts } = useFeedPosts();
  return (
    <>
      <CreatePost createPostMethod={createPost} />
      <FeedPosts
        isLoading={loading}
        postsData={posts}
        hasMore={hasMore}
        loadMore={fetchPosts}
      />
    </>
  );
};

export default Home;
