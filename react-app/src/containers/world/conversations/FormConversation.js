import {Formik, Field, Form, FieldArray, ErrorMessage} from "formik";
import {createConversationOperation} from "../../../operations/operationsConversations";
import {connect} from "react-redux";

const FormConversation = ({world, user, createConversation}) => {
    const validateTitle = (min, max) => text => {
        if(text!==undefined && text.length < min) {
            return `Title too short (min ${min} characters)`

        } else if (text!==undefined && text.length > max) {
            return `Title too long (max ${max} characters)`
        }
    }
    const validateUser = (names, name, index) => {
        const worldUser = world.users.find(usr => usr.name===name)
        const nameIndex = names.indexOf(name)
        if(!worldUser) {
            return 'No such user'
        } else if(worldUser._id===user._id) {
            return "Can't add yourself"
        } else if(nameIndex>=0 && nameIndex!==index) {
            return "User already added"
        }
    }
    return (
        <Formik
            initialValues={{
                title: '',
                users: ['']
            }}
            onSubmit={(values, {resetForm}) => {
                const users = values.users.map(usr => world.users.find(usrWorld => usrWorld.name===usr)._id)
                createConversation(world._id, [user._id, ...users], values.title)
                resetForm()
            }}
        >
            {({values}) => (
                <Form>
                    <ErrorMessage name="title" component="div" className="error"/>
                    <label htmlFor="title">Title</label>
                    <Field id="title" name="title" type="text" placeholder="title" validate={validateTitle(1, 20)}/>
                    <FieldArray name="users">
                        {({remove, push}) => (
                            <>
                                <ul>
                                    {values.users.map((usr, index) => (
                                        <li key={`user.${index}`}>
                                            <ErrorMessage name={`users.${index}`} component="div" className="error"/>
                                            <label htmlFor={`users.${index}`}>User</label>
                                            <Field id={`users.${index}`} name={`users.${index}`} type="text" placeholder="user" validate={name => validateUser(values.users, name, index)}/>

                                            {index>0 ?
                                                <button onClick={event => {
                                                    event.preventDefault()
                                                    remove(index)
                                                }}>x</button> :
                                                ''
                                            }
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={event => {
                                    event.preventDefault()
                                    push('')
                                }}>add user</button>
                            </>
                        )}
                    </FieldArray>
                    <button type="submit">create</button>
                    <button type="reset">reset</button>
                </Form>
            )}
        </Formik>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        createConversation: (idWorld, idsUsers, title) => {
            dispatch(createConversationOperation(idWorld, idsUsers, title))
        }
    }
}

export default connect(undefined, mapDispatchToProps)(FormConversation);