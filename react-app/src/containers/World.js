import {Redirect} from "react-router-dom";
import {useEffect} from 'react'
import '../styles/World.css'

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
                    <table className="board">
                        <tbody>
                            {board.map((row, indexRow) => <tr key={indexRow}>
                                {row.map((field, indexField) => <td key={indexField}>
                                    {field.village ? world.users.find(user => user._id===field.village.user).name : ''}
                                </td>)}
                            </tr>)}
                        </tbody>
                    </table>
                </>
            }
        </div>
    )
}
export default World