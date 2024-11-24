import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, TextField, Typography } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../store/reducers/userSlice';

const Password = () => {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [body, setBody] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setBody({
            ...body,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (body.newPassword !== body.confirmPassword) {
            setError('새 비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            await dispatch(updatePassword({
                accessToken,
                currentPassword: body.currentPassword,
                newPassword: body.newPassword
            })).unwrap();
            navigate('/mypage');
        } catch (err) {
            setError('비밀번호 변경 실패');
            console.error(err);
        }
    };

  return (
    <Box sx={{ mt: 4 }}>
        <Typography variant="h6">비밀번호 변경</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
                label="현재 비밀번호"
                name="currentPassword"
                type="password"
                value={body.currentPassword}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
            />
            <TextField
                label="새 비밀번호"
                name="newPassword"
                type="password"
                value={body.newPassword}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
            />
            <TextField
                label="새 비밀번호 확인"
                name="confirmPassword"
                type="password"
                value={body.confirmPassword}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button type="submit" color="primary">
                비밀번호 변경
            </Button>
        </Box>
    </Box>
  );
};

export default Password;