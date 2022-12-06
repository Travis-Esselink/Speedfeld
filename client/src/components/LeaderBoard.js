import Loading from "./Loading"
import { useEffect, useState } from "react"





const LeaderBoard = () => {
    const [tests, setTests] = useState([])


    useEffect(() => {
        const getTests = async () => {
          const res = await fetch('/api/leaderboard')
          const data = await res.json()
          setTests(data)
        }
        getTests()
      }, [])

    return (
        <>
            {tests.map((test, i) => {
                return (
                <div key={test.id} className="leaderboard-item">
                <p className="leaderboard-rank">{i + 1}. <span className="leaderboard-wpm">{test.WPM}</span><span className="leaderboard-small-text">wpm - </span>{test.user_name} </p>
                </div>
                )
            })}

      
    
        </> 
    )

}

export default LeaderBoard