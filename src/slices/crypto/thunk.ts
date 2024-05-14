import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getWallet as getWalletApi,
    getCryptoOrderList as getCryptoOrderListApi,
    getWalletActivities as getWalletActivitiesApi,
} from "../../helpers/fakebackend_helper";

export const getWallet = createAsyncThunk("crypto/getWallet", async () => {
    try {
        const response = getWalletApi();
        return response;
    } catch (error) {
        return error;
    }
});

export const getCryptoOrderList = createAsyncThunk("crypto/getCryptoOrderList", async () => {
    try {
        const response = getCryptoOrderListApi();
        return response;
    } catch (error) {
        return error;
    }
});

export const getWalletActivities = createAsyncThunk("crypto/getWalletActivities", async () => {
    try {
        const response = getWalletActivitiesApi();
        return response;
    } catch (error) {
        return error;
    }
})