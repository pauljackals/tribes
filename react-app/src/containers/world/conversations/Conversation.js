import {Link} from "react-router-dom";
import Message from "./Message";

const Conversation = ({id, conversations, user, sendMessage, deleteMessage}) => {
    const conversation = conversations.find(conversation => conversation._id===id)

    const handleSend = event => {
        event.preventDefault()
        const message = event.target.message.value
        sendMessage(user._id, conversation._id, message, Date.now())
        event.target.reset()
    }
    return (
        <div className="Conversation">
            <h1>World {conversation.world.id}</h1>
            <h3>{conversation.title}</h3>
            <Link to={location => {
                const split = '/conversations'
                return `${location.pathname.split(split)[0]}${split}`
            }}><button>return</button></Link>
            <ul>
                {conversation.messages.map((message, index) => <li key={index}>
                    <Message message={message} deleteMessage={deleteMessage} user={user}/>
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