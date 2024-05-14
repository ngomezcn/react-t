import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getEarningChartsData, getTopSellingData, getChartData, getTransaction, getWalletBalance, getVisitors, getStatisticsApplications } from "./thunk";

// types
import { DashboardEmailItem, LatestTransactions } from "pages/Dashboard/type";
import { MonthlyEarnings, MonthlyTopSellingData } from "pages/Dashboard-saas/type";
import { DashboardCryptoData } from "pages/Dashboard-crypto/type";
import { VisitorsType } from "pages/Dashboard-blog/type";
import { StatisticsApplication } from "pages/Dashboard-job/type";

interface initialStateType {
    dashboard: MonthlyEarnings[],
    dashboardTransaction: LatestTransactions[],
    dashboardSaas: MonthlyTopSellingData[],
    dashboardChartData: DashboardEmailItem[],
    dashboardCrypto: DashboardCryptoData[],
    dashboardVisitors: VisitorsType[],
    statisticsApplications: StatisticsApplication[],
    error: object;
    loading: boolean;
}

interface Error {
    error: object
}

export const initialState: initialStateType = {
    dashboard: [],
    dashboardTransaction: [],
    dashboardSaas: [],
    dashboardChartData: [],
    dashboardCrypto: [],
    dashboardVisitors: [],
    statisticsApplications: [],
    error: {},
    loading: true
};

const dashboardSlice = createSlice({
    name: 'dashboardSlice',
    initialState,
    reducers: {},
    extraReducers: (builder: any) => {
        builder.addCase(getEarningChartsData.fulfilled, (state: initialStateType, action: PayloadAction<MonthlyEarnings[]>) => {
            state.dashboard = action.payload;
        });

        builder.addCase(getEarningChartsData.rejected, (state: initialStateType, action: PayloadAction<Error | any>) => {
            state.error = action.payload ? action.payload?.error : null;
        });

        builder.addCase(getTopSellingData.fulfilled, (state: initialStateType, action: PayloadAction<MonthlyTopSellingData[]>) => {
            state.dashboardSaas = action.payload;
        });

        builder.addCase(getTopSellingData.rejected, (state: initialStateType, action: PayloadAction<Error | any>) => {
            state.error = action.payload ? action.payload?.error : null;
        });

        builder.addCase(getChartData.fulfilled, (state: initialStateType, action: PayloadAction<DashboardEmailItem[]>) => {
            state.dashboardChartData = action.payload;
        });

        builder.addCase(getChartData.rejected, (state: initialStateType, action: PayloadAction<Error | any>) => {
            state.error = action.payload ? action.payload?.error : null;
        });

        builder.addCase(getTransaction.fulfilled, (state: initialStateType, action: PayloadAction<LatestTransactions[]>) => {
            state.dashboardTransaction = action.payload;
        });

        builder.addCase(getTransaction.rejected, (state: initialStateType, action: PayloadAction<Error | any>) => {
            state.error = action.payload ? action.payload?.error : null;
        });
        builder.addCase(getWalletBalance.fulfilled, (state: initialStateType, action: PayloadAction<DashboardCryptoData[]>) => {
            state.dashboardCrypto = action.payload;
        });

        builder.addCase(getWalletBalance.rejected, (state: initialStateType, action: PayloadAction<Error | any>) => {
            state.error = action.payload ? action.payload?.error : null;
        });
        builder.addCase(getVisitors.fulfilled, (state: initialStateType, action: PayloadAction<VisitorsType[]>) => {
            state.dashboardVisitors = action.payload;
        });
        builder.addCase(getVisitors.rejected, (state: initialStateType, action: PayloadAction<Error | any>) => {
            state.error = action.payload ? action.payload?.error : null;
        });
        builder.addCase(getStatisticsApplications.fulfilled, (state: initialStateType, action: PayloadAction<StatisticsApplication[]>) => {
            state.statisticsApplications = action.payload;
        });
        builder.addCase(getStatisticsApplications.rejected, (state: initialStateType, action: PayloadAction<Error | any>) => {
            state.error = action.payload ? action.payload?.error : null;
        });
    }
})

export default dashboardSlice.reducer;