import { useNavigate } from "react-router"
import { useState } from "react"
import { signIn } from "../../services/auth"

const SignInForm = (props) => {

    const navigate = useNavigate()

    const initialState = {
        identifier: '',
        password: '',
    }
    const [formData, setFormData] = useState(initialState)
    const [message, setMessage] = useState('')

    const handleChange = (event) => {
        setMessage('')
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const signedInUser = await signIn(formData)
            props.setUser(signedInUser)
            setFormData(initialState)
            navigate('/')
        } catch (err) {
            setMessage(err.message)
        }
    }

    return (
        <main className="auth-page">

            <section className="auth-card">

                {/* Header */}
                <header className="auth-header">

                    <span className="auth-label">
                        BIC MARSHALS
                    </span>

                    <h1>
                        Sign In
                    </h1>

                    <p>
                        Sign in to manage your events and marshal
                        registrations.
                    </p>

                </header>


                {/* Error / Message */}
                {message && (
                    <p className="auth-message">
                        {message}
                    </p>
                )}


                {/* Form */}
                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">

                        <label htmlFor="identifier">
                            Email or License Number
                        </label>

                        <input
                            id="identifier"
                            type="text"
                            name="identifier"
                            value={formData.identifier}
                            required
                            onChange={handleChange}
                            placeholder="Enter your email or license number"
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            required
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />

                    </div>


                    {/* Actions */}
                    <div className="auth-actions">

                        <button
                            type="submit"
                            className="auth-primary-button"
                        >
                            Sign In
                        </button>

                        <button
                            type="button"
                            className="auth-secondary-button"
                            onClick={() => navigate("/")}
                        >
                            Cancel
                        </button>

                    </div>

                </form>


                {/* Sign Up */}
                <div className="auth-footer">

                    <p>
                        Don't have an account?
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/sign-up")}
                    >
                        Create an Account
                    </button>

                </div>

            </section>

        </main>
    )
}

export default SignInForm