import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../src/feature/login'
import openModals from '../src/feature/action'
export default configureStore({
    reducer:{
        user:userReducer,
        feature:openModals
    }
})