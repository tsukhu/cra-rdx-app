import React from "react";
import { useLocalStore, useObserver } from "mobx-react";

interface StoreConfig {
  tasks: string[];
  editMode: boolean;
  selectedTask?: string;
  selectedIndex: number;
  addTask: (task: any) => void;
  updateTask: (task: any) => void;
  removeTask: (index: any) => void;
  selectTask: (task: any, index?: number) => void;
  setEditMode: (mode: boolean) => void;
  readonly taskCount: number;
}

const storeInit: StoreConfig = {
  tasks: [],
  selectedTask: "",
  selectedIndex: 0,
  editMode: false,
  addTask: (task: any) => {},
  removeTask: (task: any) => {},
  selectTask: (task: any, index?: number) => {},
  setEditMode: (mode: boolean) => {},
  updateTask: (task: any) => {},
  taskCount: 0,
};

const StoreContext = React.createContext(storeInit);

const StoreProvider = ({ children }: any) => {
  const store = useLocalStore(() => ({
    tasks: ["Learn MobX"],
    selectedTask: "",
    selectedIndex: 0,
    editMode: false,
    addTask: (task: any) => {
      store.tasks.push(task); // mutable
    },
    removeTask: (index: number) => {
      store.tasks.splice(index, 1); // mutable
    },
    selectTask: (task: any, index?: number) => {
      if (index) {
        store.selectedIndex = index;
      }
      store.selectedTask = task;
    },
    updateTask: (task: any) => {
      console.log(store.selectedIndex);
      store.tasks[store.selectedIndex] = task; // mutable
    },
    setEditMode: (mode: boolean) => {
      store.editMode = mode;
    },
    get taskCount() {
      return store.tasks.length;
    },
  }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

const TodoHeader = () => {
  const store = React.useContext(StoreContext);
  return useObserver(() => <h1>Task Count : {store.taskCount}</h1>);
};

const TodoList = () => {
  const store = React.useContext(StoreContext);

  return useObserver(() => (
    <ul>
      {store.tasks.map((task: any, i: number) => (
        <li key={task}>
          <span>
            <div
              onClick={() => {
                store.selectTask(task, i);
                store.setEditMode(true);
              }}
            >
              {task}
            </div>{" "}
            <div
              onClick={() => {
                store.removeTask(i);
              }}
            >
              {" "}
              x{" "}
            </div>
          </span>
        </li>
      ))}
    </ul>
  ));
};

const TaskForm = () => {
  const store = React.useContext(StoreContext);
  const [task, setTask] = React.useState("");

  return useObserver(() => {
    return (
      <form
        onSubmit={(e) => {
          if (store.editMode) {
            store.updateTask(task);
            store.selectTask("");
            store.setEditMode(false);
            setTask("");
          } else {
            store.addTask(task);
            setTask("");
          }
          e.preventDefault();
        }}
      >
        <input
          type="text"
          value={
            store.selectedTask && store.selectedTask.length > 0
              ? store.selectedTask
              : task
          }
          onChange={(e) => {
            store.selectTask("");
            setTask(e.target.value);
          }}
        />
        <button type="submit">{store.editMode ? "Edit" : "Add"}</button>
      </form>
    );
  });
};

const MobXTodoApp = () => {
  return (
    <StoreProvider>
      <section>
        <TodoHeader />
        <TodoList />
        <TaskForm />
      </section>
    </StoreProvider>
  );
};

export default MobXTodoApp;
