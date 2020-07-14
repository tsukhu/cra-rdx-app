import React from "react";
import Axios, { AxiosRequestConfig } from "axios";
import { useMachine } from "@xstate/react";
import { Machine, assign } from "xstate";
import Post, { PostInterface } from "./Post";
import CircularIndeterminate from "../../components/CircularIndeterminate";

const callAPI = async ({ url, method, data }: AxiosRequestConfig) => {
  return Axios({
    url,
    method,
    data,
  });
};

export const fetchPosts = () =>
  callAPI({
    url: "https://jsonplaceholder.typicode.com/posts?_limit=10",
  } as any);

const dataMachine = Machine({
  id: "posts",
  initial: "ready",
  context: {
    data: [],
  },
  states: {
    ready: {
      on: {
        FETCH_POSTS: "fetching",
      },
    },
    fetching: {
      invoke: {
        id: "fetchData",
        src: fetchPosts,
        onDone: {
          target: "success",
          actions: assign((context: any, event: any) => {
            return event.data;
          }),
        },
        onError: "error",
      },
    },
    success: { type: "final" },
    error: { type: "final" },
  },
});

const PostsXState = () => {
  const [current, send] = useMachine(dataMachine);
  React.useEffect(() => {
    if (current.matches("ready")) {
      send("FETCH_POSTS");
    }
  }, []);
  const { data } = current.context;
  return (
    <>
      {current.matches("fetching") && <CircularIndeterminate />}
      {current.matches("error") && (
        <Post title={"Error Loading Posts"} body={"Error"} />
      )}
      {current.matches("success") &&
        data.map((post: PostInterface) => (
          <Post title={post.title} body={post.body} />
        ))}
    </>
  );
};

export default PostsXState;
