import {Formik, Form, ErrorMessage, Field} from "formik"
import {useState} from 'react'
import {validateEmail} from "../../functions";

const FormLogin = ({logIn}) => {
    const [error, setError] = useState(false)

    return (
        <Formik
            initialValues={
                {email: ''}
            }
            onSubmit={async (values) => {
                setError('')
                const result = await logIn(values.email)
                if (!result.success) {
                    setError(true)
                }
            }}
        >
            {() => (
                <Form onBlur={() => setError(false)}>
                    {error ? <div className="error">Credentials don't match</div> : ''}
                    <ErrorMessage name="email" component="div" className="error"/>
                    <Field name="email" type="text" placeholder="email" validate={validateEmail}/>
                    <button type="submit">login</button>
                </Form>
            )}
        </Formik>
    )
}

export default FormLogin