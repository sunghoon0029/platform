import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
    'auth/login',
    async (body, { rejectWithValue }) => {
        try {
            const res = await axios.post('http://localhost:8080/auth/login', body);

            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (isOAuth2, { getState, dispatch, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const { accessToken, refreshToken } = auth;

            if (!isOAuth2) {
                await axios.post('http://localhost:8080/auth/logout', { accessToken, refreshToken });
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
    accessToken: null,
    refreshToken: null,
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
            state.refreshToken = null;
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
                state.refreshToken = action.payload.refreshToken;
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
                state.refreshToken = null;
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