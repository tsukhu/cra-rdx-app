import { all } from 'redux-saga/effects'
import { helloSaga, postsSaga } from './features/posts/PostsSaga';
import { watchIncrementAsync } from './features/counter/CounterSaga';

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    postsSaga(),
    watchIncrementAsync()
  ])
}