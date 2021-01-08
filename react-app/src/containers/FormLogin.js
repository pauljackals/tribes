import {Formik, Form, ErrorMessage, Field} from "formik"
import {useState} from 'react'

const FormLogin = ({logIn}) => {
    const [error, setError] = useState('')
    const validateEmail = email => {
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!regex.test(email)){
            return 'Invalid email'
        }
    }
    return (
        <Formik
            initialValues={
                {email: ''}
            }
            onSubmit={async (values) => {
                setError('')
                const result = await logIn(values.email)
                if (!result.success) {
                    setError(result.message)
                }
            }}
        >
            {() => (
                <Form onBlur={() => setError('')}>
                    {error.length>0 ? <div className="error">{error}</div> : ''}
                    <ErrorMessage name="email" component="div" className="error"/>
                    <Field name="email" type="text" placeholder="email" validate={validateEmail}/>
                    <button type="submit">login</button>
                </Form>
            )}
        </Formik>
    )
}

export default FormLogin