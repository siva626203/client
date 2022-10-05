import {createSlice} from '@reduxjs/toolkit'
export const userSlice= createSlice({
    name: 'user',
    initialState: {value: {username:null}},
    reducers: {
        login: (state,action)=>{
            state.value=action.payload
        },
        logout: (state)=>{
            state.value={username:null}
        }
    }   
},   
)
export const {logout,login}= userSlice.actions;
export default userSlice.reducer;