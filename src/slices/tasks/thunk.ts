import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getTasks as getTasksApi,
    addNewTasks as addNewTasksApi,
    updateTasks as updateTasksApi,
    deleteTasks as deleteTasksApi
} from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

export const getTasks = createAsyncThunk("tasks/getTasks", async () => {
    try {
        const response = getTasksApi();
        return response;
    } catch (error) {
        return error;
    }
});

export const addCardData = createAsyncThunk("projects/addCardData", async (project: any) => {
    try {
        const response = addNewTasksApi(project);
        const data = await response;
        toast.success("Project Add Successfully", { autoClose: 2000 })
        return data;
    } catch (error) {
        toast.error("Project Add Failded", { autoClose: 2000 })
        return error;
    }
})

export const updateCardData = createAsyncThunk("projects/updateCardData", async (project: any) => {
    try {
        const response = updateTasksApi(project);
        const data = await response;
        toast.success("Project Update Successfully", { autoClose: 2000 })
        return data;
    } catch (error) {
        toast.error("Project Update Failded", { autoClose: 2000 })
        return error
    }
})

export const deleteKanban = createAsyncThunk("projects/deleteKanban", async (project: any) => {
    try {
        const response = deleteTasksApi(project);
        toast.success("Project Delete Successfully", { autoClose: 2000 })
        return response;
    } catch (error) {
        toast.error("Project Delete Failded", { autoClose: 2000 })
        return error;
    }
})