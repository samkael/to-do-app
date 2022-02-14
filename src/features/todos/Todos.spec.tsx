import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { nanoid } from 'nanoid'
import { Provider } from 'react-redux'
import store from '../../app/store'
import Todos from './Todos'
import reducer, {
  createTask,
  deleteTask,
  toggleTaskCompletion,
} from './todosSlice'
import { TaskPriority } from './todosTypes'

const initalState = {
  tasks: [
    {
      id: nanoid(),
      title: 'task 1',
      priority: TaskPriority.normal,
      isCompleted: false,
    },
  ],
}

describe('To-do tasks business logic unit tests', () => {
  
  test('add task item to state', () => {
    const state = reducer(
      initalState,
      createTask({ title: 'test', priority: TaskPriority.normal })
    )
    expect(state.tasks.length).toEqual(initalState.tasks.length + 1)
  })
  test('delete task item to state', () => {
    const state = reducer(
      initalState,
      deleteTask({ taskId: initalState.tasks[0].id })
    )
    expect(state.tasks.length).toEqual(initalState.tasks.length - 1)
  })
  test('toggle task completion status', () => {
    const state = reducer(
      initalState,
      toggleTaskCompletion({ taskId: initalState.tasks[0].id })
    )
    expect(state.tasks[0].isCompleted).toEqual(
      !initalState.tasks[0].isCompleted
    )
  })
})

describe('To-do tasks component unit tests', () => {
  test('add task item', async () => {
    const taskTitle = nanoid() //random text
    render(
      <Provider store={store}>
        <Todos />
      </Provider>
    )
    const titleTextField = screen.getByPlaceholderText(/Enter new task/i)
    const submitButton = screen.getByRole('button', { name: /Add/i })
    expect(screen.queryByDisplayValue(taskTitle)).toBeNull()
    userEvent.type(titleTextField, taskTitle)
    userEvent.click(submitButton)
    await screen.findByText(taskTitle)
  })
})
