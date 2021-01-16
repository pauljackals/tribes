import {Link} from "react-router-dom";
import Message from "./Message";

const Conversation = ({id, conversations, user, sendMessage, deleteMessage, updateMessage, world, inviteUser, kickUser}) => {
    const conversation = conversations.find(conversation => conversation._id===id)

    const handleSend = event => {
        event.preventDefault()
        const message = event.target.message.value
        sendMessage(user._id, conversation._id, message, Date.now())
        event.target.reset()
    }
    const usersOthers = world.users.filter(usr => !conversation.users.find(usrConv => usrConv._id===usr._id))

    const handleInvite = event => {
        event.preventDefault()
        inviteUser(conversation._id, event.target.user.value)
        event.target.reset()
    }

    const handleReturn = location => {
        const split = '/conversations'
        return `${location.pathname.split(split)[0]}${split}`
    }

    return (
        <div className="Conversation">
            <h1>World {conversation.world.id}</h1>
            <Link to={handleReturn}><button>return</button></Link>
            <h3>{conversation.title}</h3>
            <Link to={handleReturn}><button onClick={() => kickUser(conversation._id, user._id)}>leave conversation</button></Link>
            {usersOthers.length ?
                <form onSubmit={handleInvite}>
                    <select name="user">
                        {usersOthers.map((usr, index) => <option key={index} value={usr._id}>{usr.name}</option>)}
                    </select>
                    <input type="submit" value="invite"/>
                </form> : ''
            }
            <table>
                <tbody>
                {conversation.users.map((usr, index) =>
                    <tr key={index}>
                        <td>{usr.name}</td>
                        {usr._id!==user._id ? <td><button onClick={() => kickUser(conversation._id, usr._id)}>kick</button></td> : <></>}
                    </tr>
                )}
                </tbody>
            </table>
            <ul>
                {conversation.messages.map((message, index) => <li key={index}>
                    <Message message={message} deleteMessage={deleteMessage} user={user} updateMessage={updateMessage}/>
                </li>)}
            </ul>
            <form onSubmit={handleSend}>
                <textarea name="message" placeholder="message"/>
                <input type="submit" value="send"/>
            </form>
        </div>
    )
}

export default Conversation