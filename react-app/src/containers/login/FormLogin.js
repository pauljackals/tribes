import {Formik, Form, ErrorMessage, Field} from "formik"
import {validateEmail} from "../../functions";

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
                <Form onBlur={() => userClearErrors()}>
                    {userErrors.email ? <div className="error">Credentials don't match</div> : ''}

                    <ErrorMessage name="email" component="div" className="error"/>
                    <Field name="email" type="text" placeholder="email" validate={validateEmail}/>
                    <button type="submit">login</button>
                </Form>
            )}
        </Formik>
    )
}

export default FormLogin