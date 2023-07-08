import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    useNavigate
  } from "react-router-dom";

  const isAuthenticated = () => {
    // Check if the user is authenticated (e.g., check JWT token)
    // Return true if authenticated, false otherwise
    // You can implement your own logic here
    const token = localStorage.getItem('accessToken'); 
    return token !== null; // Return true if the token exists, false otherwise
  };
  

// const PrivateRoute = ({ element: Element, ...rest }) => {
//   return (
//     <Routes>
//     <Route
//       {...rest}
//       element={isAuthenticated() ? (
//         <Element />
//       ) : (
//         <Navigate to="/" replace={true} />
//       )}
//     />
//     </Routes>
//   );
// };

function PrivateRoute(props){
    console.log("check 2 running")
    const navigate = useNavigate();
    
    React.useEffect(() => {
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