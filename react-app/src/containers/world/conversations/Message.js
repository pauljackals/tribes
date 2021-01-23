import {useState} from 'react'
import {deleteMessageOperation, updateMessageOperation} from "../../../operations/operationsConversations";
import {connect} from "react-redux";

const Message = ({message, deleteMessage, user, updateMessage}) => {
    const [edit, setEdit] = useState(false)
    const [error, setError] = useState(false)
    const [content, setContent] = useState('')
    const updateHandle = () => {
        if(content.length) {
            updateMessage(message._id, content)
            cancel()
        } else {
            setError(true)
        }
    }
    const cancel = () => {
        setError(false)
        setEdit(false)
    }
    const editHandle = () => {
        setContent(message.content)
        setEdit(true)
    }
    const inputHandle = event => {
        setContent(event.target.value)
        setError(false)
    }
    return (
        <>
            <span>{message.user.name} ({(new Date(message.time)).toLocaleString()})</span>
            {message.user._id===user._id ? (
                    edit ?
                        <><button onClick={updateHandle}>update</button><button onClick={cancel}>cancel</button></> :
                        <><button onClick={editHandle}>edit</button><button onClick={() => deleteMessage(message._id)}>x</button></>
                ) : ''
            }
            <div>
                {error ? <div className="error">Message must not be empty</div> : ''}
                {edit ?
                    <textarea placeholder="message" defaultValue={message.content} onChange={inputHandle} onBlur={() => setError(false)}/> :
                    message.content
                }
            </div>
        </>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        deleteMessage: id => {
            dispatch(deleteMessageOperation(id))
        },
        updateMessage: (id, content) => {
            dispatch(updateMessageOperation(id, content))
        }
    }
}

export default connect(undefined, mapDispatchToProps)(Message);