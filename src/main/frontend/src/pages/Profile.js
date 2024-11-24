import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfile } from '../store/reducers/userSlice';


const Profile = () => {
  const dispatch = useDispatch();
  const { status, user, error } = useSelector((state) => state.user);
  const { isOAuth2, accessToken } = useSelector((state) => state.auth);
  const [body, setBody] = useState({
    name: user.name,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchProfile(accessToken));
    }
  }, [dispatch, accessToken]);

  const handleChange = (e) => {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateProfile({ accessToken, body })).unwrap();
      await dispatch(fetchProfile(accessToken)).unwrap();
      navigate('/mypage');
    } catch (err) {
      console.error("프로필 업데이트 실패:", err);
    }
  };

  const handleEditPassword = () => {
    navigate('/password-edit');
  }

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        {status === 'pending' && <CircularProgress />}
        {status === 'succeeded' && user && (
          <>
            <Typography variant="h6">프로필 관리</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                id="name"
                name="name"
                label="이름"
                value={body.name}
                onChange={handleChange}
                fullWidth
              />
              <Button type="submit">
                프로필 수정
              </Button>
              {!isOAuth2 && (
                <Button onClick={handleEditPassword}>
                  비밀번호 관리
                </Button>
              )}
            </Box>
          </>
        )}
        {status === 'failed' && <div>Error: {error?.message || JSON.stringify(error)}</div>}
      </Box>
    </Container>
  );
};

export default Profile;