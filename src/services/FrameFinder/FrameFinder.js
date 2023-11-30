import axios from "axios";
import { FRAME_FINDER_FLASK_SERVER_URL } from "../../config/config";

export const frameFinderPrediction = async (formData) => {
    try {
        const response = await axios.post(`${FRAME_FINDER_FLASK_SERVER_URL}/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        });

        return response;

    } catch (error) {
        console.error('Error while prediction', error.message);
        throw error;
    }
}

export const flaskServerTest = async () => {
    try {
        const response = await axios.get(`${FRAME_FINDER_FLASK_SERVER_URL}/test`);
        return response;

    } catch (error) {
        console.error("Error occured", error);
        throw error;
    }
}