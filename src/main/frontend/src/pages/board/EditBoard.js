import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, TextField } from '@mui/material';

import { fetchBoardDetail, updateBoard } from '../../store/reducers/boardSlice';

const EditBoard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { board } = useSelector((state) => state.board);

    const [body, setBody] = useState({
        title: "",
        contents: "",
    });

    useEffect(() => {
        dispatch(fetchBoardDetail(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (board) {
            setBody({
                title: board.title,
                contents: board.contents,
            });
        }
    }, [board]);

    const handleChange = (e) => {
        setBody({
            ...body,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateBoard({ id, body })).unwrap();
            navigate(`/board/${id}`);
        } catch (err) {
            console.error("게시글 업데이트 실패:", err);
        }
    };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
        <Box component="form" onSubmit={handleSubmit}>
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
                    variant="outlined"
                    color="primary"
                >
                    수정
                </Button>
            </Box>
        </Box>
    </Box>
    
  )
};

export default EditBoard;