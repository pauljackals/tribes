import {Formik, Form, ErrorMessage, Field} from "formik"

const FormLogin = ({logIn}) => {
    return (
        <Formik
            initialValues={
                {email: ''}
            }
            onSubmit={(values, {resetForm}) => {
                logIn(values.email)
                resetForm()
            }}
        >
            {() => (
                <Form>
                    <ErrorMessage name="title" component="div" className="error"/>
                    <Field name="email" type="text" placeholder="email"/>
                    <button type="submit">login</button>
                </Form>
            )}
        </Formik>
    )
}

export default FormLogin