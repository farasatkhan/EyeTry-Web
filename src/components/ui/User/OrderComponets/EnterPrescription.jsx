import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, Radio, RadioGroup, FormControlLabel, Box, TextField } from '@mui/material';
import { useDispatch } from "react-redux";
import { updateSelectedOptions } from "../../../../redux/actions/orderSelectionAction";

export default function SelectLensTypeComponentProp({ onSelectedOptions, onNextStep }) {
    // radio button, IPD 1 , 2 numbers
    const [pdType, setPDType] = useState('oneNumber');
    const [pdOneNumber, setPDOneNumber] = useState(null);
    // const [pdTwoNumber, setPDOneNumber] = useState(null);
    const [pdLeftNumber, setPDLeftNumber] = useState(null);
    const [pdRightNumber, setPDRightNumber] = useState(null);
    const [birthYear, setBirthYear] = useState(null);

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

    const dispatch = useDispatch();

    const handleSelections = () => {
        dispatch(updateSelectedOptions({
            "prescription": {
                pdType: pdType,
                pdOneNumber: pdOneNumber,
                pdLeftNumber: pdLeftNumber,
                pdRightNumber: pdRightNumber,
                rightEye: rightEye,
                leftEye: leftEye,
                birthYear: birthYear
            }
        }));
    }

    const handleNext = () => {
        onNextStep();
    }

    return (
        <div className="mx-auto" >

            <h1 className="font-sans font-semibold text-2xl mx-auto">Enter Prescription Details</h1>

            <div className="mx-auto ">
                {/* IPD */}
                <div className="w-[85%] mx-auto">
                    <p className="text-lg font-sans font-semibold mt-4">Pupilary Distance</p>
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

                <div className="flex-col flex justify-center items-center">
                    <div>
                        <p className="text-lg font-sans font-semibold mt-10 mb-3">Right Eye - OD</p>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '10ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div className="">
                                <TextField
                                    label="SPH"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        style: { height: 20 }
                                    }}
                                    value={rightEye.SPH}
                                    onChange={(e) => handleRightEyeChange("SPH", e.target.value)}
                                />
                                <TextField
                                    label="CYL"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        style: { height: 20 }
                                    }}
                                    value={rightEye.CYL}
                                    onChange={(e) => handleRightEyeChange("CYL", e.target.value)}
                                />
                                <TextField
                                    label="Axis"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        style: { height: 20 }
                                    }}
                                    value={rightEye.Axis}
                                    onChange={(e) => handleRightEyeChange("Axis", e.target.value)}
                                />
                                <TextField
                                    label="Prism"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        style: { height: 20 }
                                    }}
                                    value={rightEye.Prism}
                                    onChange={(e) => handleRightEyeChange("Prism", e.target.value)}
                                />
                                <TextField
                                    label="Base"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        style: { height: 20 }
                                    }}
                                    value={rightEye.Base}
                                    onChange={(e) => handleRightEyeChange("Base", e.target.value)}
                                />
                            </div>
                        </Box>
                    </div>

                    <div>
                        <p className="text-lg font-sans font-semibold mt-6 mb-3">Left Eye - OS</p>

                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '10ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div className="">
                                <TextField
                                    label="SPH"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        style: { height: 20 }
                                    }}
                                    value={leftEye.SPH}
                                    onChange={(e) => handleLeftEyeChange("SPH", e.target.value)}
                                />
                                <TextField
                                    label="CYL"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        style: { height: 20 }
                                    }}
                                    value={leftEye.CYL}
                                    onChange={(e) => handleLeftEyeChange("CYL", e.target.value)}
                                />
                                <TextField
                                    label="Axis"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        style: { height: 20 }
                                    }}
                                    value={leftEye.Axis}
                                    onChange={(e) => handleLeftEyeChange("Axis", e.target.value)}
                                />
                                <TextField
                                    label="Prism"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        style: { height: 20 }
                                    }}
                                    value={leftEye.Prism}
                                    onChange={(e) => handleLeftEyeChange("Prism", e.target.value)}
                                />
                                <TextField
                                    label="Base"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        style: { height: 20 }
                                    }}
                                    value={leftEye.Base}
                                    onChange={(e) => handleLeftEyeChange("Base", e.target.value)}
                                />
                            </div>
                        </Box>
                        {/* birt year */}
                        <div className='mt-5 mx-auto'>
                            <FormControl fullWidth>
                                <InputLabel id="birthYear-label">Select Your Birth Year</InputLabel>
                                <Select
                                    labelId="birthYear-label"
                                    id="birthYear"
                                    value={birthYear}
                                    label="Select Your Birth Year"
                                    onChange={(e) => setBirthYear(parseInt(e.target.value))}
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

                <div class="flex justify-center mt-6">
                    <button onClick={() => {
                        handleSelections(); handleNext()
                    }} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none 
                focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm py-2.5 mb-2
                 w-[80%]">
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}


