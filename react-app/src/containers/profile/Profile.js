import {Link} from "react-router-dom";
import FormProfile from "./FormProfile";
import {Redirect} from 'react-router-dom'
import {deleteUserOperation} from "../../operations/operationsUser";
import {connect} from "react-redux";

const Profile = ({user, location, userClearErrors, userErrors, deleteUser}) => {
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
            <FormProfile user={user} userClearErrors={userClearErrors} userErrors={userErrors}/>
            {!user.admin ?
                <button onClick={() => deleteUser(user._id)}>delete this account</button> :
                ''
            }
        </div>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        deleteUser: id => {
            dispatch(deleteUserOperation(id))
        }
    }
}
export default connect(undefined, mapDispatchToProps)(Profile)