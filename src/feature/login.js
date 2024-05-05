import { createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const loginSlice = createSlice({
    name:'user',
    initialState:{
        user:null,
        
    },
    reducers:{
        logIn:(state,action)=>{
            state.user = action.payload
        },
        logOut:(state)=>{
            state.user=null
        },
 

    }
    
})
export const {logIn,logOut,increment} = loginSlice.actions
export const selectUser =(state) =>state.user.user
export default loginSlice.reducer;