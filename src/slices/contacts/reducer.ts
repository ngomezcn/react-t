import { createSlice } from "@reduxjs/toolkit";

import { getUsers, deleteUsers, getUserProfile, addNewUser, updateUser } from "./thunk";

export const initialState = {
    users: [],
    error: {},
    loading: true,
};

const ContactsSlice = createSlice({
    name: 'ContactsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, (state: any, action: any) => {
            state.users = action.payload;
            state.loading = true
        });

        builder.addCase(getUsers.rejected, (state: any, action: any) => {
            state.error = action.payload ? action.payload?.error : null;
        });
        builder.addCase(addNewUser.fulfilled, (state: any, action: any) => {
            state.users.unshift(action.payload);
        });
        builder.addCase(addNewUser.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(updateUser.fulfilled, (state: any, action: any) => {
            state.users = state.users.map((user: any) =>
                user.id === action.payload.id
                    ? { ...user, ...action.payload }
                    : user
            );
        });

        builder.addCase(updateUser.rejected, (state: any, action: any) => {
            state.error = action.payload || null;
        });

        builder.addCase(deleteUsers.fulfilled, (state: any, action: any) => {
            state.users = state.users.filter(
                (users: any) => users.id !== action.payload
            );
        });
        builder.addCase(deleteUsers.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });


        builder.addCase(getUserProfile.fulfilled, (state: any, action: any) => {
            state.users = action.payload;
        });

        builder.addCase(getUserProfile.rejected, (state: any, action: any) => {
            state.error = action.payload ? action.payload?.error : null;
        });
    }
})

export default ContactsSlice.reducer;