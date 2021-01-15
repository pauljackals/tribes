import {useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom";

const Home = ({user, worlds, fetchWorlds, joinWorld}) => {
    const [joining, setJoining] = useState('')

    useEffect(() => {
        fetchWorlds()
    }, [fetchWorlds]);

    const joinButtonHandle = (idUser, idWorld) => {
        joinWorld(idUser, idWorld)
        setJoining(idWorld)
    }

    return (
        <div className="Home">
            {user.worlds.find(world => world===joining) ? <Redirect push to={`/world/${joining}`}/> : ''}

            <h1>Home</h1>
            <ul>
                {worlds.map((world, index) =>
                    <li key={index}>
                        <span>World {world.id}</span>
                        {user.loggedIn ?
                            (
                                user.worlds.find(worldUser => worldUser===world._id) ?
                                    <Link to={`/world/${world._id}`}><button>play</button></Link> :
                                    <button onClick={() => joinButtonHandle(user._id, world._id)}>join</button>
                            ) : ''}
                    </li>
                )}
            </ul>
        </div>
    )
}
export default Home