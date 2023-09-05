import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Radio, RadioGroup, FormControlLabel, Box } from '@mui/material';

const PDComponent = () => {
  const [pdType, setPDType] = useState('oneNumber');
  const [pdOneNumber, setPDOneNumber] = useState(62);
  const [pdLeftNumber, setPDLeftNumber] = useState(32.5);
  const [pdRightNumber, setPDRightNumber] = useState(32.5);

  const handlePDTypeChange = (event) => {
    setPDType(event.target.value);
  };

  return (
    <div className="w-72 mt-5 ml-4">
      <Box sx={{ minWidth: 120 }}>
        <FormControl component="fieldset">
          <RadioGroup row aria-label="pdType" name="pdType" value={pdType} onChange={handlePDTypeChange}>
            <FormControlLabel value="oneNumber" control={<Radio />} label="One Number" />
            <FormControlLabel value="twoNumbers" control={<Radio />} label="Two Numbers" />
          </RadioGroup>
        </FormControl>
      </Box>

      {pdType === 'oneNumber' && (
        <div className='mt-5' >
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
  );
};

export default PDComponent;
