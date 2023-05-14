import axios from 'axios';
const baseURL = 'http://localhost:3000'

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
        return response;
    }
    catch (error){
        throw error
    }
}
  