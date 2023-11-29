import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser, } from "react-icons/fa";
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import { FormControl, InputLabel, MenuItem, Select, Radio, RadioGroup, FormControlLabel, Box, TextField } from '@mui/material';
import { addPrescription } from "../../../api/userapi";
// for date picker
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from "react-router-dom";
import SuccessAlert from "../../../components/ui/User/Alerts/SuccessAlert";

export default function AddPrescriptionScreen() {

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleSuccess = () => {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000); 
      };

    // radio button, IPD 1 , 2 numbers
    const [pdType, setPDType] = useState('oneNumber');
    const [pdOneNumber, setPDOneNumber] = useState(null);
    // const [pdTwoNumber, setPDOneNumber] = useState(null);
    const [pdLeftNumber, setPDLeftNumber] = useState(null);
    const [pdRightNumber, setPDRightNumber] = useState(null);
    const [birthYear, setBirthYear] = useState(null);
    // form validation
    const [errorVisible, setErrorVisible] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const [prescriptionName, setPrescriptionName] = useState('')
    const [dateOfPrescription, setDateOfPrescription] = useState(dayjs().set('date', 1));
    const [prescriptionType, setPrescriptionType] = useState('')


    const [rightEye, setRightEye] = useState({
        SPH: "",
        CYL: "",
        Axis: "",
        Prism: "",
        Base: "",
    });

    const [leftEye, setLeftEye] = useState({
        SPH: "",
        CYL: "",
        Axis: "",
        Prism: "",
        Base: "",
    });

    const handleRightEyeChange = (field, value) => {
        setRightEye((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handleLeftEyeChange = (field, value) => {
        setLeftEye((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };


    const handlePDTypeChange = (event) => {
        setPDType(event.target.value);
    };


    const validateForm = () => {
        // Validating user input
        if ((pdType == 'oneNumber' && !pdOneNumber)
            || !birthYear || rightEye.SPH == "" || rightEye.CYL == "" || rightEye.Axis == ""
            || rightEye.Prism == "" || rightEye.Base == "" || leftEye.SPH == "" || leftEye.CYL == ""
            || leftEye.Axis == "" || leftEye.Prism == "" || leftEye.Base == "") {
            setErrorVisible(true)
            setErrorMsg('Please fill out all fields!');
            return false;
        }

        else if (pdType === 'twoNumbers' && (pdLeftNumber === null || pdRightNumber === null)) {
            setErrorVisible(true);
            setErrorMsg('Please fill out both Left and Right Pupillary Distance values!');
            return false;
        }
        else {
            setErrorMsg('');
            return true
        }
    }


    const handleSelections = async () => {

        const prescriptionData = {
            prescriptionName: prescriptionName,
            prescriptionType: prescriptionType,
            pdType: pdType,
            pdOneNumber: pdOneNumber,
            pdLeftNumber: pdLeftNumber,
            pdRightNumber: pdRightNumber,
            leftEyeOS: leftEye,
            rightEyeOD: rightEye,
            birthYear: birthYear,
            dateOfPrescription: dateOfPrescription.format("MM/DD/YYYY"),
        }
        try {
            const SendPrescription = await addPrescription(prescriptionData)
            console.log(SendPrescription)
            SuccessAlert()
        }
        catch (error) {
            console.log(error)
        }
    };

    const navigate = useNavigate();

        const HandleFindIpd = () => {
            navigate("/user/measure_ipd")
        }

        const SuccessAlert = () => {
            return(
                <SuccessAlert  showMessage={showSuccessMessage} onClose={() => setShowSuccessMessage(false)} />
            )
        }


    return (
        <div className="flex flex-col min-h-screen">
            <div className="p-5 mt-10  bg-white border border-gray-200 rounded-lg shadow w-[90%] mx-auto mb-10">
                <div className="w-[100%] md:w-[70%] lg:w-[60%] mx-auto mt-10 ">
                    <div class=" text-center mb-12" >
                        <h3 className="text-2xl sm:text-3xl  font-semibold font-sans">Add Prescription</h3>
                    </div>
                    <label for="firstname" className="block text-base font-semibold text-gray-800 font-sans">Precription Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser color='grey' />
                        </div>
                        <input id='first Name' className="block w-full pl-10 pr-3 borderblock px-4 py-3.5 mt-2  bg-white border rounded-md
                            focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out" placeholder="Enter prescription name" type="text"
                            value={prescriptionName} onChange={(e) => setPrescriptionName(e.target.value)} />
                    </div>
                    <div className="flex flex-row items-center space-x-20 mt-12">
                        <div className="flex-grow">
                            <div className="relative">
                            {/* Date picker */}
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                
                                    label="Date Of Prescription"
                                    value={dateOfPrescription}
                                    onChange={(newValue) => setDateOfPrescription(newValue)}
                                    renderInput={(params) => (
                                        <input
                                            {...params}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                            </div>
                        </div>
                        <div className="flex-grow">
                            {/* birt year */}
                            <div className='relative'>
                                <FormControl fullWidth>
                                    <InputLabel id="birthYear-label">Select Your Birth Year</InputLabel>
                                    <Select
                                        labelId="birthYear-label"
                                        id="birthYear"
                                        value={birthYear}
                                        label="Select Your Birth Year"
                                        size="small"
                                        border
                                        onChange={(e) => setBirthYear(parseInt(e.target.value))}
                                        className="h-12"
                                    >
                                        {Array.from({ length: 100 }, (_, index) => new Date().getFullYear() - index).map((year) => (
                                            <MenuItem key={year} value={year}>
                                                {year}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="text-lg font-sans font-bold mt-10">Pupilary Distance</p>


                        <span className="flex flex-row mt-3 items-center">
                            {/* IPD */}
                            <div className="">
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl component="fieldset">
                                        <RadioGroup row aria-label="pdType" name="pdType" value={pdType} onChange={handlePDTypeChange}>
                                            <FormControlLabel value="oneNumber" control={<Radio />} label="One Number" />
                                            <FormControlLabel value="twoNumbers" control={<Radio />} label="Two Numbers" />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>

                                {pdType === 'oneNumber' && (
                                    <div className='mt-5 mx-auto' >
                                        <FormControl fullWidth>
                                            <InputLabel id="pdOneNumber-label">Enter Your Pupillary Distance (One Number)</InputLabel>
                                            <Select
                                                labelId="pdOneNumber-label"
                                                id="pdOneNumber"
                                                value={pdOneNumber}
                                                className="h-12"
                                                label="Enter Your Pupillary Distance (One Number)"
                                                onChange={(e) => setPDOneNumber(parseFloat(e.target.value))}
                                            >
                                                {Array.from({ length: 45 }, (_, index) => 35 + index).map((number) => (
                                                    <MenuItem key={number} value={number}>
                                                        {number}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                )}

                                {pdType === 'twoNumbers' && (
                                    <div className='flex flex-row space-x-4 mt-5' >
                                        <FormControl fullWidth>
                                            <InputLabel id="pdLeftNumber-label">Left Pupillary Distance</InputLabel>
                                            <Select
                                                labelId="pdLeftNumber-label"
                                                id="pdLeftNumber"
                                                value={pdLeftNumber}
                                                className="h-12"
                                                label="Left Pupillary Distance"
                                                onChange={(e) => setPDLeftNumber(parseFloat(e.target.value))}
                                            >
                                                {Array.from({ length: 45 }, (_, index) => 17.5 + index * 0.5).map((number) => (
                                                    <MenuItem key={number} value={number}>
                                                        {number.toFixed(1)}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                        <FormControl fullWidth>
                                            <InputLabel id="pdRightNumber-label">Right Pupillary Distance</InputLabel>
                                            <Select
                                                labelId="pdRightNumber-label"
                                                id="pdRightNumber"
                                                value={pdRightNumber}
                                                className="h-12"
                                                label="Right Pupillary Distance"
                                                onChange={(e) => setPDRightNumber(parseFloat(e.target.value))}
                                            >
                                                {Array.from({ length: 45 }, (_, index) => 17.5 + index * 0.5).map((number) => (
                                                    <MenuItem key={number} value={number}>
                                                        {number.toFixed(1)}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                )}
                            </div>
                            <div class="ml-5 mt-10">
                                <p class="text-sm mb-1">Don't know your Pupillary Distance (PD)?</p>
                                <button onClick={() => HandleFindIpd()} class="px-4 py-2 rounded inline-flex items-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent">
                                    <span>Find your IPD</span>
                                </button>
                            </div>
                        </span>


                        <div className="w-72 mt-10 ">
                            <Box sx={{ minWidth: 120 }} className>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Prescription Type</InputLabel>
                                    <Select
                                        className="h-12"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={prescriptionType}
                                        label="Select Prescription Type"
                                        onChange={(e) => setPrescriptionType(e.target.value)}
                                    >
                                        <MenuItem value={10}>Single Vision</MenuItem>
                                        <MenuItem value={20}>Progressive</MenuItem>
                                        <MenuItem value={30}>Bifocals</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>

                        <p className="text-lg font-sans font-bold mt-10 mb-5">Right Eye - OD</p>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '12ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <TextField
                                    id="outlined-number"
                                    label="SPH"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        style: { height: 12 }
                                    }}
                                    onChange={(e) => handleRightEyeChange("SPH", e.target.value)}
                                />
                                <TextField
                                    id="outlined-number"
                                    label="CYL"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        style: { height: 12 }
                                    }}
                                    onChange={(e) => handleRightEyeChange("CYL", e.target.value)}
                                />
                                <TextField
                                    id="outlined-number"
                                    label="Axis"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        style: { height: 12 }
                                    }}
                                    onChange={(e) => handleRightEyeChange("Axis", e.target.value)}
                                />
                                <TextField
                                    id="outlined-number"
                                    label="Prism"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        style: { height: 12 }
                                    }}
                                    onChange={(e) => handleRightEyeChange("Prism", e.target.value)}
                                />
                                <TextField
                                    id="outlined-number"
                                    label="Base"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        style: { height: 12 }
                                    }}
                                    onChange={(e) => handleRightEyeChange("Base", e.target.value)}
                                />
                            </div>
                        </Box>

                        <p className="text-lg font-sans font-bold mt-10 mb-5">Left Eye - OD</p>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '12ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <TextField
                                    id="outlined-number"
                                    label="SPH"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        style: { height: 12 }
                                    }}
                                    onChange={(e) => handleLeftEyeChange("SPH", e.target.value)}
                                />
                                <TextField
                                    id="outlined-number"
                                    label="CYL"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        style: { height: 12 }
                                    }}
                                    onChange={(e) => handleLeftEyeChange("CYL", e.target.value)}
                                />
                                <TextField
                                    id="outlined-number"
                                    label="Axis"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        style: { height: 12 }
                                    }}
                                    onChange={(e) => handleLeftEyeChange("Axis", e.target.value)}
                                />
                                <TextField
                                    id="outlined-number"
                                    label="Prism"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        style: { height: 12 }
                                    }}
                                    onChange={(e) => handleLeftEyeChange("Prism", e.target.value)}
                                />
                                <TextField
                                    id="outlined-number"
                                    label="Base"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        style: { height: 12 }
                                    }}
                                    onChange={(e) => handleLeftEyeChange("Base", e.target.value)}
                                />
                            </div>
                        </Box>

                        {errorVisible &&
                            <p style={{ color: 'red', fontSize: 16, alignSelf: 'flex-start', marginTop: 2 }}>
                                {errorMsg}
                            </p>
                        }

                        <div className=" text-center mt-20 mb-10 ">
                            <button type="button" class=" w-36 sm:w-56 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4
                         focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Cancel</button>
                            <button onClick={() => {
                                if (!validateForm()) {
                                    return
                                } else {
                                    handleSelections()
                                }
                            }
                            }
                                type="button" class="w-36 sm:w-56 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
                         focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Save</button>
                        </div>


                    </div>


                </div>


            </div>

        </div >


    );
}

