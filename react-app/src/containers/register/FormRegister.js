import {Formik, Form, ErrorMessage, Field} from "formik"
import {validateEmail} from "../../functions";

const FormRegister = ({register, userClearErrors, userErrors}) => {

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
            onSubmit={values => {
                register(values.name, values.email)
            }}
        >
            {() => (
                <Form onBlur={() => userClearErrors()} className="form-credentials">

                    {userErrors.name ? <div className="error">Name must be unique</div> : ''}
                    <ErrorMessage name="name" component="div" className="error"/>
                    <Field name="name" type="text" placeholder="name" validate={validateName}/>

                    {userErrors.email ? <div className="error">Email must be unique</div> : ''}
                    <ErrorMessage name="email" component="div" className="error"/>
                    <Field name="email" type="text" placeholder="email" validate={validateEmail}/>

                    <button type="submit">register</button>
                </Form>
            )}
        </Formik>
    )
}

export default FormRegister