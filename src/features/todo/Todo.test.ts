import todo, { initialState, create, edit, remove, toggle, selectedTodos } from "./TodosSlice";

describe("Todo Reducer", () => {
  it("should handle undefined initial state", () => {
    expect(todo(undefined, { type: "any random type" })).toEqual(initialState);
  });

  it("should handle undefined initial state with selector", () => {
    const nextState = todo(undefined, { type: "any random type" });
    const rootState = { todos: nextState};
    expect(selectedTodos(rootState)).toBeTruthy();
    expect(nextState).toHaveLength(3);
  });

  it("should handle create on initial state", () => {
    expect(
      todo(undefined, create({ desc: "Task1" })).find(
        (item) => item.desc === "Task1"
      )
    ).toBeTruthy();
  });

  it("should handle edit on initial state", () => {
    const item = initialState.find(
      (item) => item.desc === "Learn Redux-ToolKit"
    );
    const editableItem = item ? item : { id: "1", desc: "test" };
    expect(
      todo(undefined, edit({ id: editableItem.id, desc: "Task2" })).find(
        (item) => item.desc === "Task2"
      )
    ).toBeTruthy();
  });

  it("should handle remove on initial state", () => {
    const item = initialState.find(
      (item) => item.desc === "Learn Redux-ToolKit"
    );
    const editableItem = item ? item : { id: "1", desc: "test" };
    expect(
      todo(undefined, remove({ id: editableItem.id })).find(
        (item) => item.desc === "Learn Redux-ToolKit"
      )
    ).toBeUndefined();
  });

  it("should handle remove on initial state", () => {
    const item = initialState.find(
      (item) => item.desc === "Learn Redux-ToolKit"
    );
    const editableItem = item ? item : { id: "1", desc: "test" };
    expect(
      todo(undefined, toggle({ id: editableItem.id, isComplete: true })).find(
        (item) => item.desc === "Learn Redux-ToolKit"
      )
    ).toEqual({ ...editableItem, isComplete: true });
  });
});
