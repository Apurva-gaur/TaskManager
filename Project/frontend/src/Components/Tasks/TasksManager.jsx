import { useState, useEffect } from 'react'
import AddTaskForm from './AddTaskForm'
import { addTask, deleteTask, getTasks, updateTask } from './TasksActios'
import TaskItem from './TaskItem'

export default function TaskManager() {
    const [tasks, setTasks] = useState([])
    const [isloading, setIsloading] = useState(true)

    useEffect(() => {
        fetchTasks()
    }, [])

    async function fetchTasks() {
        const fetchedTasks = await getTasks()
        setTasks(fetchedTasks)
        setIsloading(false)


    }

    async function handleAddTask(title) {
        await addTask(title)
        fetchTasks()
    }

    async function handleUpdateTask(id, updates) {
        console.log()
        await updateTask(id, updates)
        fetchTasks()
    }

    async function handleDeleteTask(id) {
        await deleteTask(id)
        fetchTasks()
    }

    return (
        <div>
            <AddTaskForm onAddTask={handleAddTask} />
            <ul className="mt-4 space-y-2">
                {isloading ? (
                    <p>Loading...</p>
                ) : tasks.length === 0 ? (
                    <p>No tasks found</p>
                ) : (
                    tasks.map((task) => (
                        <TaskItem
                            key={task._id}
                            task={task}
                            onUpdateTask={handleUpdateTask}
                            onDeleteTask={handleDeleteTask}
                        />
                    ))
                )}
            </ul>

        </div>
    )
}

