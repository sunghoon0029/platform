import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { oAuth2Login } from '../features/authSlice';

const OAuth2Redirect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('accessToken', token);

      dispatch(oAuth2Login(token));
      
      navigate('/');
    }
  }, [dispatch, navigate]);

  return (
    <div>
      Redirecting...
    </div>
  );
};

export default OAuth2Redirect;