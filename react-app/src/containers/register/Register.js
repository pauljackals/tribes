import {Redirect} from "react-router-dom";
import FormRegister from "./FormRegister";

const Register = ({register, redirect, userClearErrors, userErrors}) => {
    if(redirect) {
        return (
            <Redirect to={'/'}/>
        )
    }
    return (
        <div className="Register">
            <h1>Register</h1>
            <FormRegister register={register} userClearErrors={userClearErrors} userErrors={userErrors}/>
        </div>
    )
}
export default Register