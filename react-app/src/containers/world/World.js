import {Link, Redirect} from "react-router-dom";
import {useEffect} from 'react'
import '../../styles/World.css'
import Board from "./board/Board";
import Players from "./Players";
import {playWorldOperation} from "../../operations/operationsWorld";
import {leaveWorldOperation} from "../../operations/operationsUser";
import {connect} from "react-redux";

const World = ({user, id, playWorld, world, leaveWorld}) => {
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
            <div className="button-middle">
                <Link to={location => `${location.pathname}/conversations`}><button>conversations</button></Link>
            </div>
            <Board users={world.users} user={user}/>
            <Players world={world} user={user}/>
            <div className="button-middle">
                <Link to="/"><button onClick={() => leaveWorld(user._id, world._id)}>unlink from world</button></Link>
            </div>
        </div>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        playWorld: idWorld => {
            dispatch(playWorldOperation(idWorld))
        },
        leaveWorld: (idUser, idWorld) => {
            dispatch(leaveWorldOperation(idUser, idWorld))
        }
    }
}

export default connect(undefined, mapDispatchToProps)(World);