
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton'
import ModalReg from './ModalReg'
import ModalLogin from './ModalLogin'
import Loading from './Loading'
import sketch from '../images/sketch.png'
import mainLogo from '../images/TYPERUNNER2.png'
import bwLogo from '../images/TRBW.png'
import loginPic from "../images/log-in.png"
import reload from "../images/reload.png"
import signUp from "../images/signup.png"
import _ from 'lodash'

const Type = ({ quotes, user, setUser, userFetched }) => {
    const [finished, setFinished] = useState(false)
    const [field, setField] = useState('')
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [time, setTime] = useState(0);

    const data = _.sample(quotes)
    const navigate = useNavigate()

    const [quote, setQuote] = useState({
        "text": "Quite an experience to live in fear, isn't it? That's what it is to be a slave.",
        "author": 'Batty',
    })

    const fieldList = field.split("")
    const quoteList = quote.text.split("")
    const quoteListWords = quote.text.split(" ")

    const handleChange = (event) => {
        handleStart()
        const { value } = event.target
        let updatedField = { ...field }
        updatedField = value
        setField(updatedField)
    }

    // SELECT QUOTE / RESET 
    const SelectQuote = () => {
        navigate('/')
        setQuote(data)
        setField('')
        handleReset()
        setFinished(false)
        inputRef.current.focus()
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

    const totalTime = Number(`${min * 60 + sec}.${mili}`)
    const dynamicWPM = ((fieldList.length / 5) / (totalTime / 60)).toFixed(0)
    const finalWPM = ((quoteList.length / 5) / (totalTime / 60)).toFixed(0)
// add test result to tests table
    const updateUserTests = async () => {
        const res = await fetch('/api/updatetests', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: user.id,
                user_name: user.username,
                WPM: finalWPM
            })
        })
        const data = await res.json()
        navigate('/')
        console.log(data)
    }

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
            if (userFetched && user) {
                updateUserTests()
            }
        }
    }

    checkCorrect()



    const modalRegRef = useRef()
    const modalLoginRef = useRef()
    const modalStatsRef = useRef()
    const modalLeaderRef = useRef()
    const inputRef = useRef(null)


    console.log(user)

    return (
        <>
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>


            <>


                <ModalReg ref={modalRegRef} user={user} setUser={setUser}><p>Hello world</p></ModalReg>
                <ModalLogin ref={modalLoginRef} user={user} setUser={setUser} userFetched={userFetched}></ModalLogin>



                <div className="main-container">
                    <div className="logo-div">
                        <img className='main-logo' src={bwLogo} />
                    </div>
                    <div className="buttons-div">
                        {userFetched && user && <div className="icon-status">Logged in as: {user.username} </div>}
                        {userFetched && user && <LogoutButton user={user} setUser={setUser} />}
                        {!user && <a id="login" className="login-logout-button" href="#" onClick={() => modalLoginRef.current.openLogin()}>
                            <img className="icon-login" src={loginPic} />
                        </a>}
                        {!user && <a id="register" className="login-logout-button" href="#" onClick={() => modalRegRef.current.openRegister()}>
                            <img className="icon-signup" src={signUp} />
                        </a>}
                    </div>

                    <div className="timer-wpm">
                        {isActive && <p className="WPM"> {finished === true ? finalWPM : dynamicWPM} wpm</p>}
                        {isActive && <p className="timer">{(Math.floor((time / 60000) % 60))}<span className="smalltime">min</span> {(Math.floor((time / 1000) % 60))}.<span className="smalltime">{("0" + ((time / 10) % 100)).slice(-2)}sec</span></p>}
                    </div>

                    <div className="words-container">
                        <div className="words">

                            {quoteListWords.join(" ").split("").map((letter, letterIndex) => {
                                return (
                                    <>
                                        <letter className={fieldList.length === letterIndex ? "current" : fieldList[letterIndex] === letter ? "correct" : letter === " " && fieldList[letterIndex] === undefined || null ? "space" : fieldList[letterIndex] === undefined || null ? "" : fieldList[letterIndex] !== letter && letter === " " ? "space-incorrect" : "incorrect"} >
                                            {letter}
                                        </letter>
                                        {letter[letterIndex + 1] === " " && <div></div>}

                                    </>

                                )
                            })}

                        </div>

                        <div className="author">
                            <p> - {quote.author}</p>
                        </div>

                    </div>
                    <input autoFocus className="text-box" ref={inputRef} id="message-input" type="text" autoComplete="off" value={field} onChange={handleChange} disabled={finished === true ? true : false} onPaste={(e)=>{e.preventDefault()}} />
                    <div className="blur"></div>
                    <a href="#" className="reset-button" onClick={SelectQuote}>
                        <img className="icon-reset" src={reload} />
                    </a>
                    <div className="image-div">
                        {/* <img className="sketch-img" src={sketch} /> */}
                    </div>

                </div>

            </>
            {/* } */}
        </>
    )
}

export default Type

// letterstate = array  no of elements should be same number as quotelist
// each element in letterstate  = true or false 
// set state by index, set conditional classname by index

//active char set classname on letterdiv



