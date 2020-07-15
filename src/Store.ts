import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import counterReducer from "./features/counter/CounterSlice";
import orderReducer from "./features/order/OrderSlice";
import postsReducer from "./features/posts/PostsSlice";
import todosSliceReducer from './features/todo/TodosSlice';
import todoCounterSliceReducer from './features/todo/TodoCounterSlice';
import selectedTodoSliceReducer from './features/todo/SelectedTodoSlice';
import rootSaga from "./sagas";

let sagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
  reducer: {
    counter: counterReducer,
    order: orderReducer,
    posts: postsReducer,
    todos: todosSliceReducer,
    todosCounter: todoCounterSliceReducer,
    selectedTodo: selectedTodoSliceReducer,
  },
  middleware,
});

sagaMiddleware.run(rootSaga);
export default store;
