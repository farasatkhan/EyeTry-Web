import React, { useState } from "react";
import yellowGlassesImg from "../../../../assets/images/UserProfiling/yellowglasses.png";
import CustomizeProduct from '../CustomizeProduct/CustomizeProduct';
import ProductView from '../ProductView/ProductView';

import SelectGlassesType from "../OrderComponets/SelectGlassesType";
import SelectPrescriptionOption from "../OrderComponets/SelectPrescriptionOption";
import SelectLensTypeComponent from "../OrderComponets/SelectPrescriptionType"
import EnterPrescription from "../OrderComponets/EnterPrescription"
import SaveOrderPrescription from "../OrderComponets/SaveOrderPrescription"
import ChooseLensPackage from "../OrderComponets/ChooseLensPackage"
import SelectLensType from "../OrderComponets/SelectLensType"
import AvailableCoatings from "../OrderComponets/AvailableCoatings"
import ReviewSelections from "../OrderComponets/ReviewSelections"
import SunglassesLensSelection from "../OrderComponets/SunglassesLensSelection"


import graysvg from '/images/order/gray.svg'
export default function SelectLensTypeScreen(props) {

  const [customization, setCustomization] = useState({
    image: graysvg,
    name: 'Gray Polarized',
  });

  // Update the customization state based on user input
  const handleCustomizationUpdate = (newCustomization) => {
    setCustomization(newCustomization);
  };

  const Component = props.screenComponent;

  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    if (currentStep < 15) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };


  let rightSideComponent;

  switch (currentStep) {
    case 1:
      rightSideComponent = <SelectGlassesType />;
      break;
    case 2:
      rightSideComponent = <SelectPrescriptionOption />;
      break;
    case 3:
      rightSideComponent = <SelectLensTypeComponent />;
      break;
    case 4:
      rightSideComponent = <EnterPrescription />;
      break;
    case 5:
      rightSideComponent = <SaveOrderPrescription />;
      break;
    case 6:
      rightSideComponent = <ChooseLensPackage />;
      break;
    case 7:
      rightSideComponent = <SelectLensType />;
      break;
    case 8:
      rightSideComponent = <AvailableCoatings />;
      break;
    case 9:
      rightSideComponent = <ReviewSelections />;
    case 10:
      rightSideComponent = <SunglassesLensSelection onUpdate={handleCustomizationUpdate} />;
      // case 9:
      //   rightSideComponent = <SaveOrderPrescription />;
      // case 9:
      //   rightSideComponent = <SaveOrderPrescription />;
      break;
    default:
      rightSideComponent = null;
  }



  return (
    <>
      <div className="flex flex-col md:flex-row items-center h-full px-4 sm:px-0">
        {/* section 1 */}
        <div className=" w-full md:w-[60%] md:mt-0 flex items-center justify-center mt-20 ">
          <div className="w-11/12 sm:w-85">
                <div className="h-1/2">
                  {currentStep !== 9 && (
                  <div className="">
                    <img src={yellowGlassesImg} alt="logo" className="w-full h-full" />
                  </div>
                              )}

                  {currentStep === 9 && (
                    <ProductView customization={customization} />
                    )}
                </div>

                <div className="px-20 flex flex-row mx-auto mt-10">
                  <div>
                    <h5 className="font-sans text-3xl font-bold mr-10">{props.name}</h5>
                    <p className="font-sans text-md font-semibold mb-10">{props.description}</p>
                  </div>
                  <div className="ml-auto">
                    <h5 className="font-sans text-3xl font-bold">{props.price}</h5>
                  </div>
                </div>

          </div>

        </div>

        {/* section 2 */}
        <div className=" overflow-auto h-screen flex flex-col  w-full md:w-[40%] shadow-lg shadow-left ">
          <div className="flex flex-col w-[90%] mx-auto flex-1 justify-center mb-8">
            <div className="mx-auto w-full p-3">
              <div className="flex justify-between mb-5">
                <button className="text-xl" onClick={handlePreviousStep} disabled={currentStep === 1}>
                  &lt; Back
                </button>
                <button className="font-bold text-2xl" onClick={handleNextStep} disabled={currentStep === 10}>
                  &gt;
                </button>
              </div>
              {rightSideComponent}
            </div>
          </div>
        </div>
      </div>
    </>
    //   <div>
    //   <h1>Eyeglasses Order Management</h1>
    //   <CustomizeProduct onUpdate={handleCustomizationUpdate} />
    // </div>
  );
}
