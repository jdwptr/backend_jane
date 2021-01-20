import Axios from 'axios'

export const login = (data) => {
    return async(dispatch) => {
        try {
            const res= await Axios.post(`http://localhost:2000/user/login`, data)
            console.log(res.data)

            localStorage.id= res.data.id_users
            localStorage.token= res.data.token

            dispatch({type: 'LOG_IN', payload: res.data})
        }
        catch(err) {
            // console.log(err ? `ERROR : ${err.response.data}` : err)
            console.log(err)
        }
    }
}

export const logout = () => {
    return async(dispatch) => {
        try {
            localStorage.removeItem('id')
            localStorage.removeItem('email')
            localStorage.removeItem('token')
            dispatch({ type: 'LOG_OUT' })
        }
        catch(err) {
            console.log(err)
        }
        
    }
}

export const keepLogin = () => {
    return async(dispatch) => {
        try {
            // NOTE get token from local storage
            const token= localStorage.getItem('token')

            // NOTE get user data from token
            const res= await Axios.post(`http://localhost:2000/user/keepLogin`, { token })

            dispatch({type: 'LOG_IN', payload: res.data})
        }
        catch(err) {
            // console.log(err ? `ERROR : ${err.response.data}` : err)
            console.log(err)
            localStorage.removeItem('id')
            localStorage.removeItem('token')
            dispatch ({ type: 'LOG_OUT' })
        }
    }
}