import {Formik, Form, ErrorMessage, Field} from "formik"
import {validateEmail} from "../../functions";
import {connect} from "react-redux";
import {logInOperation} from "../../operations/operationsUser";

const FormLogin = ({logIn, userErrors, userClearErrors}) => {

    return (
        <Formik
            initialValues={
                {email: ''}
            }
            onSubmit={values => {
                logIn(values.email)
            }}
        >
            {() => (
                <Form onBlur={() => userClearErrors()} className="form-credentials">
                    {userErrors.email ? <div className="error">Credentials don't match</div> : ''}

                    <ErrorMessage name="email" component="div" className="error"/>
                    <Field name="email" type="text" placeholder="email" validate={validateEmail}/>
                    <button type="submit">login</button>
                </Form>
            )}
        </Formik>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        logIn: email => {
            dispatch(logInOperation(email))
        }
    }
}
export default connect(undefined, mapDispatchToProps)(FormLogin);