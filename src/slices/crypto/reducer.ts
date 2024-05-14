import { createSlice } from "@reduxjs/toolkit";

import { getWallet, getCryptoOrderList, getWalletActivities } from './thunk';

export const initialState = {
    wallet: [],
    walletActivities: [],
    cryptoOrders: [],
    error: {},
    loading: true
};


const CryptoSlice = createSlice({
    name: 'CryptoSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getWallet.fulfilled, (state: any, action: any) => {
            state.wallet = action.payload;
        });

        builder.addCase(getWallet.rejected, (state: any, action: any) => {
            state.error = action.payload ? action.payload?.error : null;
        });

        builder.addCase(getCryptoOrderList.fulfilled, (state: any, action: any) => {
            state.cryptoOrders = action.payload;
            state.loading = true
        });

        builder.addCase(getCryptoOrderList.rejected, (state: any, action: any) => {
            state.error = action.payload ? action.payload?.error : null;
        });

        builder.addCase(getWalletActivities.fulfilled, (state: any, action: any) => {
            state.walletActivities = action.payload;
            state.loading = true
        })
        builder.addCase(getWalletActivities.rejected, (state: any, action: any) => {
            state.error = action.payload ? action.payload?.error : null;
        });

    }
})

export default CryptoSlice.reducer;
