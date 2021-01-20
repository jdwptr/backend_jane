let INITIAL_STATE = {
    id_users: null,
    username: '',
    email: '',
    password: ''
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                id_users: action.payload.id_users,
                username: action.payload.username,
                email: action.payload.email,
                password: action.payload.password,
            }
        case 'LOG_OUT':
            return INITIAL_STATE
        default:
            return state
    }
}