export const SET_TOKEN = (token) => {
    localStorage.setItem('token', token)
}
export const GET_TOKEN = () => {
    return localStorage.getItem('token')
}
export const REMOVE_TOKEN = () => {
    localStorage.removeItem('token')
}

export const SET_REFRESH_TOKEN = (refresh_token) => {
    localStorage.setItem('refresh_token', refresh_token)
}
export const GET_REFRESH_TOKEN = () => {
    return localStorage.getItem('refresh_token')
}
export const REMOVE_REFRESH_TOKEN = () => {
    localStorage.removeItem('refresh_token')
}

export const SET_USERNAME = (username) => {
    localStorage.setItem('username', username)
}
export const GET_USERNAME = () => {
    return localStorage.getItem('username')
}
export const REMOVE_USERNAME = () => {
    localStorage.removeItem('username')
}

export const SET_LOCALSTORAGE = (key, value) => {
    localStorage.setItem(key, value)
}
export const GET_LOCALSTORAGE = (key) => {
    return localStorage.getItem(key)
}
export const REMOVE_LOCALSTORAGE = (key) => {
    localStorage.removeItem(key)
}