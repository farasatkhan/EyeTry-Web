import { authenticatedAxiosInstance, } from '../../api/config';


export const getSupportTickets = async () => {
    try {
        const response = await authenticatedAxiosInstance.get('/support/tickets_user')
        return response?.data
    } catch (error) {
        throw error
    }
}

export const getSupportTicketById = async (id) => {
    try {
        const response = await authenticatedAxiosInstance.get(`/support/tickets_user/${id}`)
        return response?.data
    } catch (error) {
        throw error
    }
}


export const deleteSupportTicket = async (id) => {
    try {
        const response = await authenticatedAxiosInstance.delete(`/support/tickets/${id}`)
        return response?.data
    } catch (error) {
        throw error
    }
}


export const createSupportTicket = async (ticket) => {
    try {
        const response = await authenticatedAxiosInstance.post(`/support/ticket`, ticket)
        return response?.data
    } catch (error) {
        throw error
    }
}

