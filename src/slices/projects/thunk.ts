import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getProjects as getProjectsApi,
    getProjectsDetail as getProjectsDetailApi,
    updateProject as updateProjectApi,
    deleteProject as deleteProjectApi
} from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

export const getProjects = createAsyncThunk("projects/getProjects", async () => {
    try {
        const response = getProjectsApi();
        return response;
    } catch (error) {
        return error;
    }
});

export const getProjectsDetail = createAsyncThunk("projects/getProjectsDetail", async (projectId: any) => {
    try {
        const response = getProjectsDetailApi(projectId);
        return response;
    } catch (error) {
        return error;
    }
})

export const updateProject = createAsyncThunk("projects/updatproject", async (project: any) => {
    try {
        const response = updateProjectApi(project);
        const data = await response;
        toast.success("Project Update Successfully", { autoClose: 2000 })
        return data;
    } catch (error) {
        toast.error("Project Update Failded", { autoClose: 2000 })
        return error
    }
})

export const deleteProject = createAsyncThunk("projects/deleteproject", async (project: any) => {
    try {
        const response = deleteProjectApi(project);
        toast.success("Project Delete Successfully", { autoClose: 2000 })
        return response;
    } catch (error) {
        toast.error("Project Delete Failded", { autoClose: 2000 })
        return error;
    }
})