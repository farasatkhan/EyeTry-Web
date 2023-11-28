import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSelectedOptions } from '../../../../redux/actions/orderSelectionAction';
import { addPrescription } from "../../../../api/userapi";

export default function SelectLensTypeComponent({ onNextStep }) {

  const [prescription, setPrescription] = useState([])

  const orderSelections = useSelector((state) => state.selectedOptions);
  const dispatch = useDispatch();

  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();


  useEffect(() => {
    const fetchedPrescription = orderSelections.selectedOptions.prescription;
    setPrescription(fetchedPrescription)
  }, [orderSelections]);



  const handleNext = () => {
    onNextStep();
  }


  const handleSavePrescription = async () => {
    const prescriptionData = {
      prescriptionName: prescription.prescriptionName,
      prescriptionType: prescription.prescriptionType,
      pdType: prescription.pdType,
      pdOneNumber: prescription.pdOneNumber,
      pdLeftNumber: prescription.pdLeftNumber,
      pdRightNumber: prescription.pdRightNumber,
      rightEyeOD: {
        SPH: prescription.rightEyeOD.SPH,
        CYL: prescription.rightEyeOD.CYL,
        Axis: prescription.rightEyeOD.Axis,
        Prism: prescription.rightEyeOD.Prism,
        Base: prescription.rightEyeOD.Base
      },
      leftEyeOS: {
        SPH: prescription.leftEyeOS.SPH,
        CYL: prescription.leftEyeOS.CYL,
        Axis: prescription.leftEyeOS.Axis,
        Prism: prescription.leftEyeOS.Prism,
        Base: prescription.leftEyeOS.Base
      },
      birthYear: prescription.birthYear,
      dateOfPrescription: `${month}/${day}/${year}`,
    }
    try {
      const SendPrescription = await addPrescription(prescriptionData)
      console.log(SendPrescription)
      alert("Prescription Saved Successfully!")
      onNextStep();
    }
    catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
      <h1 className="font-sans font-semibold text-2xl mx-auto mb-10">Simplify your next purchase.</h1>
      <div onClick={() => handleSavePrescription()} class="cursor-pointer hover:border-gray-400 fixed-div mb-3 bg-white border-2 border-gray-300 p-4 rounded-md hover:bg-gray-200">
        <h2 class="text-lg font-bold mb-2">Save Prescription</h2>
        <p class=" text-base font-sans">Get the next pair in no time by saving this prescription to your profile.</p>
      </div>
      <div onClick={() => handleNext()} class="cursor-pointer hover:border-gray-400 fixed-div mb-3 bg-white border-2 p-4 rounded-md border-gray-300 hover:bg-gray-200">
        <h2 class="text-lg font-bold mb-2">Skip Saving Prescription</h2>
        <p class="text-base font-sans">Skip saving prescription this time.</p>
      </div>
    </div>
  )
}


