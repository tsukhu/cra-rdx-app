import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const selectedTodoSlice = createSlice({
  name: "selectedTodo",
  initialState: null as string | null,
  reducers: {
    selectTodo: (state, { payload }: PayloadAction<{ id: string }>) => payload.id,
  },
});

export default selectedTodoSlice.reducer;
export const selectSelectedTodo = (state: { selectedTodo: any }) =>
  state.selectedTodo;
export const { selectTodo } = selectedTodoSlice.actions;
