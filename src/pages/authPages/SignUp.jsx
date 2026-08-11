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
        <section className="card">
            <header>
                <h1>Sign Up</h1>
                <p>{message}</p>
            </header>
            <form onSubmit={handleSubmit}>
                <label htmlFor="fullName">Full Name</label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    onChange={handleChange}
                    value={formData.fullName}
                    placeholder="Enter your Full Name"
                    required
                />

                <label htmlFor="email">Email</label>
                <input type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Enter your email"/>

                <label htmlFor="licenseNo">License Number</label>
                <input type="number" 
                id="licenseNo" 
                name="licenseNo" 
                value={formData.licenseNo} 
                onChange={handleChange} 
                placeholder="Enter your license number"/>

                <label htmlFor="sector">Sector</label>
                <select name="sector" 
                id="sector"
                value={formData.sector}
                onChange={handleChange}>

                    <option value="">Select your sector</option>
                    <option value="Humood">Dana & Humood</option>
                    <option value="Abbasy">Abbasy</option>
                    <option value="seyadi">Yousf Seyadi</option>
                    <option value="ismaeel&jassem">Ismaeel & Jassem</option>
                    <option value="saleh&mahmood">Saleh & Mahmood</option>
                    <option value="aliAhmed">Ali Ahmed</option>
                    <option value="hassanZainal">Hassan Zainal</option>
                </select>

                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={handleChange} value={formData.password} required />
                Confirm Password:
                <input type="password" name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} required />
                <div className="actions">
                    <button type="submit" disabled={!isFormValid()}>Sign Up</button>
                    <button type="button" onClick={() => navigate('/')}>Cancel</button>
                </div>
            </form>
        </section>
    )
}

export default SignUpForm