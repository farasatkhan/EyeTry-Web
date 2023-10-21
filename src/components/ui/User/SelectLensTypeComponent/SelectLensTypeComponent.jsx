import React, { useState, useEffect } from "react";
import yellowGlassesImg from "../../../../assets/images/UserProfiling/yellowglasses.png";
import CustomizeProduct from '../CustomizeProduct/CustomizeProduct';
import SunglassesLensPreview from '../OrderComponets/SunglassesLensPreview/SunglassesLensPreview';
import TransitionLensPreview from '../OrderComponets/TransitionLensPreview/TransitionLensPreview';
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
import TransitionLensSelection from "../OrderComponets/TransitionLensSelection"
import graysvg from '/images/order/gray.svg'
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedOptions } from '../../../../redux/actions/orderSelectionAction';
import { useNavigate } from "react-router-dom";
import { viewParticularProduct } from "../../../../api/productsApi";
import { useParams } from "react-router-dom";
import API_URL from "../../../../config/config";


export default function SelectLensTypeScreen() {

  const { id } = useParams();

  const [product, setProduct] = useState({})

  // fetching product data
  useEffect(() => {
    getData(id);
  }, [])

  const getData = async (id) => {
    try {
      const productData = await viewParticularProduct(id);
      setProduct(productData)
    } catch (error) {
      throw error;
    }
  }
  
  const dispatch = useDispatch();
  const selectedOptions = useSelector((state) => state.selectedOptions);

  const schema = {
    lensProperties: {
      lensType: "",
      prescriptionType: "",
      package: "",
      coatings: "",
      glassesType: "",
      upgrades: "",
      transitionLens: {
        transitionType: "",
        color: ""
      },
      sunglassesLens: {
        sunglassesType: "",
        color: ""
      },

    },
    prescription: {
      pdType: "",
      pdOneNumber: null,
      pdLeftNumber: null,
      pdRightNumber: null,
      rightEyeOD: {
        SPH: "",
        CYL: "",
        Axis: "",
        Prism: "",
        Base: "",
      },
      leftEyeOS: {
        SPH: "",
        CYL: "",
        Axis: "",
        Prism: "",
        Base: "",
      },
      birthYear: null,
    },
  };



  // Define the handleGlassesTypeSelect function to update selectedOptions
  // Update handleSelectedOptions function to dispatch the action





  // animation effect
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    // Trigger the animation when the component is mounted
    setLoaded(true);
  }, []);

  const imageAnimationClass = loaded ? 'translate-y-0 opacity-100 transition-transform ease-out duration-1000' : 'translate-y-20 opacity-0';
  const textAnimationClass = loaded ? 'translate-y-0 opacity-100 transition-transform ease-out duration-1000 delay-500' : 'translate-y-20 opacity-0';
  const rightComponentAnimationClass = loaded ? 'translate-x-0 opacity-100 transition-transform ease-out duration-1000' : 'translate-x-20 opacity-0';

  const [customization, setCustomization] = useState({
    image: graysvg,
    name: 'Gray Polarized',
  });

  // Update the Lens customization state based on user input
  const handleCustomizationUpdate = (newCustomization) => {
    setCustomization(newCustomization);
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [previousScreen, setPreviousScreen] = useState(null);

  const handleNextStep = (nextStep) => {
    if (nextStep) {
      setPreviousScreen(currentStep);
      setCurrentStep(nextStep);
    } else if (currentStep < 15) {
      setPreviousScreen(currentStep);
      setCurrentStep(currentStep + 1);
    }
  };

  // managing previus states comming from child components
  const handlePreviousState = (state) => {
    setPreviousScreen(state)
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      if (currentStep <= 8) {
        setCurrentStep(currentStep - 1)
      }
      else if (currentStep === 8 || currentStep === 9) {
        setCurrentStep(7);
      }
      else if (currentStep === 10 && previousScreen === 8) {
        setCurrentStep(8);
      }
      else if (currentStep === 10 && previousScreen === 9) {
        setCurrentStep(9);
      }
      else if (previousScreen === 10) {
        setCurrentStep(7);
      }
      else {
        setCurrentStep(previousScreen);
      }
    }
    console.log("prev state: " + previousScreen)
  };

  let rightSideComponent;

  switch (currentStep) {
    case 1:
      rightSideComponent = <SelectGlassesType onNextStep={handleNextStep} />;
      break;
    case 2:
      rightSideComponent = <SelectPrescriptionOption onNextStep={handleNextStep} />;
      break;
    case 3:
      rightSideComponent = <SelectLensTypeComponent onNextStep={handleNextStep} />;
      break;
    case 4:
      rightSideComponent = <EnterPrescription onNextStep={handleNextStep} />;
      break;
    case 5:
      rightSideComponent = <SaveOrderPrescription onNextStep={handleNextStep} />;
      break;
    case 6:
      rightSideComponent = <ChooseLensPackage onNextStep={handleNextStep} />
      break;
    case 7:
      rightSideComponent = <SelectLensType onNextStep={handleNextStep} />;
      break;
    case 8:
      rightSideComponent = <TransitionLensSelection onPreviousState={handlePreviousState} onUpdate={handleCustomizationUpdate} onNextStep={handleNextStep} />;
      break;
    case 9:
      rightSideComponent = <SunglassesLensSelection onUpdate={handleCustomizationUpdate} onNextStep={handleNextStep} />;
      break;
    case 10:
      rightSideComponent = <AvailableCoatings onNextStep={handleNextStep} />;
      break;
    case 11:
      rightSideComponent = <ReviewSelections selectedOptions={selectedOptions} />;
      break;
    default:
      rightSideComponent = null;
  }

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Go back to the previous page using useNavigate
  };

  // fetching product image
