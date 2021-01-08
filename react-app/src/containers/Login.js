import FormLogin from "./FormLogin";
import {Redirect} from "react-router-dom";

const Login = ({logIn, redirect}) => {
    return (
        <div className="Login">
            {redirect ? <Redirect push to="/"/> : ''}
            <h1>Login</h1>
            <FormLogin logIn={logIn}/>
        </div>
    )
}
export default Login