import {Link} from "react-router-dom";

const Navbar = ({user, logOut}) => {
    return (
        <div className="Navbar">
            <Link to="/">home</Link>
            {
                user.loggedIn ?
                    <>
                        <span>{user.name}</span>
                        <Link to="/"><button onClick={() => logOut()}>logout</button></Link>
                    </>:

                    <Link to="/login"><button>login</button></Link>
            }
        </div>
    )
}
export default Navbar