import { call, takeEvery, put } from "redux-saga/effects";
import Axios, { AxiosRequestConfig } from "axios";
import {
  fetch,
  fetchSuccess,
  fetchFailure,
  fetchPostsAsync,
} from "./PostsSlice";


const callAPI = async ({ url, method, data }: AxiosRequestConfig) => {
  return await Axios({
    url,
    method,
    data,
  });
};

export function* fetchDataSaga() {
  try {
    yield put(fetch());
    let result = yield call(() =>
      callAPI({
        url: "https://jsonplaceholder.typicode.com/posts?_limit=10",
      } as any)
    );
    yield put(fetchSuccess({ data: result.data }));
  } catch (error) {
    yield put(fetchFailure({ error }));
  }
}

export function* postsSaga() {
  yield takeEvery(fetchPostsAsync, fetchDataSaga);
}

// eslint-disable-next-line require-yield
export function* helloSaga() {
  console.log("Hello Sagas!");
}
