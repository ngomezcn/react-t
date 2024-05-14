import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getUsers as getUsersApi,
    deleteUsers as deleteUsersApi,
    getUserProfile as getUserProfileApi,
    addNewUser as addNewUserApi,
    updateUser as updateUserApi
} from "../../helpers/fakebackend_helper"
import { toast } from "react-toastify";

export const getUsers = createAsyncThunk("contacts/getUsers", async () => {

    try {
        const response = getUsersApi();
        return response;
    } catch (error) {
        return error;
    }
});

export const addNewUser = createAsyncThunk("ecommerence/addcustomer", async (customer: any) => {
    try {
        const response = addNewUserApi(customer);
        const data = await response;
        toast.success("Contact Added Successfully", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("Contact Added Failed", { autoClose: 2000 });
        return error;
    }
})

export const updateUser = createAsyncThunk("ecommerence/updatcustomer", async (customer: any) => {
    try {
        const response = updateUserApi(customer);
        const data = await response;
        toast.success("Contact Updated Successfully", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("Contact Updated Failed", { autoClose: 2000 });
        return error
    }
})

export const deleteUsers = createAsyncThunk("contacts/deleteUsers", async (users: any) => {
    try {
        const response = deleteUsersApi(users);
        toast.success("Contact Deleted Successfully", { autoClose: 2000 });
        return response;
    } catch (error) {
        toast.error("Contact Deleted Failed", { autoClose: 2000 });
        return error;
    }
})

export const getUserProfile = createAsyncThunk("contacts/getUserProfile", async () => {
    try {
        const response = getUserProfileApi();
        return response;
    } catch (error) {
        return error;
    }
})
