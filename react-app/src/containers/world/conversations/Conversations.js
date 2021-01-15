import {Link} from "react-router-dom";
import {useEffect} from 'react'
import '../../../styles/Conversations.css'

const Conversations = ({user, idWorld, conversations, getConversations, world}) => {
    useEffect(() => {
        getConversations(user._id, idWorld)
    }, [idWorld, user, getConversations]);

    return (
        <div className="Conversations">
            <h1>World {world ? world.id : ''}</h1>
            <h3>Conversations</h3>
            <Link to={location => location.pathname.split('/conversations')[0]}><button>return</button></Link>

            <table className="conversations">
                <tbody>
                    <tr>
                        <th>Users</th>
                        <th>Messages</th>
                    </tr>
                    {conversations.map((conversation, index) =>
                        <tr key={index}>
                            <td>{conversation.users.map((userConv, indexUser) => <span key={indexUser}>{userConv.name}</span>)}</td>
                            <td>{conversation.messages.length}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
export default Conversations