import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { reGenerateAccessToken, logoutUser} from '../../api/authapi';

function PrivateRoute(props) {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken) {
      // No access token found, redirect to sign-in page
      navigate('/signin');
      return;
    }

    try {
      const decodedAccessToken = jwtDecode(accessToken);

      // Check if the access token has expired
      if (decodedAccessToken.exp < Date.now() / 1000) {
        if (!refreshToken) {
          // No refresh token found, redirect to sign-in page
          logoutUser();
        } else {
          // Attempt to regenerate the access token using the refresh token
          // Send a request to your server to exchange the refresh token for a new access token
          // If successful, update the access token in localStorage
          // If not successful, redirect to the sign-in page
          reGenerateAccessToken();
        }
      }
    } catch (error) {
      // If there's an error decoding the access token, redirect to sign-in page
      navigate('/signin');
    }
  }, []);


  const { Component } = props;

  return (
    <div>
      <Component />
    </div>
  );
}

export default PrivateRoute;
