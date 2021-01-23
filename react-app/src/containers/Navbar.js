import {Link} from "react-router-dom";
import '../styles/Navbar.css'
import {connect} from "react-redux";
import {logOutAction} from "../actions/actionsUser";

const Navbar = ({user, logOut}) => {
    return (
        <div className="Navbar">
            <Link to="/" className="navbar-home">Tribes</Link>
            {
                user.loggedIn ?
                    <>
                        <Link className="navbar-name" to={location => ({pathname: '/profile', state: {previous: location.pathname}})}><span>{user.name}</span></Link>
                        <Link to="/"><button onClick={() => logOut()}>logout</button></Link>
                    </>:

                    <>
                        <Link to="/login"><button>login</button></Link>
                        <Link to="/register"><button>register</button></Link>
                    </>
            }
        </div>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        logOut: () => {
            dispatch(logOutAction())
        }
    }
}
export default connect(undefined, mapDispatchToProps)(Navbar);