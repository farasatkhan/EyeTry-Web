import axios from 'axios';

const baseURL = 'http://localhost:3000'

// Re Generating Access Token
export const reGenerateAccessToken = async () => {
  try {
    const refreshToken =await localStorage.getItem("refreshToken")
    const response = await axios.post(`${baseURL}/auth/token`, {
      token: refreshToken,
    });

    const newAccessToken = response.data.accessToken
    await localStorage.setItem('accessToken',newAccessToken)
    console.log('New Access Token',response.data)
    return response.data.accessToken 

  } 
  catch (error) {
    throw error
  }
};


export const registerUser = async (firstName, lastName, email, password, confirmPassword) => {
    try {
      const response = await axios.post(`${baseURL}/auth/register`, {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
        confirmpassword: confirmPassword,
      });
      return response;
    } 
    catch (error) {
      throw error;
    }
  };
  

export const signInUser = async (email,password) =>{
    try{
        const response = await axios.post(`${baseURL}/auth/login`,{
            email:email,
            password:password
        });
        console.log(response)
        return response;
        
    }
    catch (error){
      console.log("error")
        throw error
    }
}
  
export const logoutUser = async () =>{
  try{
      const refreshToken =await localStorage.getItem("refreshToken")
      const response = await axios.delete(`${baseURL}/auth/logout`,{
          token:refreshToken
      });
      console.log("Logging out",response)
      return response;
  }
  catch (error){
      throw error
  }
}


