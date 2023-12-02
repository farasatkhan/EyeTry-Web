import { authenticatedAxiosInstance,unauthenticatedAxiosInstance } from '../../api/config';


export const getUserChats = async (id) => {
    try {
        const response = await authenticatedAxiosInstance.get(`/chat/${id}`)
        return response?.data
    } catch (error) {
        console.error(error)
    }
}

export const getMessages = async (id) =>{
    try{
        const response = await authenticatedAxiosInstance.get(`/message/${id}`)
        return response?.data
    }catch(e){
        console.error(e)
    }
}

export const addMessage = async (data) =>{
    try{
        const response = await authenticatedAxiosInstance.post('/message',data)
        return response?.data
    }catch(e){
        console.error(e)
    }
}

export const createChat = async (data) =>{
    try{
        const response = await authenticatedAxiosInstance.post('/chat',data)
        return response
    }catch(e){
        throw e 
    }
}
