const BoardField = ({village, users , user}) => {
    const fieldUser = village && users.find(user => user._id===village.user)
    const sameUser = fieldUser && fieldUser._id===user._id
    return (
        <td className={fieldUser ? `village ${sameUser ? 'you' : 'other'}` : ''}>
            {fieldUser && <>
                <span>⌂</span>
                <div className={`name-popup${sameUser ? ' you' : ''}`}>
                    <span>{village.name ? village.name : `${fieldUser.name}'s village`}</span>
                    <span>({fieldUser.name})</span>
                </div>
            </>}
        </td>
    )
}
export default BoardField