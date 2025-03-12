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

export const fetchBoardDetail = createAsyncThunk(
    'board/fetchBoardDetail',
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`http://localhost:8080/board/${id}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const incrementView = createAsyncThunk(
    'board/incrementView',
    async (id, { rejectWithValue }) => {
        try {
            await axios.post(`http://localhost:8080/board/${id}/increment-view`);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateBoard = createAsyncThunk(
    'board/updateBoard',
    async ({ id, body }, { rejectWithValue }) => {
        try {
            await axios.put(
                `http://localhost:8080/board/${id}`,
                body,
            );
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteBoard = createAsyncThunk(
    'board/deleteBoard',
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.delete(`http://localhost:8080/board/${id}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const initialState = {
    boards: [],
    board: null,
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
            })
            .addCase(fetchBoardDetail.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchBoardDetail.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.board = action.payload;
            })
            .addCase(fetchBoardDetail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(incrementView.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(incrementView.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateBoard.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(updateBoard.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.board = action.payload;
            })
            .addCase(updateBoard.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteBoard.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(deleteBoard.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.boards = state.boards.filter((board) => board.id !== action.meta.arg);
                state.board = null;
            })
            .addCase(deleteBoard.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default boardSlice.reducer;