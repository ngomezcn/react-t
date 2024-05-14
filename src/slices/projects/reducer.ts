import { createSlice } from "@reduxjs/toolkit";

import { getProjects, getProjectsDetail, updateProject, deleteProject } from "./thunk";

export const initialState = {
    projects: [],
    projectDetail: {},
    error: {},
    loading: true
};

const ProjectsSlice = createSlice({
    name: 'ProjectsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProjects.fulfilled, (state: any, action: any) => {
            state.projects = action.payload;
            state.loading = true;
        });
        builder.addCase(getProjects.rejected, (state: any, action: any) => {
            state.error = action.payload ? action.payload?.error : null;
        });
        builder.addCase(getProjectsDetail.fulfilled, (state: any, action: any) => {
            state.projectDetail = action.payload;
        });

        builder.addCase(getProjectsDetail.rejected, (state: any, action: any) => {
            state.error =action.payload ? action.payload?.error : null;
        });

        builder.addCase(updateProject.fulfilled, (state: any, action: any) => {
            state.projects = state.projects.map((project: any) =>
                project.id === action.payload.id
                    ? { ...project, ...action.payload }
                    : project
            );
        });

        builder.addCase(updateProject.rejected, (state: any, action: any) => {
            state.error = action.payload || null;
        });

        builder.addCase(deleteProject.fulfilled, (state: any, action: any) => {
            state.projects = state.projects.filter(
                (project: any) => project.id !== action.payload
            );
        });

        builder.addCase(deleteProject.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });
    }
});

export default ProjectsSlice.reducer;