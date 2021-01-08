import {Formik, Form, ErrorMessage, Field} from "formik"
import {useState} from 'react'
import {validateEmail} from "../../functions";

const FormRegister = ({register}) => {
    const INITIAL_ERRORS = {name: false, email: false}
    const [errors, setErrors] = useState(INITIAL_ERRORS)

    const validateName = name => {
        if (name.length<1){
            return 'Name must not be empty'
        }
    }

    return (
        <Formik
            initialValues={
                {
                    name: '',
                    email: ''
                }
            }
            onSubmit={async (values) => {
                setErrors(INITIAL_ERRORS)
                const result = await register(values.name, values.email)
                if (!result.success) {
                    const resultError = result.error
                    setErrors({
                        name: !!resultError.name,
                        email: !!resultError.email
                    })
                }
            }}
        >
            {() => (
                <Form>
                    {errors.name ? <div className="error">Name must be unique</div> : ''}
                    <ErrorMessage name="name" component="div" className="error"/>
                    <Field name="name" type="text" placeholder="name" validate={validateName}/>

                    {errors.email ? <div className="error">Email must be unique</div> : ''}
                    <ErrorMessage name="email" component="div" className="error"/>
                    <Field name="email" type="text" placeholder="email" validate={validateEmail}/>

                    <button type="submit">register</button>
                </Form>
            )}
        </Formik>
    )
}

export default FormRegister