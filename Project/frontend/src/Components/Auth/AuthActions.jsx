import { userStore } from "./AuthStore"

export async function signUp(email, password,confirmPassword,name,username) {
   return userStore.register(email, password,confirmPassword, name,username)
 
}
export async function login(email, password) {
    return userStore.login(email, password)  
}

export async function logout() {
    return userStore.logout()
}
export async function getCurrentUser() {
    return userStore.getCurrentUser()
}

