
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import regPic from "../images/register-title.png"

const initialState = { username: '', password: '', confirmPassword: '' }

const CreateAccount = ({ setUser, setOpenReg }) => {
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
            if (!handleSubmit) {
                setErrorRegister(true)
                console.log(errorRegister)
            } else if (res.status === 200) {
                setErrorRegister(null)
                setOpenReg(false)
                setUser(data.user) 
                navigate('/')
                setFields(initialState)
    
            }
            
        }
    }

    

    return (

        <>
        <img className="modal-pic" src={regPic} />
        {errorPassword && <p>{errorPassword}</p>}
        {errorRegister && <p>Username not available.</p>}
        <form className="login-reg-form" onSubmit={handleSubmit}>
            <label htmlFor="login-username"></label>
            <input
                onChange={handleChange}
                value={fields.username}
                maxLength="12"
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
                maxLength="16"
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
                maxLength="16"
                placeholder="Confirm Password" />
                
        

            <input id="regobut" className="login-input" type="submit" value="Register"/>
              

        </form>
        </>

    )
}

export default CreateAccount