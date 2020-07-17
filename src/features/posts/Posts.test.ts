import posts, {
  initialState,
  fetch,
  fetchFailure,
  fetchSuccess,
  selectPosts,
  selectError,
  selectLoading,
} from "./PostsSlice";
import { fetchDataSaga } from "./PostsSaga";
import { runSaga } from "redux-saga";

describe("Posts Reducer", () => {
  it("should handled undefined intial state", () => {
    const nextState = posts(undefined, { type: "any random type" });
    const rootState = { posts: nextState };
    expect(selectPosts(rootState)).toEqual([]);
    expect(nextState).toEqual(initialState);
  });

  it("should handle fetch from  intial state", () => {
    const nextState = posts(undefined, fetch());
    const rootState = { posts: nextState };
    expect(selectLoading(rootState)).toEqual(true);
    expect(nextState).toEqual({ data: [], loading: true, error: false });
  });

  it("should handle fetch fail from  intial state", () => {
    const nextState = posts(
      undefined,
      fetchFailure({ error: "Error in Fetch" })
    );
    const rootState = { posts: nextState };
    expect(selectError(rootState)).toEqual("Error in Fetch");
    expect(nextState).toEqual({
      data: [],
      loading: false,
      error: "Error in Fetch",
    });
  });

  it("should handle fetch success from  intial state", () => {
    const data = [
      { id: 1, desc: "post1" },
      { id: 2, desc: "post2" },
      { id: 3, desc: "post3" },
    ];
    const nextState = posts(undefined, fetchSuccess({ data }));
    const rootState = { posts: nextState };
    expect(selectPosts(rootState)).toEqual(data);
  });

  it("should execute saga", async () => {
    const dispatched: any[] = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => initialState,
      },
      fetchDataSaga
    ).toPromise();

    expect(dispatched).toContainEqual(fetch());

  });
});
