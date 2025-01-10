
import { taskStore } from "./TaskStore"


export async function getTasks(){
  return taskStore.getTasks()
}

export async function addTask(title) {
  return taskStore.addTask(title)
}

export async function updateTask(id, updates) {
  return taskStore.updateTask(id, updates)
}

export async function deleteTask(id) {
  return taskStore.deleteTask(id)
}

