import { createSlice } from "@reduxjs/toolkit";

import { getTasks, addCardData, updateCardData, deleteKanban } from "./thunk";

export const initialState = {
    tasks: [],
    error: {},
};

const TasksSlice = createSlice({
    name: 'TasksSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTasks.fulfilled, (state: any, action: any) => {
            state.tasks = action.payload;
        });
        builder.addCase(getTasks.rejected, (state: any, action: any) => {
            state.error = action.payload ? action.payload?.error : null;
        });
        builder.addCase(addCardData.fulfilled, (state: any, action: any) => {
            state.tasks = state.tasks.map((task: any) => {
                if (task.id === action.payload.kanId) {
                    return {
                        ...task,
                        cards: [...task.cards, action.payload],
                    }
                }
                return task
            })
        });
        builder.addCase(addCardData.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });
        builder.addCase(updateCardData.fulfilled, (state: any, action: any) => {
            state.tasks = state.tasks.map((task: any) => {
                if (task.id === action.payload.kanId) {
                    return {
                        ...task,
                        cards: task.cards.map((card: any) =>
                            card.id.toString() === action.payload.id.toString()
                                ? { card, ...action.payload }
                                : card
                        ),
                    }
                }
                return task
            })
        });

        builder.addCase(updateCardData.rejected, (state: any, action: any) => {
            state.error = action.payload || null;
        });
        builder.addCase(deleteKanban.fulfilled, (state: any, action: any) => {
            state.tasks = state.tasks.map((task: any) => {
                const deleteCard = task.cards.filter((card: any) => card.id.toString() !== action.payload.toString());
                return {
                    ...task,
                    cards: deleteCard,
                }
            })
        });
        builder.addCase(deleteKanban.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });
    }
});

export default TasksSlice.reducer;