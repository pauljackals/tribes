import {Formik, Form, ErrorMessage, Field} from "formik"
import {useState} from 'react'
import {validateEmail} from "../../functions";

const FormLogin = ({logIn}) => {
    const INITIAL_ERRORS = {connection: false, email: false}
    const [errors, setErrors] = useState(INITIAL_ERRORS)

    return (
        <Formik
            initialValues={
                {email: ''}
            }
            onSubmit={async (values) => {
                const result = await logIn(values.email)
                if (!result.success) {
                    setErrors({
                        email: !!result.status,
                        connection: !result.status
                    })
                }
            }}
        >
            {() => (
                <Form onBlur={() => setErrors(INITIAL_ERRORS)}>
                    {errors.connection ? <div className="error">Connection error</div> : ''}
                    {errors.email ? <div className="error">Credentials don't match</div> : ''}

                    <ErrorMessage name="email" component="div" className="error"/>
                    <Field name="email" type="text" placeholder="email" validate={validateEmail}/>
                    <button type="submit">login</button>
                </Form>
            )}
        </Formik>
    )
}

export default FormLogin