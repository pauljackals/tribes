import {Link, Redirect} from "react-router-dom";
import {useEffect} from 'react'
import '../../styles/World.css'
import Board from "./board/Board";
import Players from "./Players";

const World = ({user, id, board, playWorld, world, leaveWorld}) => {
    useEffect(() => {
        if(user.loggedIn) {
            playWorld(id)
        }
    }, [playWorld, id, user]);

    if(!user.loggedIn){
        return (
            <Redirect to="/"/>
        )
    }

    return (
        <div className="World">
            <h1>World {world.id}</h1>
            <Link to="/"><button onClick={() => leaveWorld(user._id, world._id)}>unlink from world</button></Link>
            <Link to={location => `${location.pathname}/conversations`}><button>conversations</button></Link>
            <Board users={world.users} board={board} user={user}/>
            <Players world={world}/>
        </div>
    )
}
export default World