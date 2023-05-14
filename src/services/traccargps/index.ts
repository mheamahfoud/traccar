import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const token: string = localStorage.getItem('kt-auth-react-v') ?? JSON.stringify("");
const API_URL = process.env.REACT_APP_API_URL
export const GetCurrentDevice: any = createAsyncThunk(
    "device",
    async (thunkAPI: any) => {
        try {

            const res = await axios.post(API_URL+ '/my_path')
            if (!res.data.error_code) {
                return res.data.data;
            }
            else {
                return thunkAPI.rejectWithValue(res.data.error_description)
            }
        }
        catch {
            thunkAPI.rejectWithValue('There is Error');
        }

    }
);
export const GetPageTimes: any = createAsyncThunk(
    "pageTime",
    async (thunkAPI: any) => {
        try {

            const res = await axios.post(API_URL+ '/page')
            if (!res.data.error_code) {
                return res.data.data;
            }
            else {
                return thunkAPI.rejectWithValue(res.data.error_description)
            }
        }
        catch {
            thunkAPI.rejectWithValue('There is Error');
        }

    }
);