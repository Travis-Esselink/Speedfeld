import Words from './Words'
import { useState, useEffect } from 'react'
import Letter from './Letter'
import Word from './Word'



const Type = ({ quotes }) => {
    const [finished, setFinished] = useState(false)
    const [field, setField] = useState('')
    const data = quotes[Math.floor(Math.random() * quotes.length)]
    const [quote, setQuote] = useState({
        "text": "Press reset to start because initial state is cooked.",
        "author": '',
        "season": '',
        "episode": ''
    })

    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [time, setTime] = useState(0);
    const fieldList = field.split("")
    const quoteList = quote.text.split("")
    const quoteListWords = quote.text.split(" ")
    const fieldListWords = field.split(" ")


    const handleChange = (event) => {
        handleStart()
        const { value } = event.target
        let updatedField = { ...field }
        updatedField = value
        setField(updatedField)
    }

 // SELECT QUOTE / RESET 
    const SelectQuote = () => {
        setQuote(data)
        setField('')
        handleReset()
        setFinished(false)
    }

// TIMER
    useEffect(() => {
        let interval = null;

        if (isActive && isPaused === false) {
            interval = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isActive, isPaused]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };

    const handlePauseResume = () => {
        setIsPaused(!isPaused);
    };

    const handleReset = () => {
        setIsActive(false);
        setTime(0);
    };

    let min = (Math.floor((time / 60000) % 60))
    let sec = (Math.floor((time / 1000) % 60))
    let mili = (((time / 10) % 100))

// CHECK IF COMPLETED
    const checkCorrect = () => {
        let count = 0
        quoteList.forEach((char, index) => {
            if (fieldList[index] === char) {
                count += 1
            }
        })
        if (count === quoteList.length) {
            handlePauseResume()
            setFinished(true)

            setField('')
            const finAlert = () => {
                alert(`${finalWPM} WPM, not bad!`)
            }
            setTimeout(finAlert, 300)
            
        }
    }

    checkCorrect()

    const totalTime = Number(`${min * 60 + sec}.${mili}`)
    const dynamicWPM = ((fieldList.length / 5) / (totalTime / 60)).toFixed(0)
    const finalWPM = ((quoteList.length / 5) / (totalTime / 60)).toFixed(0)



console.log(finished)



    return (
        <div className="main-container">
            <div className="words-container">

                <div className="timer">
                    <span className="digits">
                        {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                    </span>
                    <span className="digits">
                        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
                    </span>
                    <span className="digits mili-sec">
                        {("0" + ((time / 10) % 100)).slice(-2)}
                    </span>
                </div>

                { finalWPM !== Infinity && dynamicWPM !== NaN ? <p className="dynamic">WPM: {finished === true ? finalWPM : dynamicWPM}</p> : null}



                <div className="words">

                    {quoteListWords.join(" ").split("").map((letter, letterIndex) => {
                        return (
                            <>
                            <letter className={fieldList.length === letterIndex ? "current" : fieldList[letterIndex] === letter ? "correct" : fieldList[letterIndex] === undefined || null ? "" : "incorrect"} >
                                {letter}
                            </letter>
                           
                            </>
                            
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
            <button onClick={handleStart}>timer</button>
            <button onClick={handlePauseResume}>stop</button>
        </div>
    )
}

export default Type

// letterstate = array  no of elements should be same number as quotelist
// each element in letterstate  = true or false 
// set state by index, set conditional classname by index

//active char set classname on letterdiv