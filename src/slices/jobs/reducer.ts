import { createSlice } from "@reduxjs/toolkit";

import { getJobList, deleteJobList, getApplyJob, deleteApplyJob, addNewJobList, updateJobList, getJobGrid, getJobCandidateList } from "./thunk";

export const initialState = {
    jobList: [],
    jobGrid: [],
    candidateList: [],
    applyJobs: [],
    error: {},
    loading: true
};

const JobsSlice = createSlice({
    name: 'JobsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getJobList.fulfilled, (state: any, action: any) => {
            state.jobList = action.payload;
            state.loading = true
        });
        builder.addCase(getJobList.rejected, (state: any, action: any) => {
            state.error = action.payload ? action.payload?.error : null;
        });

        builder.addCase(addNewJobList.fulfilled, (state: any, action: any) => {
            state.jobList.unshift(action.payload);
            state.isCustomerCreated = true;
        });
        builder.addCase(addNewJobList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(updateJobList.fulfilled, (state: any, action: any) => {
            state.jobList = state.jobList.map((jobList: any) =>
                jobList.id === action.payload.id
                    ? { ...jobList, ...action.payload }
                    : jobList
            );
        });

        builder.addCase(updateJobList.rejected, (state: any, action: any) => {
            state.error = action.payload || null;
        });


        builder.addCase(deleteJobList.fulfilled, (state: any, action: any) => {
            state.jobList = state.jobList.filter(
                (jobs: any) => jobs.id !== action.payload
            );
        });
        builder.addCase(deleteJobList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(getApplyJob.fulfilled, (state: any, action: any) => {
            state.applyJobs = action.payload;
            state.loading = true;
        });
        builder.addCase(getApplyJob.rejected, (state: any, action: any) => {
            state.error = action.payload ? action.payload?.error : null;
        });

        builder.addCase(deleteApplyJob.fulfilled, (state: any, action: any) => {
            state.applyJobs = state.applyJobs.filter(
                (jobs: any) => jobs.id !== action.payload
            );
        });
        builder.addCase(deleteApplyJob.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(getJobGrid.fulfilled, (state: any, action: any) => {
            state.jobGrid = action.payload;
            state.loading = true;
        });
        builder.addCase(getJobGrid.rejected, (state: any, action: any) => {
            state.error = action.payload ? action.payload?.error : null;
        });
        builder.addCase(getJobCandidateList.fulfilled, (state: any, action: any) => {
            state.candidateList = action.payload;
            state.loading = true;
        });
        builder.addCase(getJobCandidateList.rejected, (state: any, action: any) => {
            state.error = action.payload ? action.payload?.error : null;
        });
    }
});

export default JobsSlice.reducer;