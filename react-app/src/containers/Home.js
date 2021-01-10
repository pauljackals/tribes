import {useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom";

const Home = ({user, worlds, fetchWorlds, joinWorld, clearBoard}) => {
    const [error, setError] = useState(false)
    const [redirect, setRedirect] = useState('')

    useEffect(() => {
        const fetchWorldsAsync = async () => {
            const result = await fetchWorlds()
            if(result && !result.success) {
                setError(true)
            }
        }
        clearBoard()
        fetchWorldsAsync().then()
    }, [fetchWorlds, setError, clearBoard]);

    const joinButtonHandle = async (idUser, idWorld) => {
        const result = await joinWorld(idUser, idWorld)
        if(result.success){
            setRedirect(`/world/${idWorld}`)
        }
    }

    return (
        <div className="Home">
            {redirect ? <Redirect push to={redirect}/> : ''}

            <h1>Home</h1>
            {error ? <div className="error">Connection error</div> : ''}

            <ul>
                {worlds.map((world, index) =>
                    <li key={index}>
                        <span>World {world.id}</span>
                        {user.loggedIn ?
                            (
                                user.worlds.find(worldUser => worldUser===world._id) ?
                                    <Link to={`/world/${world._id}`}><button>play</button></Link> :
                                    // <button onClick={() => joinWorld(user.id, world._id)}>join</button>
                                    <button onClick={() => joinButtonHandle(user.id, world._id)}>join</button>
                            ) : ''}
                    </li>
                )}
            </ul>
        </div>
    )
}
export default Home