import axios from 'axios';
import { reGenerateAccessToken } from './authapi';


const baseURL = 'http://localhost:3000'


// Getting user data 
export const getUserData = async () => {
    try {
        const accessToken =await localStorage.getItem("accessToken")
        const response = await axios.get(`${baseURL}/users/profile`, {
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
        });
        return response.data;
    } 
    catch (error) {
        // Server is returning 403 for expired token
        if (error.response && error.response.status == 403){
            try{
                console.log("Error Catched")
                await reGenerateAccessToken()
                return getUserData()
            }
            catch (e){
                console.error("Error while refreshing token",e)
                throw e
            }
        }
        throw error
    }
  };

// Updating User Data

export const updateUserData = async (updateData) =>{
    const data = updateData
    try {
        const accessToken = await localStorage.getItem("accessToken")
        const response = await axios.post(`${baseURL}/users/update_info`,data,{
            headers:{
                Authorization:`Bearer ${accessToken}`
            },
        })

        const token = response.data.accessToken
        const refreshToken = response.data.refreshToken
        const user = response.data.user

        await localStorage.setItem('user',JSON.stringify(user))
        await localStorage.setItem('accessToken',token)
        await localStorage.setItem('refreshToken',refreshToken)
        return response.status
    }
    catch (error){
          // Server is returning 403 for expired token
          if (error.response && error.response.status == 403){
            try{
                console.log("Error Catched")
                await reGenerateAccessToken()
                return updateUserData(data)
            }
            catch (e){
                console.error("Error while refreshing token",e)
                throw e
            }
        }
        throw error
    }
}

// Change Password
export const changePassword = async (passwordData) => {
    const data = passwordData
    try {
        const accessToken =await localStorage.getItem("accessToken")
        const response = await axios.post(`${baseURL}/users/change_password`,data, {
        headers:{
            Authorization:`Bearer ${accessToken}`
        },
        });
        return response;
    } 
    catch (error) {
          // Server is returning 403 for expired token
          if (error.response && error.response.status == 403){
            try{
                console.log("Error Catched")
                await reGenerateAccessToken()
                return changePassword(data)
            }
            catch (e){
                console.error("Error while refreshing token",e)
                throw e
            }
        }
      throw error;
    }
  };

//   Delete Account
export const deleteAccount = async (passwordData) => {
    const currentPassword = passwordData

    try {
        const refreshToken =await localStorage.getItem("refreshToken")
        const accessToken =await localStorage.getItem("accessToken")
        const data = {
            currentPassword:currentPassword,
            refreshToken:refreshToken
        }
        const response = await axios.post(`${baseURL}/users/delete_account`,data, {
        headers:{
            Authorization:`Bearer ${accessToken}`
        },
        });
        return response;
    } 
    catch (error) {
          // Server is returning 403 for expired token
          if (error.response && error.response.status == 403){
            try{
                console.log("Error Catched")
                await reGenerateAccessToken()
                return deleteAccount(currentPassword)
            }
            catch (e){
                console.error("Error while refreshing token",e)
                throw e
            }
        }
      throw error;
    }
  };
  
// Adding Address
export const addAddress = async (addressData) => {
    const data = addressData
    try {
        const accessToken =await localStorage.getItem("accessToken")
        const response = await axios.post(`${baseURL}/users/add_address`,data, {
        headers:{
            Authorization:`Bearer ${accessToken}`
        },
        });
        console.log("Response :",response)
        return response;
    } 
    catch (error) {
        // Server is returning 403 for expired token
        if (error.response && error.response.status == 403){
        try{
            console.log("Error Catched")
            await reGenerateAccessToken()
            return addAddress(data)
        }
        catch (e){
            console.error("Error while refreshing token",e)
            throw e
        }
    }
      throw error;
    }
  };

// Return a specific Address 
export const getSpecificAddress = async (id) => {
    const addressId = id
    try {
        const accessToken =await localStorage.getItem("accessToken")
        const response = await axios.get(`${baseURL}/users/view_address/${addressId}`, {
        headers:{
            Authorization:`Bearer ${accessToken}`
        },
        });
        console.log("View Specific Address :",response.data.addressBook)
        return response.data.addressBook;
    } 
    catch (error) {
        // Server is returning 403 for expired token
        if (error.response && error.response.status == 403){
        try{
            console.log("Access Token Expired Trying to refresh it")
            await reGenerateAccessToken()
            return getSpecificAddress(addressId)
        }
        catch (e){
            console.log("Refresh Error")
            if(e.response && e.response.status == 403){
                console.log("Refresh Token is also expired logging out the user")
                return e.response.status
            }
            throw e
        }
    }
      throw error;
    }
  };

// Update Address 

export const updateAddress = async (data,id) => {
    const addressId = id
    const addressData = data
    console.log('Data ; ',data)
    console.log('id ; ',id)
    try {
        const accessToken =await localStorage.getItem("accessToken")
        const response = await axios.put(`${baseURL}/users/update_address/${addressId}`, addressData,{
        headers:{
            Authorization:`Bearer ${accessToken}`
        },
        });
        console.log("Update Address Response :",response)
        return response;
    } 
    catch (error) {
        // Server is returning 403 for expired token
        if (error.response && error.response.status == 403){
        try{
            console.log("Access Token Expired Trying to refresh it")
            await reGenerateAccessToken()
            return updateAddress(addressData,addressId)
        }
        catch (e){
            console.log("Refresh Error")
            if(e.response && e.response.status == 403){
                console.log("Refresh Token is also expired logging out the user")
                return e.response.status
            }
            throw e
        }
    }
      throw error;
    }
  };

