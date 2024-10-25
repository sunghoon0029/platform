import { Box, Container, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../features/userSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.user);
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    dispatch(fetchProfile(accessToken));
  }, [dispatch, accessToken]);

  if (status === 'pending') {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>No user data avilable.</div>
  }

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Profile</Typography>
        <Typography variant="h6">이름: {user.name}</Typography>
        <Typography variant="h6">이메일: {user.email}</Typography>
      </Box>
    </Container>
  );
};

export default Profile;