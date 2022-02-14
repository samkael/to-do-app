import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { Task, TaskPriority } from './todosTypes'

const initialState = {
  tasks: [],
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    createTask: (
      state,
      action: PayloadAction<{ title: string; priority: TaskPriority }>
    ) => {
      const { title, priority } = action.payload
      state.tasks.push(<Task>{
        id: nanoid(4),
        title,
        priority,
        isCompleted: false,
      })
    },
    deleteTask: (state, action: PayloadAction<{ taskId: string }>) => {
      const { taskId } = action.payload
      state.tasks = state.tasks.filter((t) => t.id !== taskId)
    },
    toggleTaskCompletion: (
      state,
      action: PayloadAction<{ taskId: string }>
    ) => {
      const { taskId } = action.payload
      const taskIndex = state.tasks.findIndex((t) => t.id === taskId)
      if (taskIndex < 0) return
      state.tasks[taskIndex].isCompleted = !state.tasks[taskIndex].isCompleted
    },
  },
})

export const { createTask, deleteTask, toggleTaskCompletion } =
  todosSlice.actions
export default todosSlice.reducer
