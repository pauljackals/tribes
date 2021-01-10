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

    const getField = (field, indexField) => {
        const fieldUser = field.village && world.users.find(user => user._id===field.village.user)
        const sameUser = fieldUser && fieldUser._id===user._id
        return (
            <td key={indexField} className={fieldUser ? `village ${sameUser ? 'you' : 'other'}` : ''}>
                {fieldUser && <>⌂<span className={`name-popup${sameUser ? ' you' : ''}`}>{fieldUser.name}</span></>}
            </td>
        )
    }

    return (
        <div className="World">
            {!user.loggedIn ?
                <Redirect push to="/"/> :

                <>
                    <h1>World {world.id}</h1>
                    <table className="board">
                        <tbody>
                            {board.map((row, indexRow) => <tr key={indexRow}>
                                {row.map((field, indexField) => getField(field, indexField))}
                            </tr>)}
                        </tbody>
                    </table>
                </>
            }
        </div>
    )
}
export default World