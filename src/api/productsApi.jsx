import axios from './axiosConfig';
import { reGenerateAccessToken } from './authapi';


// View Products List
export const viewProductsList = async () => {
    try {
        const accessToken = await localStorage.getItem("accessToken")
        const response = await axios.get('/products/v1/glasses', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        // console.log("Response ", response?.data || "Not Modified 304 ")
        return response?.data;
    }
    catch (error) {
        // Server is returning 403 for expired token
        if (error.response && error.response.status == 403) {
            try {
                console.log("Error Catched")
                await reGenerateAccessToken()
                return viewProfileImage()
            }
            catch (e) {
                console.error("Error while refreshing token", e)
                throw e
            }
        }
        throw error;
    }
};

// View new arrivals Products List
export const viewNewArrivals = async () => {
    try {
        const accessToken = await localStorage.getItem("accessToken")
        const response = await axios.get('/products/v1/glasses/newArrivals', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log("Response ", response?.data || "Not Modified 304 ")
        return response?.data;
    }
    catch (error) {
        // Server is returning 403 for expired token
        if (error.response && error.response.status == 403) {
            try {
                console.log("Error Catched")
                await reGenerateAccessToken()
                return viewProfileImage()
            }
            catch (e) {
                console.error("Error while refreshing token", e)
                throw e
            }
        }
        throw error;
    }
};

// View Specific product
export const viewParticularProduct = async (glassesId) => {
    try {
        const accessToken = await localStorage.getItem("accessToken")
        const response = await axios.get(`/products/v1/glasses/${glassesId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        // console.log("Response ", response?.data || "Not Modified 304 ")
        return response?.data;
    }
    catch (error) {
        // Server is returning 403 for expired token
        if (error.response && error.response.status == 403) {
            try {
                console.log("Error Catched")
                await reGenerateAccessToken()
                return viewProfileImage()
            }
            catch (e) {
                console.error("Error while refreshing token", e)
                throw e
            }
        }
        throw error;
    }
};

export const checkout = async (orderData) => {
    const data = orderData
    try {
        const accessToken = await localStorage.getItem("accessToken")
        const response = await axios.post('products/v1/order/checkout', data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });
        console.log("Response :", response)
        return response;
    }
    catch (error) {
        // Server is returning 403 for expired token
        if (error.response && error.response.status == 403) {
            try {
                console.log("Error Catched")
                await reGenerateAccessToken()
                return checkout(data)
            }
            catch (e) {
                console.error("Error while refreshing token", e)
                throw e
            }
        }
        throw error;
    }
};

// add user review

export const viewAllReviews = async (productId) => {

    try {
        const accessToken = await localStorage.getItem("accessToken")
        const response = await axios.get(`products/v1/reviews/viewAllReviews/${productId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });
        // console.log("Response :", response)
        return response;
    }
    catch (error) {
        // Server is returning 403 for expired token
        if (error.response && error.response.status == 403) {
            try {
                console.log("Error Catched")
                await reGenerateAccessToken()
                return viewAllReviews()
            }
            catch (e) {
                console.error("Error while refreshing token", e)
                throw e
            }
        }
        throw error;
    }
};


// add user review
export const addReview = async (reviewData) => {
    const data = reviewData
    try {
        const accessToken = await localStorage.getItem("accessToken")
        const response = await axios.post('products/v1/reviews/addReview', data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });
        console.log("Response :", response)
        return response;
    }
    catch (error) {
        // Server is returning 403 for expired token
        if (error.response && error.response.status == 403) {
            try {
                console.log("Error Catched")
                await reGenerateAccessToken()
                return addReview(data)
            }
            catch (e) {
                console.error("Error while refreshing token", e)
                throw e
            }
        }
        throw error;
    }
};
// View All orders
export const viewAllOrders = async (userId) => {
    try {
        const accessToken = await localStorage.getItem("accessToken")
        const response = await axios.get(`products/v1/order/viewAllOrders/${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });
        // console.log("Response :", response.data)
        return response;
    }
    catch (error) {
        // Server is returning 403 for expired token
        if (error.response && error.response.status == 403) {
            try {
                console.log("Error Catched")
                await reGenerateAccessToken()
                return viewAllOrders()
            }
            catch (e) {
                console.error("Error while refreshing token", e)
                throw e
            }
        }
        throw error;
    }
};


// get stripe key
export const getStripeApiKey = async () => {
    try {
        const accessToken = await localStorage.getItem("accessToken")
        const response = await axios.get('payment/stripe_api_key', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });
        // console.log("Response :", response.data)
        return response;
    }
    catch (error) {
        // Server is returning 403 for expired token
        if (error.response && error.response.status == 403) {
            try {
                console.log("Error Catched")
                await reGenerateAccessToken()
                return getStripeApiKey()
            }
            catch (e) {
                console.error("Error while refreshing token", e)
                throw e
            }
        }
        throw error;
    }
};
// 
export const processPayment = async () => {
    try {
        const accessToken = await localStorage.getItem("accessToken")
        const response = await axios.post('payment/process_payment', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });
        // console.log("Response :", response.data)
        return response;
    }
    catch (error) {
        // Server is returning 403 for expired token
        if (error.response && error.response.status == 403) {
            try {
                console.log("Error Catched")
                await reGenerateAccessToken()
                return processPayment()
            }
            catch (e) {
                console.error("Error while refreshing token", e)
                throw e
            }
        }
        throw error;
    }
};

// view all giftcards

export const getGiftcart = async (coupen) => {
    try {
        const accessToken = await localStorage.getItem("accessToken")
        const response = await axios.get(`products/v1/order/getGiftcard/${coupen}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });
        console.log("Response :", response.data)
        return response.data;
    }
    catch (error) {
        // Server is returning 403 for expired token
        if (error.response && error.response.status == 403) {
            try {
                console.log("Error Catched")
                await reGenerateAccessToken()
                return viewAllGiftcards()
            }
            catch (e) {
                console.error("Error while refreshing token", e)
                throw e
            }
        }
        throw error;
    }
};
