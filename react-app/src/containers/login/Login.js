import FormLogin from "./FormLogin";
import {Redirect} from 'react-router-dom'

const Login = ({userErrors, userClearErrors, redirect}) => {
    if(redirect) {
        return (
            <Redirect to={'/'}/>
        )
    }
    return (
        <div className="Login">
            <h1>Login</h1>
            <FormLogin userErrors={userErrors} userClearErrors={userClearErrors}/>
        </div>
    )
}
export default Login