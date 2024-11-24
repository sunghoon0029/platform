import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, CircularProgress, Container, Typography } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, fetchProfile } from '../store/reducers/userSlice';
import { logout } from '../store/reducers/authSlice';

const MyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOAuth2, accessToken } = useSelector((state) => state.auth);
  const { status, user, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchProfile(accessToken));
    }
  }, [dispatch, accessToken]);

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("정말 탈퇴 하시겠습니까?");
    
    if (confirmDelete) {
      try {
        await dispatch(deleteUser(accessToken)).unwrap();
        await dispatch(logout(isOAuth2)).unwrap();
        navigate('/');
      } catch (err) {
        console.error('회원 탈퇴 실패:', err);
      }
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        {status === 'pending' && <CircularProgress />}
        {status === 'succeeded' && user && (
          <>
            <Typography variant="h6">이름: {user.name}</Typography>
            <Typography variant="h6">이메일: {user.email}</Typography>
            <Button onClick={handleProfile}>프로필 관리</Button>
            <Button color="error" onClick={handleDelete}>
              회원 탈퇴
            </Button>
          </>
        )}
        {status === 'failed' && <div>Error: {error?.message || JSON.stringify(error)}</div>}
      </Box>
    </Container>
  );
};

export default MyPage;