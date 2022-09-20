import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { ITodo, UserData } from '../../models/ITodo'
import { v4 as uuidv4 } from 'uuid';
console.log(uuidv4());
interface CounterState {
  todos: ITodo[]
}


const initialState: CounterState = {
  // @ts-ignore
  todos: [],
}

export const counterSlice = createSlice({
  name: 'todos',

  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: uuidv4(),
        message: action.payload,
        completed: false,
        data: new Date().toLocaleDateString().split(".").join(".") + ' ' + new Date().toLocaleTimeString().slice(0, -3),
        dataExpiration:new Date().toLocaleDateString().split(".").map((el,i) => i == 0 ? Number(el)+1: el).join(".") + ' ' + new Date().toLocaleTimeString().slice(0, -3),
      })
    },
    addModalTodo: (state, action: PayloadAction<UserData>) => {
      state.todos.push({
        id: uuidv4(),
        message: action.payload.message,
        completed: false,
        data: action.payload.data,
        dataExpiration:action.payload.expData,
      })
    },
  },
})

export const { addTodo, addModalTodo } = counterSlice.actions

export default counterSlice.reducer