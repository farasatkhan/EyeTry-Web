import { unauthenticatedAxiosInstance,authenticatedAxiosInstance } from '../../api/config';


// export const getUser = async (id) => {
//     try {
//         const response = await authenticatedAxiosInstance.get(`agent/view_agent_info/${id}`)
//         return response?.data
//     } catch (error) {
//         console.error(error)
//     }
// }

export const getUser = async (id) => {
    try {
        const response = await unauthenticatedAxiosInstance.get(`agent/view_agent_info/${id}`)
        return response?.data
    } catch (error) {
        console.error(error)
    }
}

