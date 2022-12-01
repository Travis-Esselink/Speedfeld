
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const initialState = { username: '', password: '', confirmPassword: '' }

const CreateAccount = ({ setUser }) => {
    const [fields, setFields] = useState(initialState) 
    const [errorPassword, setErrorPassword] = useState(null) 
    const [errorRegister, setErrorRegister] = useState(null) 
    const navigate = useNavigate()

    const handleChange = (event) => {
        const { name, value } = event.target // 
        setFields({
            ...fields,
            [name]: value
        })
    }


    const handleSubmit = async (event) => {
        event.preventDefault()
        if (fields.password !== fields.confirmPassword) {
            setErrorPassword("Passwords do not match!")
            setFields({
                ...fields,
                password: "",
                confirmPassword: "",
            })
        } else {
            setErrorPassword(null)
            const res = await fetch('/register/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(fields)
            })
            const data = await res.json()
            if (res.status === 403) {
                setErrorRegister(data)
            } else if (res.status === 200) {
                setErrorRegister(null)
                setUser(data.user) 
                navigate('/')
    
            }
            setFields(initialState)
        }
    }

    return (



        <form onSubmit={handleSubmit}>
            <label htmlFor="login-username"></label>
            <input
                onChange={handleChange}
                value={fields.username}
                name="username"
                id="register-username"
                type="text"
                className="login-input"
                autoComplete="off"
                required={true}
                placeholder="Username" />

            <label htmlFor="login-password"></label>
            <input
                onChange={handleChange}
                value={fields.password}
                name="password"
                id="register-password"
                type="Password"
                className="login-input"
                autoComplete="off"
                required={true}
                placeholder="Password" />

            <input
                type="password"
                name="confirmPassword"
                id="register-confirm-password"
                className="login-input"
                autoComplete="off"
                required={true}
                onChange={handleChange}
                value={fields.confirmPassword}
                placeholder="Confirm Password" />
                {errorPassword && <p className="text-muted">{errorPassword}</p>}
        

            <input id="regobut" className="login-input" type="submit" value="Create Account"/>
              

        </form>

    )
}

export default CreateAccount