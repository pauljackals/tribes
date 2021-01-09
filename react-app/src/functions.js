export const validateEmail = email => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!regex.test(email)){
        return 'Invalid email'
    }
}
export const getAxiosUrl = endpoint => {
    return `http://localhost:5000${endpoint}`
}