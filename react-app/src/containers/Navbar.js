import {Link} from "react-router-dom";
import '../styles/Navbar.css'

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
export default Navbar