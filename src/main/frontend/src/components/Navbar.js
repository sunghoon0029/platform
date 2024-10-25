import React from 'react';
import { Link } from 'react-router-dom';

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const isOAuth2 = useSelector((state) => state.auth.isOAuth2);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = async () => {
    try {
      await dispatch(logout(isOAuth2)).unwrap();
    } catch (err) {
      console.error('로그아웃 실패:', err);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
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
              <Button color="inherit" component={Link} to="/profile">마이페이지</Button>
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