import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPostsAsync,
  selectError,
  selectLoading,
  selectPosts,
} from "./PostsSlice";
import Post, { PostInterface } from "./Post";
import CircularIndeterminate from "../../components/CircularIndeterminate";

const Posts = () => {
  const posts = useSelector(selectPosts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchPostsAsync());
  }, []);
  console.log(posts, loading, error);
  return (
    <>
      {loading && <CircularIndeterminate />}
      {!loading && error && (
        <Post title={"Error Loading Posts"} body={error.message} />
      )}
      {!loading &&
        !error &&
        posts &&
        posts.length > 0 &&
        posts.map((post: PostInterface) => (
          <Post title={post.title} body={post.body} />
        ))}
    </>
  );
};

export default Posts;
