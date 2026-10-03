import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name:"users",
    initialState:{
        users:[],
    },

    reducers:{
        setUsers:(state,action) => {
            state.users = action.payload;
        },

        toggleUserStatus:(state,action)=>{
            const user = state.users.find(
                (user) => user.id === action.payload
            );

            if(user){
               user.status =
                user.status === "block"
                ? "unblock"
                : "block";
               }
        }
    },
});

export const {setUsers,toggleUserStatus} = usersSlice.actions;
export default usersSlice.reducer;