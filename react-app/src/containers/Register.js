import {Redirect} from "react-router-dom";
import FormRegister from "./FormRegister";

const Register = ({register, redirect}) => {
    return (
        <div className="Register">
            {redirect ? <Redirect push to="/"/> : ''}
            <h1>Register</h1>
            <FormRegister register={register}/>
        </div>
    )
}
export default Register