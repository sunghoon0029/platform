import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
    'auth/login',
    async (body, { rejectWithValue }) => {
        try {
            const res = await axios.post('http://localhost:8080/auth/login', body);
            const { accessToken, refreshToken } = res.data;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async(isOAuth2, { rejectWithValue, dispatch }) => {
        try {
            if (!isOAuth2) {
                const accessToken = localStorage.getItem('accessToken');
                const refreshToken = localStorage.getItem('refreshToken');

                await axios.post('http://localhost:8080/auth/logout', { accessToken, refreshToken });

                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            } else {
                localStorage.removeItem('accessToken');
            }

            dispatch(reset());
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const initialState = {
    isOAuth2: false,
    isAuthenticated: false,
    accessToken: localStorage.getItem('accessToken') || null,
    status: 'idle',
    error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isOAuth2 = false;
            state.isAuthenticated = false;
            state.accessToken = null;
            state.status = 'idle';
            state.error = null;
        },
        oAuth2Login: (state, action) => {
            state.isOAuth2 = true;
            state.isAuthenticated = true;
            state.accessToken = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuthenticated = true;
                state.accessToken = action.payload.accessToken;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.status = 'idle';
                state.isOAuth2 = false;
                state.isAuthenticated = false;
                state.accessToken = null;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { reset, oAuth2Login } = authSlice.actions;
export default authSlice.reducer;