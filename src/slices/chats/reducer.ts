import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { getChats, getGroups, getContacts, getMessages, addMessage, deleteMessage } from "./thunk";
import { Contact, Group, Message, RecentChat } from "pages/Chat/type";

interface InitialState {
    chats: RecentChat[];
    groups: Group[];
    contacts: Contact[];
    messages: Message[],
    error: object;
    loading: boolean
}

interface Error {
    error: object;
}

export const initialState: InitialState = {
    chats: [],
    groups: [],
    contacts: [],
    messages: [],
    error: {},
    loading: true
};

const ChatsSlice = createSlice({
    name: 'ChatsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getChats.fulfilled, (state: InitialState, action: PayloadAction<RecentChat[]>) => {
            state.chats = action.payload;
            state.loading = true;
        });
        builder.addCase(getChats.rejected, (state: InitialState, action: PayloadAction<Error | any>) => {
            state.error = action.payload ? action.payload?.error : null;
        });

        builder.addCase(getGroups.fulfilled, (state: InitialState, action: PayloadAction<Group[]>) => {
            state.groups = action.payload;
            state.loading = true;
        });
        builder.addCase(getGroups.rejected, (state: InitialState, action: PayloadAction<Error | any>) => {
            state.groups = action.payload ? action.payload?.error : null;
        });

        builder.addCase(getContacts.fulfilled, (state: InitialState, action: PayloadAction<Contact[]>) => {
            state.contacts = action.payload;
            state.loading = true;
        });
        builder.addCase(getContacts.rejected, (state: InitialState, action: PayloadAction<Error | any>) => {
            state.contacts = action.payload ? action.payload?.error : null;
        });

        builder.addCase(getMessages.fulfilled, (state: InitialState, action: PayloadAction<Message[]>) => {
            state.messages = action.payload;
            state.loading = true;
        });
        builder.addCase(getMessages.rejected, (state: InitialState, action: PayloadAction<Error | any>) => {
            state.messages = action.payload ? action.payload?.error : null;
        });

        builder.addCase(addMessage.fulfilled, (state: InitialState, action: PayloadAction<Message[]>) => {
            state.messages.map((item: any) => item.userMessages.push(action.payload));

        });
        builder.addCase(addMessage.rejected, (state: InitialState, action: PayloadAction<Error | any>) => {
            state.messages = action.payload.error || null;
        });
        builder.addCase(deleteMessage.fulfilled, (state: InitialState, action: PayloadAction<Message[]>) => {
            state.messages = (state.messages || []).map((data: Message) => {
                const updatedUserMessages = data.userMessages.filter((message: any) => message.id !== action.payload)
                return { ...data, userMessages: updatedUserMessages }
            });
        });
        builder.addCase(deleteMessage.rejected, (state: InitialState, action: PayloadAction<Error | any>) => {
            state.error = action.payload.error || null;
        });

    }
})

export default ChatsSlice.reducer;