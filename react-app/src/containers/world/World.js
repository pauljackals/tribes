import {Link} from "react-router-dom";
import {useEffect} from 'react'
import '../../styles/World.css'
import Board from "./board/Board";
import Players from "./Players";

const World = ({user, id, board, playWorld, world}) => {
    useEffect(() => {
        playWorld(id)
    }, [playWorld, id]);

    return (
        <div className="World">
            <h1>World {world.id}</h1>
            <Link to={location => `${location.pathname}/conversations`}><button>conversations</button></Link>
            <Board users={world.users} board={board} user={user}/>
            <Players world={world}/>
        </div>
    )
}
export default World