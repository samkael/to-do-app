import React from 'react'
import { MdClose } from 'react-icons/md'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../../app/hooks'
import PriorityBadge from './PriorityBadge'
import { deleteTask, toggleTaskCompletion } from './todosSlice'

const TodoListItem = ({ task }) => {
  const dispatch = useAppDispatch()

  function _delete() {
    dispatch(deleteTask({ taskId: task.id }))
    toast.error(`Deleted task: ${task.title}`)
  }

  return (
    <div className="todo-list-item border-t-gray-100 border-t p-2 flex relative items-center gap-2">
      <input
        type="checkbox"
        className="checkbox checkbox-lg"
        checked={task.isCompleted}
        onChange={() => dispatch(toggleTaskCompletion({ taskId: task.id }))}
      />
      <div className="flex-grow flex flex-col">
        <span
          className={`task-title text-xl ${
            task.isCompleted ? 'line-through text-gray-400' : ''
          }`}
        >
          {task.title}
        </span>
        <PriorityBadge priority={task.priority} />
        <button
          className="delete-task btn btn-circle btn-error btn-xs absolute right-0 top-4 text-white"
          onClick={_delete}
        >
          <MdClose className="text-white" />
        </button>
      </div>
    </div>
  )
}

export default TodoListItem
