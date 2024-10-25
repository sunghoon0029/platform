import React from 'react';
import { Box, Button } from '@mui/material';

const OAuth2Login = () => {
    const handleNaverLogin = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/naver';
    };

    const handleKakaoLogin = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';
    };

  return (
    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Button
            variant="contained"
            fullWidth
            onClick={handleNaverLogin}
            sx={{
                backgroundColor: '#03C75A',
                color: '#fff',
                '&:hover': { backgroundColor: '#02B24A' },
                marginRight: 1,
            }}
        >
            네이버 로그인
        </Button>
        <Button
            variant="contained"
            fullWidth
            onClick={handleKakaoLogin}
            sx={{
                backgroundColor: '#FEE500',
                color: '#000',
                '&:hover': { backgroundColor: '#FFD700' },
                marginLeft: 1,
            }}
        >
            카카오 로그인
        </Button>
    </Box>
  );
};

export default OAuth2Login;