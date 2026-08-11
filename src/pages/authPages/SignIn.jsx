import { useNavigate } from "react-router"
import { useState } from "react"
import { signIn } from "../services/auth"

const SignInForm = (props) => {

    const navigate = useNavigate()

    const initialState = {
        identifier:'',
        password: '',
    }
    const [formData, setFormData] = useState(initialState)
    const [message, setMessage] = useState('')

    const handleChange = (event) => {
        setMessage('')
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const signedInUser = await signIn(formData)
            props.setUser(signedInUser)
            setFormData(initialState)
            navigate('/')
        } catch(err) {
            setMessage(err.message)
        }
    }

    return(
        <section>
            <header>
            <h1>Sign In</h1>
            <p >{message}</p>
            </header>

            <form onSubmit={handleSubmit}>
                <label htmlFor="identifier">Email or License Number</label>
                <input id="identifier" 
                type="text" 
                name="identifier" 
                value={formData.identifier} 
                required onChange={handleChange} 
                placeholder="Enter your email or license number" 
                />
                <label htmlFor="password:">Password:</label>
                <input id="password" 
                type="password" 
                name="password" 
                value={formData.password} 
                required onChange={handleChange} 
                />
                <div className="actions">
                    <button type="submit">Sign In</button>
                    <button type="button" onClick={() => navigate('/')}>Cancel</button>
                </div>
            </form>
        </section>
    )
}

export default SignInForm