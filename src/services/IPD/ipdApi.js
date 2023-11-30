import axios from 'axios';


const flaskAPIURL = 'http://localhost:5001'
// Send User Image to IPD Measurement EndPoint

// export const sendImageToIPDServer = async (file) => {
//     console.log("Image File ", file)
//     const img = file.assets[0]
//     // Create a form data object
//     const formData = new FormData();
//     // Append the image data to the form data
//     formData.append('userImage', {
//         uri: Platform.OS === 'android' ? img.uri : img.uri.replace('file://', ''),
//         type: img.type,
//         name: img.fileName,
//     });
//     try {
//         const response = await axios.post(`${flaskAPIURL}/measure_ipd`, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             },
//         })
//         // Server would only return ipd_in_mm for successfull request resolution for all other cases it would return an error
//         return response
//     }
//     catch (e) {
//         throw e
//     }
// }

// upload profile picture
export const sendImageToIPDServer = async (selectedImage) => {
    try {
        const formData = new FormData();
        formData.append('userImage', selectedImage);
        const response = await axios.post(`${flaskAPIURL}/measure_ipd`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response);
        return response
    }    catch (e) {
        throw e
    }
}

export const getArucoMarkerPdf = async () => {
    try {
        const response = await axios.get(`${flaskAPIURL}/aruco_marker`)
        return response
    }
    catch (e) {
        console.error(e)
    }
}
