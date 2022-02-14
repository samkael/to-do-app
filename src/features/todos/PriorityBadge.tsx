import React, { useEffect, useState } from 'react'
import { TaskPriority } from './todosTypes'

type PriorityBadgeProps = {
  priority: TaskPriority
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({
  priority,
  children,
}) => {
  const [priorityColor, setPriorityColor] = useState('bg-gray-600')

  useEffect(() => {
    switch (priority) {
      case TaskPriority.low:
        setPriorityColor('bg-green-800')
        break
      case TaskPriority.high:
        setPriorityColor('bg-red-800')
        break
      default:
        setPriorityColor('bg-gray-800')
        break
    }
  }, [priority])

  return (
    <div className={`${priorityColor} badge  text-sm`}>
      {children ?? (
        <span className="task-priority">{TaskPriority[priority]}</span>
      )}
    </div>
  )
}

export default PriorityBadge
