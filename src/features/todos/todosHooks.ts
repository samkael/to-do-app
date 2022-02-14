import { useEffect, useState } from "react"
import { TasksSortField, Task } from "./todosTypes"



export function useSortTasks(
  tasks: Task[],
  field: TasksSortField,
  sortAscending: boolean
): Task[] {
  const [sorted, setSorted] = useState<Task[]>([])
  useEffect(() => {
    let _tasks = [...tasks]
    switch (field) {
      case TasksSortField.name:
        setSorted(
          sortAscending
            ? _tasks.sort((t1, t2) => t1.title.localeCompare(t2.title))
            : _tasks.sort((t1, t2) => t2.title.localeCompare(t1.title))
        )
        break
      case TasksSortField.priority:
        setSorted(
          sortAscending
            ? _tasks.sort((t1, t2) => t1.priority - t2.priority)
            : _tasks.sort((t1, t2) => t2.priority - t1.priority)
        )
        break

      default:
        setSorted(sortAscending ? _tasks : _tasks.reverse())
        break
    }
  }, [tasks, field, sortAscending])

  return sorted
}