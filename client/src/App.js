import { useState, useEffect } from 'react';
import { Routes, Route, useFetcher } from 'react-router-dom'
import Type from './components/Type'
import Login from './components/Login';
import './App.css'

function App() {
  const [quotes, setQuotes] = useState([])
  const [user, setUser] = useState(null)
  const [userFetched,setuserFetched] = useState(false)


  useEffect(() => {
    const getQuotes = async () => {
      const res = await fetch('/api/quotes')
      const data = await res.json()
      setQuotes(data)
    }
    getQuotes()
  }, [])

  useEffect(() => {
    const getLoggedInUser = async () => {
      const res = await fetch('/verify/')
      const data = await res.json()
      if (res.status === 200) {
        setUser(data.user)
      }
      setuserFetched(true)
    }
    getLoggedInUser()
  }, [])



  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Type quotes={quotes} user={user} setUser={setUser} userFetched={userFetched}/>} ></Route>
        <Route path='/login/' element={<Login setUser={setUser} /> }></Route>
      </Routes>
    </div>
  )
}

export default App
