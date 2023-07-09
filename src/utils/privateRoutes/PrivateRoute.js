import React, { useEffect } from "react";
import {
    useNavigate
  } from "react-router-dom";


function PrivateRoute(props){
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('accessToken'); 
        if (!token) {
            navigate('/')
        }
    },[])

    const {Component} = props
    return(
        <div>
            <Component />
        </div>
    )
}

export default PrivateRoute;