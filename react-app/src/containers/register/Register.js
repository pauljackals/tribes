import {Redirect} from "react-router-dom";
import FormRegister from "./FormRegister";

const Register = ({register, redirect, userClearErrors, userErrors}) => {
    return (
        <>{
            redirect ?
                <Redirect to="/"/> :
                <div className="Register">
                    <h1>Register</h1>
                    <FormRegister register={register} userClearErrors={userClearErrors} userErrors={userErrors}/>
                </div>
        }</>
    )
}
export default Register