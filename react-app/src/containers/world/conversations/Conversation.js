import {Link} from "react-router-dom";
import Message from "./Message";
import {useState} from 'react'

const Conversation = ({id, conversations, user, sendMessage, deleteMessage, updateMessage, world, inviteUser, kickUser, editTitle}) => {
    const conversation = conversations.find(conversation => conversation._id===id)

    const handleSend = event => {
        event.preventDefault()
        const message = event.target.message.value
        sendMessage(user._id, conversation._id, message, Date.now())
        event.target.reset()
    }
    const sortCompare = (usr1, usr2) => {
        if(usr1.name > usr2.name) {
            return 1
        } else if (usr1.name < usr2.name) {
            return -1
        } else {
            return 0
        }
    }
    const usersOthers = [...world.users].filter(usr => !conversation.users.find(usrConv => usrConv._id===usr._id))
        .sort(sortCompare)

    const handleInvite = event => {
        event.preventDefault()
        inviteUser(conversation._id, event.target.user.value)
        event.target.reset()
    }

    const handleReturn = location => {
        const split = '/conversations'
        return `${location.pathname.split(split)[0]}${split}`
    }

    const [edit, setEdit] = useState(false)
    const [error, setError] = useState(false)
    const [titleNew, setTitleNew] = useState('')

    const editStart = () => {
        setTitleNew(conversation.title)
        setEdit(true)
    }
    const editChange = event => {
        setError(false)
        setTitleNew(event.target.value)
    }
    const editCancel = () => {
        setEdit(false)
        setError(false)
    }
    const editSave = () => {
        if(titleNew.length) {
            setEdit(false)
            editTitle(conversation._id, titleNew)
        } else {
            setError(true)
        }
    }

    return (
        <div className="Conversation">
            <h1>World {conversation.world.id}</h1>
            <Link to={handleReturn}><button>return</button></Link>
            {error ? <div className="error">Title must not be empty</div> : ''}
            <h3>{edit ?
                <>
                    <input placeholder="title" defaultValue={conversation.title} onChange={editChange} onBlur={() => setError(false)}/>
                    <button onClick={editSave}>save</button>
                    <button onClick={editCancel}>cancel</button>
                </> :
                <>{conversation.title}<button onClick={editStart}>edit</button></>
            }</h3>
            {conversation.users.length > 1 ?
                <Link to={handleReturn}><button onClick={() => kickUser(conversation._id, user._id)}>leave conversation</button></Link> :
                <button>delete conversation</button>
            }
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
                {[...conversation.users].sort(sortCompare).map((usr, index) =>
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