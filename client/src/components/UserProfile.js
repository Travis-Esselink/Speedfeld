import Loading from "./Loading"
import statsTitle from "../images/stats-title.png" 

const UserProfile = ({user, userFetched, tests, setTests}) => {

    const sumWPM = (array) => {
        let count = 0
        for (let test of array) {
            count += test.WPM
        }
        return count
    }


    const averageWPM = (sumWPM(tests) / tests.length).toFixed(0)

    return (
        <>
        { !userFetched || tests.length === 0 ? <Loading /> :
        <>
        <img className="modal-pic" src={statsTitle} />
        <div className="stats-container">
        <p className="stats">{user.username}</p>
        <p className="stats">tests completed: {tests.length} </p>
        <p className="stats">top score: {tests[0].WPM}</p>
        <p className="stats">average wpm: {averageWPM} </p> 
        </div>
        </>
 }
        </> 
    )

}

export default UserProfile