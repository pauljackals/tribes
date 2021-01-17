import {Link} from "react-router-dom";
import FormProfile from "./FormProfile";

const Profile = ({user, previous, userClearErrors, userErrors, editProfile}) => {

    return (
        <div className="Profile">
            <h1>Profile</h1>
            <Link to={previous}><button>return</button></Link>
            <FormProfile user={user} userClearErrors={userClearErrors} editProfile={editProfile} userErrors={userErrors}/>
        </div>
    )
}
export default Profile