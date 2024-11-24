import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const signup = createAsyncThunk(
    'user/signup',
    async (body, { rejectWithValue }) => {
        try {
            const res = await axios.post('http://localhost:8080/user/signup', body);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const fetchProfile = createAsyncThunk(
    'user/fetchProfile',
    async (accessToken, { rejectWithValue }) => {
        try {
            const res = await axios.get('http://localhost:8080/user/profile', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async ({ accessToken, body }, { rejectWithValue }) => {
        try {
            const res = await axios.put(
                'http://localhost:8080/user/profile',
                body,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updatePassword = createAsyncThunk(
    'user/updatePassword',
    async ({ accessToken, currentPassword, newPassword }, { rejectWithValue }) => {
        try {
            const res = await axios.put(
                'http://localhost:8080/user/password',
                { currentPassword, newPassword },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (accessToken, { rejectWithValue }) => {
        try {
            const res = await axios.delete('http://localhost:8080/user/delete', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const initialState = {
    user: null,
    status: 'idle',
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(signup.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchProfile.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateProfile.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updatePassword.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(updatePassword.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.status = 'succeeded';
                state.user = null;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;