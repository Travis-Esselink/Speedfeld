import Loading from "./Loading"
import { useEffect, useState } from "react"





const UserProfile = ({user, userFetched}) => {
    const [tests, setTests] = useState([])


    useEffect(() => {
        const getQuotes = async () => {
          const res = await fetch('/api/usertests')
          const data = await res.json()
          setTests(data)
        }
        getQuotes()
      }, [])


    const sumWPM = (array) => {
        let count = 0
        for (let test of array) {
            count += test.WPM
        }
        return count
    }


    const averageWPM = (sumWPM(tests) / tests.length).toFixed(0)

    console.log(tests)



    return (
        <div>
        { !userFetched ? <Loading /> :
        <>
        <p>{user.username}</p>
        <p>tests completed: {tests.length} </p>
        <p>fastest test speed: {tests[0].WPM}</p>
        <p>average wpm: {averageWPM} </p> 
        </>
}
        </div> 
    )

}

export default UserProfile