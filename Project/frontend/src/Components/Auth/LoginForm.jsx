
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { login } from './AuthActions'
import { toast } from 'react-toastify'
export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        const result = await login(email, password)
        console.log("result", result)
        if (result.data.statusCode === 200) {
            navigate('/')
            toast.success('Login successful')
        } else {
            setError(result.error || 'Login failed')
            toast.error('Login failed')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <div>
                <label htmlFor="email" className="block mb-1">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div>
                <label htmlFor="password" className="block mb-1">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded">
                Login
            </button>
            <p className="text-center">
                Don&#39;t have an account? <Link to="/signup" className="text-blue-500">Sign up</Link>
            </p>
        </form>
    )
}

