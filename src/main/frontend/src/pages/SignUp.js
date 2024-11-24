import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, Box, Button, Container, TextField, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

import { useDispatch, useSelector } from 'react-redux';
import { reset, signup } from '../store/reducers/userSlice';

const SignUp = () => {
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.user);
    const [body, setBody] = useState({
        name: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setBody({
            ...body,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(signup(body)).unwrap();
            navigate('/login');
        } catch (err) {
            console.error('회원가입 실패:', err);
        }
    };

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

  return (
    <Container component="main" maxWidth="xs">
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <PersonIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                회원가입
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    id="name"
                    name="name"
                    label="이름"
                    type="text"
                    value={body.name}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    autoComplete="name"
                />
                <TextField
                    id="email"
                    name="email"
                    label="이메일"
                    type="email"
                    value={body.email}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    autoComplete="email"
                />
                <TextField
                    id="password"
                    name="password"
                    label="비밀번호"
                    type="password"
                    value={body.password}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    autoComplete="current-password"
                />
                {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {error.message || '회원가입 실패'}
                    </Typography>
                )}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={status === 'pending'}
                >
                    {status === 'pending' ? '가입 중...' : '회원가입'}
                </Button>
            </Box>
        </Box>
    </Container>
  );
};

export default SignUp;