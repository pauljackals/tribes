import {useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom";

const Home = ({user, worlds, fetchWorlds, joinWorld, createWorlds, deleteWorlds, admin}) => {
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
            {user.admin ?
                <>
                    <form onSubmit={event => {
                        event.preventDefault()
                        const target = event.target
                        const id = target.id.value
                        const size = target.size.value
                        if(!isNaN(id) && !isNaN(size)) {
                            createWorlds(parseInt(id), parseInt(size))
                            event.target.reset()
                        }
                    }}>
                        <input type="number" name="id" placeholder="id"/>
                        <input type="number" name="size" placeholder="size"/>
                        <input type="submit" value="create"/>
                    </form>
                    {worlds.length ?
                        <form onSubmit={event => {
                            event.preventDefault()
                            deleteWorlds(event.target.id.value)
                            event.target.reset()
                        }}>
                            <select name="id">
                                {worlds.map((world, index) =>
                                    <option key={index} value={world._id}>World {world.id}</option>
                                )}
                            </select>
                            <input type="submit" value="delete"/>
                        </form> : ''
                    }
                    <form onSubmit={event => {
                        event.preventDefault()
                        const target = event.target
                        const status = target.status.value
                        const name = target.name.value
                        if(name.length && name!==user.name) {
                            admin(name, status === "op")
                            target.reset()
                        }
                    }}>
                        <input name="name" placeholder="user"/>
                        <select name="status">
                            <option value="op">op</option>
                            <option value="deop">deop</option>
                        </select>
                        <input type="submit" value="modify"/>
                    </form>
                </> : ''
            }
        </div>
    )
}
export default Home