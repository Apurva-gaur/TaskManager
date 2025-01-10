import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signUp } from './AuthActions'
import { toast } from 'react-toastify'

export default function SignUpForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        username: '',
    })
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await signUp(
            formData.email,
            formData.password,
            formData.confirmPassword,
            formData.name,
            formData.username
        )
        if (result.data.statusCode === 201) {

            navigate('/login')
            toast.success('Sign up successful')
        }
        else {
            setError(result.error || 'Sign up failed')
            toast.error('Sign up failed')
        }

    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <div>
                <label htmlFor="email" className="block mb-1">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div>
                <label htmlFor="password" className="block mb-1">Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div>
                <label htmlFor="confirmPassword" className="block mb-1">Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div>
                <label htmlFor="username" className="block mb-1">Username</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div>
                <label htmlFor="name" className="block mb-1">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
            </div>

            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="w-full px-4 py-2 bg-green-500 text-white rounded">
                Sign Up
            </button>
            <p className="text-center">
                Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
            </p>
        </form>
    )
}
