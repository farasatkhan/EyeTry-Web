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

export default function SelectLensTypeComponentProp() {

    return (
        <div className="" >

            <h1 className="font-sans md:mt-0 font-semibold text-3xl mx-auto mb-10 mt-12">Enter Prescription Details</h1>
            <p className="text-lg font-sans font-bold mt-10">Pupilary Distance</p>

            {/* pd component */}
            <PDComponent />

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

            <p className="text-lg font-sans font-bold mt-6 mb-5">Left Eye - OD</p>
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

                <Link to="/order/save_order_prescription">
            <div class="flex justify-center mt-6">
                    <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none 
                focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm py-2.5 mb-2
                 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full">
                        Next
                    </button>
            </div>
                </Link>

        </div>
    )
}

// export default function SelectLensType() {
//     const [name, setName] = useState("JACKSON");
//     const [description, setDescription] = useState("Cat Eye Eyeglasses");
//     const [price, Price] = useState("$149.00");

//     return (

//         <SelectLensTypeScreen screenComponent={<SelectLensTypeComponentProp />} name={name} price={price} description={description} />

//     );
// }

