import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import loginPic from "../images/login-title.png"

const initialState = { username: '', password: '' }

const Login = ({ setUser, setOpenLogin, modalRef }) => {
  const [fields, setFields] = useState(initialState)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setFields({
      ...fields,
      [name]: value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const res = await fetch('/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(fields)
    })
    const data = await res.json()
    if (res.status === 404 || res.status != 200) {
        setError(true)
        console.log('display message', data.msg)
    } else if (res.status === 200) {
        setError(null)
        setUser(data.user)
        setOpenLogin(false)
        navigate('/')
        setFields(initialState)

    }
    
}

return (
  <>
  <img className="modal-pic"src={loginPic}></img>
    <form className="login-reg-form" onSubmit={handleSubmit}>
      <label className="label-class" htmlFor="login-username"></label>
      <input
        onChange={handleChange}
        value={fields.username}
        maxLength="12"
        name="username"
        id="login-username"
        type="text" 
        className="login-input"
        autoComplete="off"
        placeholder='Username'
        required={true} />

      <label className="label-class" htmlFor="login-password"></label>
      <input
        onChange={handleChange}
        value={fields.password}
        maxLength="16"
        name="password"
        id="login-password"
        type="Password" 
        className="login-input"
        autoComplete="off"
        placeholder='Password'
        required={true} />
      
      <input id="loginbut" className="login-input" type="submit" value="Login" />
      {error && <span>Incorrect username/password combination</span> }
    </form>
    </>
  )

}

export default Login


