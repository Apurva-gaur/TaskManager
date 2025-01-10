import { Link, useNavigate } from 'react-router-dom'
import TaskManager from './Tasks/TasksManager'
import { getCurrentUser, logout } from './Auth/AuthActions'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function Home() {
    const [isLogin, setIslogin] = useState(null)
    const [loading, setLoading] = useState(true) // Add a loading state
    const navigate = useNavigate() // Use navigate for redirection

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getCurrentUser()
                console.log("user", user)
                if (user.data.statusCode === 200) {
                    setIslogin(true)
                } else {
                    setIslogin(false)
                }
            } catch (error) {
                console.error("Error fetching user:", error)
                setIslogin(false)
            } finally {
                setLoading(false) // Ensure loading state is set to false
            }
        }
        fetchUser()
    }, [])

    const handleLogout = async () => {
        try {
            const response = await logout()
            console.log(response)
            if (response.status === 200) {
                setIslogin(false)
                toast.success('Logout successful')
                navigate('/login') // Redirect to login page
            } else {
                toast.error('Logout failed')
            }
        } catch (error) {
            console.log("error", error)
            toast.error('Logout failed')
        }
    }

    if (loading) {
        // Show a loading spinner or message while fetching user data
        return (
            <div className="container mx-auto p-4 text-center">
                <h1 className="text-xl">Loading...</h1>
            </div>
        )
    }

    if (!isLogin) {
        return (
            <div className="container mx-auto p-4 text-center">
                <h1 className="text-2xl font-bold mb-4">Welcome to Task Manager</h1>
                <p className="mb-4">Please log in or sign up to manage your tasks.</p>
                <div className="space-x-4">
                    <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded">
                        Login
                    </Link>
                    <Link to="/signup" className="px-4 py-2 bg-green-500 text-white rounded">
                        Sign Up
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Task Manager</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
            <TaskManager />
        </div>
    )
}
