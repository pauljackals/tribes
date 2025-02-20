import {Link, Redirect} from "react-router-dom";
import Message from "./Message";
import {useState} from 'react'
import '../../../styles/Conversation.css'
import {deleteConversationOperation, editTitleOperation, inviteUserOperation, kickUserOperation, sendMessageOperation} from "../../../operations/operationsConversations";
import {connect} from "react-redux";

const Conversation = ({id, conversations, user, sendMessage, world, inviteUser, kickUser, editTitle, deleteConversation}) => {

    const [edit, setEdit] = useState(false)
    const [error, setError] = useState(false)
    const [titleNew, setTitleNew] = useState('')

    if(!user.loggedIn) {
        return (
            <Redirect to="/"/>
        )
    }

    const conversation = conversations.find(conversation => conversation._id===id)

    const handleSend = event => {
        event.preventDefault()
        const message = event.target.message.value
        if(message.length && message.length <= 640) {
            sendMessage(user._id, conversation._id, message, Date.now())
            event.target.reset()
        }
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
        if(titleNew.length && titleNew.length <= 20) {
            setEdit(false)
            editTitle(conversation._id, titleNew)
        } else {
            setError(true)
        }
    }

    return (
        <div className="Conversation">
            <h1>World {conversation.world.id}</h1>
            <div className="button-middle">
                <Link to={handleReturn}><button>return</button></Link>
            </div>
            {error ? <div className="error">Title must not be empty and longer than 20 characters</div> : ''}
            <h2>{edit ?
                <>
                    <input placeholder="title" defaultValue={conversation.title} onChange={editChange} onBlur={() => setError(false)}/>
                    <button onClick={editSave}>save</button>
                    <button onClick={editCancel}>cancel</button>
                </> :
                <>{conversation.title}<button onClick={editStart}>edit</button></>
            }</h2>
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
                {[...conversation.messages].reverse().map((message, index) => <li key={index} className={message.user._id===user._id ? "message-you" : ""}>
                    <Message message={message} user={user}/>
                </li>)}
            </ul>
            <form onSubmit={handleSend}>
                <textarea name="message" placeholder="message" maxLength="640"/>
                <input type="submit" value="send"/>
            </form>
            <div className="button-middle">
                {conversation.users.length > 1 ?
                    <Link to={handleReturn}><button onClick={() => kickUser(conversation._id, user._id)}>leave conversation</button></Link> :
                    <Link to={handleReturn}><button onClick={() => deleteConversation(conversation._id)}>delete conversation</button></Link>
                }
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        sendMessage: (idUser, idConversation, content, time) => {
            dispatch(sendMessageOperation(idUser, idConversation, content, time))
        },
        inviteUser: (idConversation, idUser) => {
            dispatch(inviteUserOperation(idConversation, idUser))
        },
        kickUser: (idConversation, idUser) => {
            dispatch(kickUserOperation(idConversation, idUser))
        },
        editTitle: (id, title) => {
            dispatch(editTitleOperation(id, title))
        },
        deleteConversation: id => {
            dispatch(deleteConversationOperation(id))
        }
    }
}

export default connect(undefined, mapDispatchToProps)(Conversation);