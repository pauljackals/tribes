import {Link, Redirect} from "react-router-dom";
import {useEffect} from 'react'
import '../../../styles/Conversations.css'
import FormConversation from "./FormConversation";

const Conversations = ({user, idWorld, conversations, getConversations, world, createConversation}) => {
    useEffect(() => {
        if(user.loggedIn){
            getConversations(user._id, idWorld)
        }
    }, [idWorld, user, getConversations]);

    if(!user.loggedIn){
        return (
            <Redirect to="/"/>
        )
    }

    return (
        <div className="Conversations">
            <h1>World {world.id}</h1>
            <div className="button-middle">
                <Link to={location => location.pathname.split('/conversations')[0]}><button>return</button></Link>
            </div>
            <h3>Conversations</h3>

            <FormConversation world={world} user={user} createConversation={createConversation}/>
            <table className="conversations">
                <tbody>
                    <tr>
                        <th>Title</th>
                        <th>Users</th>
                        <th>Messages</th>
                    </tr>
                    {conversations.map((conversation, index) =>
                        <tr key={index}>
                            <td>{conversation.title}</td>
                            <td>{conversation.users.map((userConv, indexUser) => <span key={indexUser}>{userConv.name}</span>)}</td>
                            <td>{conversation.messages.length}</td>
                            <td><Link to={location => `${location.pathname}/${conversation._id}`}><button>enter</button></Link></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
export default Conversations