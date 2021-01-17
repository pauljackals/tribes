import {Link} from "react-router-dom";
import FormProfile from "./FormProfile";
import {Redirect} from 'react-router-dom'

const Profile = ({user, location, userClearErrors, userErrors, editProfile, deleteUser}) => {
    if(!user.loggedIn) {
        return (
            <Redirect to="/"/>
        )
    }

    const previous = location.state ? location.state.previous : '/'

    return (
        <div className="Profile">
            <h1>Profile</h1>
            <Link to={previous}><button>return</button></Link>
            <FormProfile user={user} userClearErrors={userClearErrors} editProfile={editProfile} userErrors={userErrors}/>
            {!user.admin ?
                <button onClick={() => deleteUser(user._id)}>delete this account</button> :
                ''
            }
        </div>
    )
}
export default Profile