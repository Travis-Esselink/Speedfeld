import Words from './Words'
import { useState, useEffect } from 'react'



const Type = ({ quotes }) => {
    const [field, setField] = useState('')
    const data = quotes[Math.floor(Math.random() * quotes.length)]
    const [quote, setQuote] = useState({
        "text": "Press reset to start because initial state is cooked.",
        "author": '',
        "season": '',
        "episode": ''
    })
    
    const handleChange = (event) => {
        const {value} = event.target
        let updatedField = {...field}
        updatedField = value
        setField(updatedField)
    }


    const SelectQuote = () => {
    setQuote(data)
    setField('')
}
return (
    <div className="main-container">
    <div className="words-container">
     
        <Words quote={quote.text} field={field}>

        </Words>
        <p>{quote.author}</p>
        <p>Season {quote.season} - Episode {quote.episode}</p>

        <input id="message-input" type="text" maxLength={600} autoComplete="off" value={field} onChange={handleChange}/>
        



    </div>
    <button onClick={SelectQuote}>RESET</button>
    </div>
)
}

export default Type