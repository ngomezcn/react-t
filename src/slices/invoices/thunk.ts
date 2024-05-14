import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getInvoices as getInvoicesApi,
    getInvoicesDetail as getInvoicesDetailApi,
} from "../../helpers/fakebackend_helper";

export const getInvoices = createAsyncThunk("invoices/getInvoices", async () => {
    try {
        const response = getInvoicesApi();
        return response;
    } catch (error) {
        return error;
    }
});

export const getInvoicesDetail = createAsyncThunk("invoices/getInvoicesDetail", async (invoicesId: any) => {
    try {
        const response = getInvoicesDetailApi(invoicesId);
        return response;
    } catch (error) {
        return error;
    }
})
