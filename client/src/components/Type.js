import Words from './Words'
import { useState, useEffect } from 'react'
import Letter from './Letter'
import Word from './Word'



const Type = ({ quotes }) => {
    let finished = false
    const [field, setField] = useState('')
    const data = quotes[Math.floor(Math.random() * quotes.length)]
    const [quote, setQuote] = useState({
        "text": "Press reset to start because initial state is cooked.",
        "author": '',
        "season": '',
        "episode": ''
    })
    const [time, setTime] = useState("")
    const fieldList = field.split("")
    const quoteList = quote.text.split("")
    const quoteListWords = quote.text.split(" ")
    const fieldListWords = field.split(" ")


    const handleChange = (event) => {
        const { value } = event.target
        let updatedField = { ...field }
        updatedField = value
        setField(updatedField)
    }

    // timer variables
    let startingTime = 0
    let elapsedTime = 0
    let currentTime = 0
    let stopped = false
    let intervalId
    let mins = 0
    let secs = 0
    let mili = 0

    const SelectQuote = () => {
        setQuote(data)
        setField('')
        stopped = true
    }


    const timer = () => {
        const elapsedTime = Date.now() - startingTime

        mili = Math.floor(elapsedTime / 75)
        secs = Math.floor((elapsedTime / 1000) % 60)
        mins = Math.floor((elapsedTime / (1000 * 60)) % 60)

        setTime(`${mins}min ${secs}.${mili}secs`)
    }

    function timerStart() {
        if (stopped === true) {
            stopped = false
            startingTime = Date.now() - elapsedTime
            intervalId = setInterval(timer, 100)
        }


    }

    const timerStop = () => {
        if(!stopped) {
            stopped = true
            elapsedTime = Date.now() - startingTime
            clearInterval(intervalId)
        }

    }



    const checkCorrect = () => {
        let count = 0
        quoteList.forEach((char, index) => {
            if (fieldList[index] === char) {
                count += 1
            }
        })
        if (count === quoteList.length) {

            setField('')
            const finAlert = () => {
                alert("finished!")
            }
            setTimeout(finAlert, 300)
            finished = true
        }
    }

    checkCorrect()



    

    return (
        <div className="main-container">
            <div className="words-container">

                <p>{time}</p>


                <div className="words">

                    {quoteListWords.join(" ").split("").map((letter, letterIndex) => {
                        return (
                            <letter className={fieldList[letterIndex] === letter ? "correct" : fieldList[letterIndex] === undefined || null ? "" : "incorrect"} >
                                {letter}

                            </letter>
                        )
                    })}

                </div>

                {/* {testArr.join(" ").split("").map((char) =>{
                        return (
                            <div>
                            {char}
                            </div>
                        )

                    })} */}





                {/* {quoteListWords.map((word) => {
                        return (

                            <div className="word">
                                {word.split("").map((letter, letterIndex) => {
                                
                                    return (
                                        <div className="letter">
            
                                        {letter}
                            
                                    </div>
                                    )
                                }
                                )}
                            </div>

                        )
                    })} */}



                {/* <Words quote={quote.text} field={field}>

                </Words> */}
                <p>{quote.author}</p>
                <p>Season {quote.season} - Episode {quote.episode}</p>

                <input className="text-box" id="message-input" type="text" autoComplete="off" value={field} onChange={handleChange} disabled={finished === true ? true : false} />

            </div>
            <button onClick={SelectQuote}>RESET</button>
            <button onClick={timerStart}>timer</button>
            <button onClick={timerStop}>stop</button>
        </div>
    )
}

export default Type

// letterstate = array  no of elements should be same number as quotelist
// each element in letterstate  = true or false 
// set state by index, set conditional classname by index

//active char set classname on letterdiv