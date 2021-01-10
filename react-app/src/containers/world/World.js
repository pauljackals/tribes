import {Redirect} from "react-router-dom";
import {useEffect} from 'react'
import '../../styles/World.css'
import Board from "./board/Board";

const World = ({user, worlds, id, board, playWorld}) => {
    useEffect(() => {
        if(user.loggedIn) {
            playWorld(id)
        }
    }, [playWorld, user, id]);

    const world = worlds.find(world => world._id === id)

    return (
        <div className="World">
            {!user.loggedIn ?
                <Redirect push to="/"/> :

                <>
                    <h1>World {world.id}</h1>
                    <Board users={world.users} board={board} user={user}/>
                </>
            }
        </div>
    )
}
export default World