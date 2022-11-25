import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
    if (res.status === 401) {
        setError(data)
        console.log('display message', data.msg)
    } else if (res.status === 200) {
        setError(null)
        setUser(data.user)
        navigate('/')

    }
    setFields(initialState)
}

return (
    <form onSubmit={handleSubmit}>
      <label className="label-class" htmlFor="login-username">Username</label>
      <input
        onChange={handleChange}
        value={fields.username}
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
        name="password"
        id="login-password"
        type="Password" 
        className="login-input"
        autoComplete="off"
        placeholder='Password'
        required={true} />
      <input id="loginbut" className="login-input" type="submit" value="Login" />
    </form>
  )

}

export default Login


