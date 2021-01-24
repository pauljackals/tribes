import {Formik, Form, ErrorMessage, Field} from "formik"
import {validateEmail, validateName} from "../../functions";
import {registerOperation} from "../../operations/operationsUser";
import {connect} from "react-redux";

const FormRegister = ({register, userClearErrors, userErrors}) => {

    return (
        <Formik
            initialValues={
                {
                    name: '',
                    email: ''
                }
            }
            onSubmit={values => {
                register(values.name, values.email)
            }}
        >
            {() => (
                <Form onBlur={() => userClearErrors()} className="form-credentials">

                    {userErrors.name ? <div className="error">Name must be unique</div> : ''}
                    <ErrorMessage name="name" component="div" className="error"/>
                    <Field name="name" type="text" placeholder="name" validate={validateName} maxLength="20"/>

                    {userErrors.email ? <div className="error">Email must be unique</div> : ''}
                    <ErrorMessage name="email" component="div" className="error"/>
                    <Field name="email" type="text" placeholder="email" validate={validateEmail} maxLength="128"/>

                    <button type="submit">register</button>
                </Form>
            )}
        </Formik>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        register: (name, email) => {
            dispatch(registerOperation(name, email))
        }
    }
}
export default connect(undefined, mapDispatchToProps)(FormRegister);