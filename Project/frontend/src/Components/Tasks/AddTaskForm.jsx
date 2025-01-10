/* eslint-disable react/prop-types */
'use client'

import { useState } from 'react'

export default function AddTaskForm({ onAddTask }) {
  const [title, setTitle] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (title.trim()) {
      onAddTask(title.trim())
      setTitle('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task"
        className="flex-grow px-3 py-2 border rounded"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Add
      </button>
    </form>
  )
}

