  // reducer.js
  
  const initialState = {
    selectedOptions: {
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
    },
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_SELECTED_OPTIONS':
        // Merge the new values with the existing state using the spread operator
        const updatedSelectedOptions = {
          ...state.selectedOptions,
          ...action.payload,
          lensProperties: {
            ...state.selectedOptions.lensProperties,
            ...action.payload.lensProperties,
          },
        };
  
        return {
          ...state,
          selectedOptions: updatedSelectedOptions,
        };
      default:
        return state;
    }
  };
  export default reducer;
  