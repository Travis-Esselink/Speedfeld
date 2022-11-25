const UserProfile = ({user, setUser, userFetched}) => {

    return (
        <div>
        {userFetched && user ? <p>{user.username}</p> : <></>} 
        </div>
    )

}

export default UserProfile