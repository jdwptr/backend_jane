// NOTE storage itu redux
import { combineReducers } from 'redux'

// nyambungin nya itu pake ract redux
import { userReducer } from './userReducer'

const allReducer= combineReducers ({
    user: userReducer
})

export default allReducer