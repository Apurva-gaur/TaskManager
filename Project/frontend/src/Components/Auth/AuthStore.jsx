import ClientApi from "../Apis/ClientApi"

export const userStore = {
    login: async (email, password,) => {
        const user = await ClientApi.post("/user/login", { email, password })
        console.log(user)
        return user
    },
    register: async (email, password, confirmPassword, name, username,) => {
        console.log("auth", `${ClientApi}+register`)
        console.log("auth", { name, email, password, confirmPassword, username })
        const user = await ClientApi.post("/user/register", { name, email, password, confirmPassword, username })
        console.log(user)
        return user
    },
    logout: async () => {
        const user = await ClientApi.post("/user/logout")
        return user
    },
    getCurrentUser: async () => {
        const user = await ClientApi.get("/user/me")
        return user
        
    }
}