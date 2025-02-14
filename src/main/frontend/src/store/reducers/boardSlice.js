import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createBoard = createAsyncThunk(
    'board/create',
    async ({ accessToken, body }, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                'http://localhost:8080/board/',
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

export const fetchBoards = createAsyncThunk(
    'board/fetchBoards',
    async ({ page, size, type }, { rejectWithValue }) => {
        try {
            const url = type
                ? `http://localhost:8080/board?page=${page}&size=${size}&type=${type}`
                : `http://localhost:8080/board?page=${page}&size=${size}`;

            const res = await axios.get(url);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const initialState = {
    boards: [],
    totalPages: 0,
    status: 'idle',
    error: null,
};

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createBoard.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(createBoard.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.boards.push(action.payload);
            })
            .addCase(createBoard.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchBoards.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchBoards.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.boards = action.payload.content;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchBoards.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default boardSlice.reducer;