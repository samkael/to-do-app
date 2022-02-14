import React, { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../../app/hooks'
import { TaskPriority } from './todosTypes'
import PriorityBadge from './PriorityBadge'
import { createTask } from './todosSlice'

const CreateTodosForm = () => {
  const dispatch = useAppDispatch()
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState(TaskPriority.normal)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!title) {
      toast.warn('Cannot create empty task')
      return
    }
    dispatch(
      createTask({
        title,
        priority,
      })
    )
    toast.success(`Created task: ${title}`)
    setTitle('')
    setPriority(TaskPriority.normal)
  }

  return (
    <div className=" card shadow-lg p-8 border border-gray-100">
      <h1 className=" card-title">Create Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2 my-2">
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Enter new task"
            onChange={(e) => setTitle(e.target.value)}
            className="input input-primary flex-grow text-lg"
          />
          <button type="submit" className="btn" name='submit'>
            Add
          </button>
        </div>
        <div className="flex gap-1 my-1 items-center">
          <span className=" text-sm font-bold">Priority: </span>
          <PriorityBadge priority={priority}>
            <select
              name="priority"
              className=" bg-transparent"
              value={priority}
              onChange={(e) =>
                setPriority(parseInt(e.target.value) as TaskPriority)
              }
            >
              <option className="text-black" value={TaskPriority.low}>
                low
              </option>
              <option className="text-black" value={TaskPriority.normal}>
                normal
              </option>
              <option className="text-black" value={TaskPriority.high}>
                high
              </option>
            </select>
          </PriorityBadge>
        </div>
      </form>
    </div>
  )
}

export default CreateTodosForm
