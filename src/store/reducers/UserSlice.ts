import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ITodo, UserDate } from "../../models/ITodo";
import { getCreationInputDate, getCreationInputDateExpiration, getCreationModalDate } from "../../utils/CreateDate";
import { v4 as uuidv4 } from "uuid";


interface CounterState {
  todos: ITodo[];
}

const initialState: CounterState = {
  todos: [],
};

export const counterSlice = createSlice({
  name: "todos",

  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: uuidv4(),
        message: action.payload,
        completed: false,
        date: getCreationInputDate(),
        dateExpiration: getCreationInputDateExpiration(),
      });
    },
    addModalTodo: (state, action: PayloadAction<UserDate>) => {
      state.todos.push({
        id: uuidv4(),
        message: action.payload.message,
        completed: false,
        date: getCreationModalDate(action.payload.date),
        dateExpiration: getCreationModalDate(action.payload.expDate),
      });
    },
  },
});


export const { addTodo, addModalTodo } = counterSlice.actions;
export default counterSlice.reducer;