// Delete Address
export const deleteAddress = async (id) => {
    const addressId = id
    try {
        const accessToken =await localStorage.getItem("accessToken")
        const response = await axios.delete(`${baseURL}/users/delete_address/${addressId}`, {
        headers:{
            Authorization:`Bearer ${accessToken}`
        },
        });
        console.log("Delete Address Response :",response)
        return response;
    } 
    catch (error) {
        // Server is returning 403 for expired token
        if (error.response && error.response.status == 403){
        try{
            console.log("Access Token Expired Trying to refresh it")
            await reGenerateAccessToken()
            return deleteAddress(addressId)
        }
        catch (e){
            console.log("Refresh Error")
            if(e.response && e.response.status == 403){
                console.log("Refresh Token is also expired logging out the user")
                return e.response.status
            }
            throw e
        }
    }
      throw error;
    }
  };



  // Adding Payment
export const addPayment = async (paymentMethodData) => {
    const data = paymentMethodData
    try {
        const accessToken =await localStorage.getItem("accessToken")
        const response = await axios.post(`${baseURL}/users/add_payment`,data, {
        headers:{
            Authorization:`Bearer ${accessToken}`
        },
        });
        console.log("Response :",response)
        return response;
    } 
    catch (error) {
        // Server is returning 403 for expired token
        if (error.response && error.response.status == 403){
        try{
            console.log("Error Catched")
            await reGenerateAccessToken()
            return addPayment(data)
        }
        catch (e){
            console.error("Error while refreshing token",e)
            throw e
        }
    }
      throw error;
    }
  };


  // View All Payments
 
  export const viewAllPayments = async () => {
    try {
        const accessToken =await localStorage.getItem("accessToken")
        const response = await axios.get(`${baseURL}/users/view_payments`,{
        headers:{
            Authorization:`Bearer ${accessToken}`
        },
        });
        console.log("All Payments ",response?.data)
        return response?.data; // incase server return 304 
    } 
    catch (error) {
        // Server is returning 403 for expired token
        console.log("Access Token Expired ... Renewing")
        if (error.response && error.response.status == 403){
        try{
            console.log("Error Catched")
            await reGenerateAccessToken()
            return viewAllPayments()
        }
        catch (e){
            console.error("Error while refreshing token",e)
            throw e
        }
    }
      throw error;
    }
  };

  // Delete Address
export const deletePaymentMethod = async (id) => {
    const paymentId = id
    try {
        const accessToken =await localStorage.getItem("accessToken")
        const response = await axios.delete(`${baseURL}/users/delete_payment/${paymentId}`, {
        headers:{
            Authorization:`Bearer ${accessToken}`
        },
        });
        console.log("Delete Payment Response :",response)
        return response;
    } 
    catch (error) {
        // Server is returning 403 for expired token
        if (error.response && error.response.status == 403){
        try{
            console.log("Access Token Expired Trying to refresh it")
            await reGenerateAccessToken()
            return deletePaymentMethod(paymentId)
        }
        catch (e){
            console.log("Refresh Error")
            if(e.response && e.response.status == 403){
                console.log("Refresh Token is also expired logging out the user")
                return e.response.status
            }
            throw e
        }
    }
      throw error;
    }
  };

  // Update Payment Method 

export const updatePaymentMethod = async (data,id) => {
    const paymentId = id
    const paymentData = data
    console.log('Payment Data : ',data)
    console.log('payment id : ',id)
    try {
        const accessToken =await localStorage.getItem("accessToken")
        const response = await axios.put(`${baseURL}/users/update_payment/${paymentId}`, paymentData,{
        headers:{
            Authorization:`Bearer ${accessToken}`
        },
        });
        console.log("Update Address Response :",response)
        return response;
    } 
    catch (error) {
        // Server is returning 403 for expired token
        if (error.response && error.response.status == 403){
        try{
            console.log("Access Token Expired Trying to refresh it")
            await reGenerateAccessToken()
            return updatePaymentMethod(paymentData,paymentId)
        }
        catch (e){
            console.log("Refresh Error")
            if(e.response && e.response.status == 403){
                console.log("Refresh Token is also expired logging out the user")
                return e.response.status
            }
            throw e
        }
    }
      throw error;
    }
  };

  // Return a specific Address 
export const viewSpecificPaymentMethod = async (id) => {
    const paymentMethod = id
    
    try {
        const accessToken =await localStorage.getItem("accessToken")
        const response = await axios.get(`${baseURL}/users/view_payment/${paymentMethod}`, {
        headers:{
            Authorization:`Bearer ${accessToken}`
        },
        });
        console.log("View Specific Payment Method  :",response?.data || "Not Modified 304 ")
        return response?.data;
    } 
    catch (error) {
        // Server is returning 403 for expired token
        if (error.response && error.response.status == 403){
        try{
            console.log("Access Token Expired Trying to refresh it")
            await reGenerateAccessToken()
            return viewSpecificPaymentMethod(paymentMethod)
        }
        catch (e){
            console.log("Refresh Error")
            if(e.response && e.response.status == 403){
                console.log("Refresh Token is also expired logging out the user")
                return e.response.status
            }
            throw e
        }
    }
      throw error;
    }
  };

