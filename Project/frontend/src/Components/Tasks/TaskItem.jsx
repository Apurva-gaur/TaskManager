/* eslint-disable react/prop-types */

import { useState } from 'react'

export default function TaskItem({ task, onUpdateTask, onDeleteTask }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editedTitle, setEditedTitle] = useState(task.title)

    function handleEdit() {
        if (isEditing) {
            onUpdateTask(task._id, { title: editedTitle })
        }
        setIsEditing(!isEditing)
    }

    function handleTitleChange(e) {
        setEditedTitle(e.target.value)
    }

    function handleCompletedChange() {
        onUpdateTask(task._id, { completed: !task.completed })
    }

    return (
        <li className="flex items-center gap-2 p-2 border rounded">
            <input
                type="checkbox"
                checked={task.completed}
                onChange={handleCompletedChange}
                className="h-5 w-5"
            />
            {isEditing ? (
                <input
                    type="text"
                    value={editedTitle}
                    onChange={handleTitleChange}
                    className="flex-grow px-2 py-1 border rounded"
                />
            ) : (
                <span className={`flex-grow ${task.completed ? 'line-through' : ''}`}>
                    {task.title}
                </span>
            )}
            <button onClick={handleEdit} className="px-2 py-1 bg-yellow-500 text-white rounded">
                {isEditing ? 'Save' : 'Edit'}
            </button>
            <button
                onClick={() => onDeleteTask(task._id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
            >
                Delete
            </button>
        </li>
    )
}

