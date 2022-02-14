import React, { useState } from 'react'
import { GrAscend, GrDescend } from 'react-icons/gr'
import { useAppSelector } from '../../app/hooks'
import { TasksSortField } from './todosTypes'
import CreateTodosForm from './CreateTodosForm'
import TodoListItem from './TodoListItem'
import {  useSortTasks } from './todosHooks'

const Todos = () => {
  const tasks = useAppSelector((state) => state.todos.tasks)
  const completedTasks = useAppSelector((state) =>
    state.todos.tasks.filter((t) => t.isCompleted)
  )
  const [sortField, setSortField] = useState(TasksSortField.default)
  const [sortAscending, setSortAscending] = useState(true)

  const sortedTasks = useSortTasks(tasks, sortField, sortAscending)

  return (
    <>
      <CreateTodosForm />
      <div>
        <h2>Tasks</h2>
        <div className="flex justify-between mb-4">
          <div className="flex items-center gap-1">
            <span>Sort: </span>
            <div>
              <select
                className="sort-field"
                value={sortField}
                onChange={(e) =>
                  setSortField(parseInt(e.target.value) as TasksSortField)
                }
              >
                <option value={TasksSortField.default}>Default</option>
                <option value={TasksSortField.name}>Name</option>
                <option value={TasksSortField.priority}>Priority</option>
              </select>
            </div>
            <button
              onClick={() => setSortAscending((v) => !v)}
              className="sort-direction"
            >
              {sortAscending ? <GrAscend /> : <GrDescend />}
            </button>
          </div>
          <span>
            {tasks.length} tasks ({completedTasks.length} completed)
          </span>
        </div>
        <div className="todos-list">
          {sortedTasks.map((task) => (
            <TodoListItem task={task} key={task.id} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Todos
