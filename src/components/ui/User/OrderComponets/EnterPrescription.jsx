import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

// import SelectLensTypeScreen from "../SelectLensTypeComponent/SelectLensTypeComponent";
import PDComponent from "../SelectLensTypeComponent/PDComponent";

export default function SelectLensTypeComponentProp({onSelectedOptions, onNextStep}) {

    const handleSelections = (type) =>{
        onSelectedOptions(type)
      }
  
      const handleNext = () => {
        onNextStep();
      }

    return (
        <div className="mx-auto" >

            <h1 className="font-sans font-semibold text-3xl mx-auto">Enter Prescription Details</h1>

            <div className="mx-auto ">
            <PDComponent />

            <div className="flex-col flex justify-center items-center">
            <div>
            <p className="text-lg font-sans font-semibold mt-10 mb-3">Right Eye - OD</p>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '16ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div className="">
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

            <div>
            <p className="text-lg font-sans font-semibold mt-6 mb-3">Left Eye - OD</p>
            
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '16ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div className="">
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
            </div>

            <div class="flex justify-center mt-6">
                    <button onClick={ () => { handleSelections({
                        axis: "1",
                        abc: "2",
                        def: "3"
                    }); handleNext() }} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none 
                focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm py-2.5 mb-2
                 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-[80%]">
                        Next
                    </button>
            </div>
  
            </div>


        </div>
    )
}


