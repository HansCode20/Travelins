import { createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
// export const fetchPosts = createAsyncThunk('posts/fetchPost',async()=>{
//    const getToken =localStorage.getItem('token')
//     try{   
//         const response = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user',{
//             headers:{
//                 Authorization:`Bearer ${getToken}`,
//                 apiKey:'24405e01-fbc1-45a5-9f5a-be13afcd757c'
//             }
//         })
//         return [...response]
//     }catch(err){return err.message}
// })
export const FeatureSlice = createSlice({
    name:'feature',
    initialState:{
        isOpen:false,
        Modalsdata:null,
        isPost:false,
        CreatedData:null,
        isLoading:true,
    },
    reducers:{
        isOpen:(state)=>{
            state.isOpen = !state.isOpen
        },
        modalsData:(state,action) =>{
            state.Modalsdata = action.payload
        },
        isPost:(state,action)=>{
            state.isPost = action.payload
        },
        CreatedData:(state,action)=>{
            state.CreatedData = action.payload
        },
        isLoading:(state,action)=>{
            state.isLoading = action.payload
        }
      
    },

})

export const {isOpen,modalsData,isPost,CreatedData,isLoading} = FeatureSlice.actions
export default FeatureSlice.reducer;
