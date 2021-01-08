import FormLogin from "./FormLogin";

const Login = ({logIn}) => {
    return (
        <div className="Login">
            <h1>Login</h1>
            <FormLogin logIn={logIn}/>
        </div>
    )
}
export default Login