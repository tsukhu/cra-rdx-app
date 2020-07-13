import { all } from 'redux-saga/effects'
import { helloSaga } from './features/posts/postsSaga';
import { watchIncrementAsync } from './features/counter/CounterSaga';

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync()
  ])
}