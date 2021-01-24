export const validateEmail = email => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(email)){
        return 'Invalid email'
    }else if (email.length > 128){
        return 'Max 128 characters'
    }
}
export const getApiUrl = endpoint => {
    return `http://localhost:5000${endpoint}`
}
export const defaultVillageName = userName => `${userName}'s village`