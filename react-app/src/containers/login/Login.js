import FormLogin from "./FormLogin";
import {Redirect} from 'react-router-dom'

const Login = ({logIn, userErrors, userClearErrors, redirect}) => {
    if(redirect) {
        return (
            <Redirect to={'/'}/>
        )
    }
    return (
        <div className="Login">
            <h1>Login</h1>
            <FormLogin logIn={logIn} userErrors={userErrors} userClearErrors={userClearErrors}/>
        </div>
    )
}
export default Login