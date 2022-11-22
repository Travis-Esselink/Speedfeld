import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import Type from './components/Type'
import './App.css'

function App() {
  const [quotes, setQuotes] = useState([])


  useEffect(() => {
    const getQuotes = async () => {
      const res = await fetch('/api/quotes')
      const data = await res.json()
      setQuotes(data)
    }
    getQuotes()
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Type quotes={quotes} />} ></Route>
      </Routes>
    </div>
  )
}

export default App
