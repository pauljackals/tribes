import {Formik, Form, ErrorMessage, Field} from "formik"
import {validateEmail, validateName} from "../../functions";
import {editProfileOperation} from "../../operations/operationsUser";
import {connect} from 'react-redux'

const FormProfile = ({editProfile, userClearErrors, userErrors, user}) => {

    return (
        <Formik
            initialValues={
                {
                    name: user.name,
                    email: user.email
                }
            }
            onSubmit={values => {
                editProfile(user._id, values.name, values.email)
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

                    <button type="submit">save</button>
                </Form>
            )}
        </Formik>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        editProfile: (id, name, email) => {
            dispatch(editProfileOperation(id, name, email))
        }
    }
}
export default connect(undefined, mapDispatchToProps)(FormProfile)