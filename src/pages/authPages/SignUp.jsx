import { useState } from "react"
import { signUp } from "../../services/auth"
import { useNavigate } from "react-router"

const SignUpForm = (props) => {

    const navigate = useNavigate()

    const initialState = {
        fullName: '',
        password: '',
        confirmPassword: '',
        email: '',
        licenseNo: '',
        sector: '',
        phone: '',

    }

    const [formData, setFormData] = useState(initialState)
    const [message, setMessage] = useState('')

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match.")
            return
        }
        try {
            const { confirmPassword, ...userData } = formData
            const newUser = await signUp(userData)
            props.setUser(newUser)
            setFormData(initialState)
            navigate('/')
        } catch (err) {
            setMessage(err.message)
        }
    }

    const isFormValid = () => {
        if (formData.fullName && formData.password && formData.password === formData.confirmPassword) {
            return true
        } else return false
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
                        Create Account
                    </h1>

                    <p>
                        Create your account to register for
                        upcoming motorsport events.
                    </p>

                </header>


                {/* Message */}
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

                    {/* Full Name */}
                    <div className="form-group">

                        <label htmlFor="fullName">
                            Full Name
                        </label>

                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            onChange={handleChange}
                            value={formData.fullName}
                            placeholder="Enter your full name"
                            required
                        />

                    </div>


                    {/* Email */}
                    <div className="form-group">

                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />

                    </div>


                    {/* License */}
                    <div className="form-group">

                        <label htmlFor="licenseNo">
                            License Number
                        </label>

                        <input
                            type="number"
                            id="licenseNo"
                            name="licenseNo"
                            value={formData.licenseNo}
                            onChange={handleChange}
                            placeholder="Enter your license number"
                            required
                        />

                    </div>


                    {/* Phone */}
                    <div className="form-group">

                        <label htmlFor="phone">
                            Phone
                        </label>

                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            required
                        />

                    </div>


                    {/* Sector */}
                    <div className="form-group">

                        <label htmlFor="sector">
                            Sector
                        </label>

                        <select
                            name="sector"
                            id="sector"
                            value={formData.sector}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select your sector
                            </option>

                            <option value="Humood">
                                Dana & Humood
                            </option>

                            <option value="Abbasy">
                                Abbasy
                            </option>

                            <option value="seyadi">
                                Yousf Seyadi
                            </option>

                            <option value="ismaeel&jassem">
                                Ismaeel & Jassem
                            </option>

                            <option value="saleh&mahmood">
                                Saleh & Mahmood
                            </option>

                            <option value="aliAhmed">
                                Ali Ahmed
                            </option>

                            <option value="hassanZainal">
                                Hassan Zainal
                            </option>

                        </select>

                    </div>


                    {/* Password */}
                    <div className="form-group">

                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                            placeholder="Create a password"
                            required
                        />

                    </div>


                    {/* Confirm Password */}
                    <div className="form-group">

                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            onChange={handleChange}
                            value={formData.confirmPassword}
                            placeholder="Confirm your password"
                            required
                        />

                    </div>


                    {/* Actions */}
                    <div className="auth-actions">

                        <button
                            type="submit"
                            className="auth-primary-button"
                            disabled={!isFormValid()}
                        >
                            Sign Up
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


                {/* Footer */}
                <div className="auth-footer">

                    <p>
                        Already have an account?
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/sign-in")}
                    >
                        Sign In
                    </button>

                </div>

            </section>

        </main>
    )
}

export default SignUpForm