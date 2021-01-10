import {defaultVillageName} from "../../../functions";
import {Link} from 'react-router-dom'

const BoardField = ({village, users , user}) => {
    const fieldUser = village && users.find(user => user._id===village.user)
    const sameUser = fieldUser && fieldUser._id===user._id
    return (
        <td className={fieldUser ? `village ${sameUser ? 'you' : 'other'}` : ''}>
            {fieldUser && <Link to={location => `${location.pathname}/village/${village._id}/details`}><div className="village-link">
                <span>⌂</span>
                <div className={`name-popup${sameUser ? ' you' : ''}`}>
                    <span>{village.name ? village.name : defaultVillageName(fieldUser.name)}</span>
                    <span>({fieldUser.name})</span>
                </div>
            </div></Link>}
        </td>
    )
}
export default BoardField