// Modify your productImage function to include CSS styles for the image
const productImage = (product) => {
  if (
    product &&
    product.frame_information &&
    product.frame_information.frame_variants &&
    product.frame_information.frame_variants[0] &&
    product.frame_information.frame_variants[0].images &&
    product.frame_information.frame_variants[0].images[0]
  ) {
    const path = product.frame_information.frame_variants[0].images[0];

    const completePath = API_URL + path;
    console.log(completePath);

    return (
      <div className="">
        <img
          className="w-[80%] mx-auto object-contain h-[300px]" // Adjust the dimensions as needed
          src={completePath}
          alt="product"
        />
      </div>
    );
  }
};


  return (
    <>
      <div className="flex flex-col md:flex-row  sm:px-0 min-h-screen">
        {/* section 1 */}
        <div className="w-full md:w-[55%] mb-10 justify-center sm:justify-start flex flex-col items-center bg-white">
          <div className="w-full sm:w-85">
            <div className="">
              {currentStep !== 9 && currentStep !== 8 && (
                <>
                  <button onClick={goBack} className="ml-10 mt-10 w-[20%] text-base font-bold mb-2 hover:text-blue-400  cursor-pointer" disabled={currentStep === 1}>
                    &lt; <span className="hover:underline">Back to frame</span></button>
                  <div className='p-8 mt-[-15px] rounded-md w-full'></div>
                  <div className={`object-contain justify-center items-center flex ${imageAnimationClass}`}>
                    {
                      productImage(product)
                    }
                  </div>

                </>
              )}

              {currentStep === 8 && (
                <>
                  <TransitionLensPreview customization={customization} />
                </>
              )}

              {currentStep === 9 && (
                <>
                  <SunglassesLensPreview customization={customization} />
                </>
              )}

            </div>
            {currentStep !== 8 && currentStep !== 9 && (
              <>
                <div className={`px-20 flex flex-row mx-auto mt-4 sm:mt-10 ${textAnimationClass}`}>
                  <div>
                    <h5 className="font-sans text-xl sm:text-2xl font-bold mr-4 sm:mr-10">{product.name}</h5>
                    <p className="font-sans text-md font-semibold mb-4 sm:mb-10">{product.manufacturer}</p>
                  </div>
                  <div className="ml-auto">
                    {product && product.priceInfo ? (
                      <p className="font-sans text-lg sm:text-2xl font-bold">{product.priceInfo.price} {product.priceInfo.currency}</p>

                    ) : (
                      <p className="mt-5 text-blue-400 cursor-pointer">
                        price (Loading...)
                      </p>
                    )}
                  </div>
                </div>
                <div className={`bg-gray-50 rounded-md p-2 sm:px-4 mr-8 ml-8 mb-8 transform ${textAnimationClass}`}>
                  <h5 className="font-sans text-xl font-bold mr-4 sm:mr-10 mb-2">Frame Description</h5>
                  <p className="font-sans text-base">
                    {product.description}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* section 2 */}
        <div className={`flex flex-col w-full md:w-[45%]  shadow-left bg-gray-100 border-l-[#f1f1f1] border-l-2 ${rightComponentAnimationClass} }`}>
          <div className="flex mt-10">
            <button className="w-[20%] text-base mb-2 hover:text-blue-400  cursor-pointer" onClick={() => handlePreviousStep()} disabled={currentStep === 1}>
              &lt; <span className="hover:underline">Back</span>
            </button>
            {/* <button className="w-[20%] text-base font-normal mb-2" onClick={() => handleNextStep()} disabled={currentStep === 10}>
              &gt;
            </button> */}
          </div>
          <div className=" flex flex-col w-[90%] mx-auto flex-1 mb-8">
            <div className="mx-auto w-full p-3">{rightSideComponent}</div>
          </div>
        </div>
      </div>
    </>
  );
}