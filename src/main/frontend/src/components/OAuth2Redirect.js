import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { oAuth2Login } from '../store/reducers/authSlice';

const OAuth2Redirect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
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