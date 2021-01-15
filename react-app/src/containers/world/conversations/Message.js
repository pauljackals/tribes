const Message = ({message, deleteMessage, user}) => {

    return (
        <>
            <span>{message.user.name} ({(new Date(message.time)).toLocaleString()})</span>
            {message.user._id===user._id ? <button onClick={() => deleteMessage(message._id)}>x</button> : ''}
            <div>{message.content}</div>
        </>
    )
}
export default Message