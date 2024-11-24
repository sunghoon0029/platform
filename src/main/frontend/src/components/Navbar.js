import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/reducers/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOAuth2, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logout(isOAuth2)).unwrap();
      navigate('/');
    } catch (err) {
      console.error('로그아웃 실패:', err);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, textDecoration: 'none', color: "inherit" }}
          >
              MyApp
          </Typography>
          {isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/mypage">마이페이지</Button>
              <Button color="inherit" onClick={handleLogout}>로그아웃</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/signup">회원가입</Button>
              <Button color="inherit" component={Link} to="/login">로그인</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;