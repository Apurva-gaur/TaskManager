import ClientApi from "../Apis/ClientApi"
let tasks = []
export const taskStore = {
    getTasks: async () => {
        const fetchedTasks = await ClientApi.get("/task/")
        console.log("featchTasks", fetchedTasks)
        tasks = fetchedTasks.data.data
        console.log("tasks", tasks)
        return tasks
    },

    addTask: async (title, discription) => {
        const newTask = await ClientApi.post("/task/", { title, discription })
        console.log("newTask", newTask)
        tasks = [newTask, ...tasks]
        console.log("tasks", tasks)

        return newTask
    },
    updateTask: async (id, updates) => {
        console.log("updates", updates)
        const updatedTask = await ClientApi.patch(`/task/${id}`, updates)
        tasks = tasks.map(task => (task.id === id ? updatedTask : task))
        return updatedTask
    },
    deleteTask: async (id) => {
        await ClientApi.delete(`/task/${id}`)
        tasks = tasks.filter(task => task.id !== id)
        return tasks
    }
}

