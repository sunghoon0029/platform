import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Alert, Box, Button, MenuItem, TextField } from '@mui/material';

import { createBoard } from '../../store/reducers/boardSlice';

const CreateBoard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const boardType = searchParams.get('type');

    const accessToken = useSelector((state) => state.auth.accessToken);
    const { status, error } = useSelector((state) => state.board);

    const [body, setBody] = useState({
        title: "",
        contents: "",
        type: boardType ?? "",
    });

    const handleChange = (e) => {
        setBody({
            ...body,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!body.title.trim() || !body.contents.trim() || !body.type.trim()) {
            alert('게시글 유형, 제목, 내용을 입력해주세요.');
            return;
        }
        try {
            await dispatch(createBoard({ accessToken, body })).unwrap();
            navigate(`/${body.type.toLowerCase()}-board`);
        } catch (err) {
            console.error('게시글 작성 실패:', err);
        }
    };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
        {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
                {JSON.stringify(error)}
            </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
            <TextField
                select
                fullWidth
                name="type"
                label="게시판 선택"
                variant="outlined"
                value={body.type}
                onChange={handleChange}
                sx={{ mb: 2 }}
                disabled={!!boardType}
            >
                <MenuItem value="SALE">판매게시판</MenuItem>
                <MenuItem value="PURCHASE">구매게시판</MenuItem>
                <MenuItem value="FREE">자유게시판</MenuItem>
            </TextField>

            <TextField
                fullWidth
                name="title"
                label="제목"
                variant="outlined"
                value={body.title}
                onChange={handleChange}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                name="contents"
                label="내용"
                variant="outlined"
                multiline
                rows={4}
                value={body.contents}
                onChange={handleChange}
                sx={{ mb: 2 }}
            />
            <Box display="flex" justifyContent="flex-end">
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={status === 'pending'}
                >
                    {status === 'pending' ? '작성 중...' : '게시글 작성'}
                </Button>
            </Box>
        </Box>
    </Box>
  );
};

export default CreateBoard;