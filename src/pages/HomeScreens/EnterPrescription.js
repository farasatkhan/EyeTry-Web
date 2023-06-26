import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import Sidebar from "../../components/ui/UserProfilingSidebar";
import { FaBookOpen } from "react-icons/fa";
import { FaRegEnvelope, FaUser, FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import SelectLensTypeScreen from "../../components/ui/Home/SelectLensTypeComponent";


function SelectLensTypeComponentProp() {
    // for radio buttons
    const [selectedOption, setSelectedOption] = useState('option1');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    // for dropdown
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <div>
            <p className="text-lg font-sans font-bold mt-10">Pupilary Distance</p>
            <div className="text-lg font-sans font-semibold flex items-center ml-5 mt-2" >
                <label class="flex items-center">
                    <input
                        type="radio"
                        value="option1"
                        checked={selectedOption === 'option1'}
                        onChange={handleOptionChange}
                        className="w-5 h-5 mr-2"
                    />
                    <span class="ml-2">Single Number</span>
                </label>

                <label class="flex items-center ml-4">
                    <input
                        type="radio"
                        value="option2"
                        checked={selectedOption === 'option2'}
                        onChange={handleOptionChange}
                        className="w-5 h-5 mr-2"
                    />
                    <span class="ml-2">Two Numbers</span>
                </label>
            </div>



            <div className="w-72 mt-10 ">
                <Box sx={{ minWidth: 120 }} className>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Enter Your Pupilary Distance</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Select Prescription Type"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
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
                            style: { height: 20 }
                        }}
                    />
                    <TextField
                        id="outlined-number"
                        label="CYL"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            style: { height: 20 }
                        }}
                    />
                    <TextField
                        id="outlined-number"
                        label="Axis"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            style: { height: 20 }
                        }}
                    />
                </div>
            </Box>

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
                            style: { height: 20 }
                        }}
                    />
                    <TextField
                        id="outlined-number"
                        label="CYL"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            style: { height: 20 }
                        }}
                    />
                    <TextField
                        id="outlined-number"
                        label="Axis"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            style: { height: 20 }
                        }}
                    />
                </div>
            </Box>



        </div>
    )
}

export default function SelectLensType() {
    const [name, setName] = useState("JACKSON");
    const [description, setDescription] = useState("Cat Eye Eyeglasses");
    const [price, Price] = useState("$149.00");

    return (

        <SelectLensTypeScreen screenComponent={<SelectLensTypeComponentProp />} name={name} price={price} description={description} />

    );
}

