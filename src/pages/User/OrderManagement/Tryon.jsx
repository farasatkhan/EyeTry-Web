import React, { useRef, useEffect } from 'react'

import { JEELIZVTO, JEELIZVTOWIDGET } from 'jeelizvtowidget'
//import { JEELIZVTO, JEELIZVTOWIDGET } from '../../../../../npm/package/index.js'


import searchImage from '../../../assets/images/ExclusiveFeatures/target.png'

import './Tryon.css'

function init_VTOWidget(placeHolder, canvas, toggle_loading){
  JEELIZVTOWIDGET.start({
    placeHolder,
    canvas,
    callbacks: {
      ADJUST_START: null,
      ADJUST_END: null,
      LOADING_START: toggle_loading.bind(null, true),
      LOADING_END: toggle_loading.bind(null, false)
    },
    sku: 'rayban_aviator_or_vertFlash', // SKU loadded at the beginning
    // image displayed when face is not found:
    searchImageMask: searchImage, //'https://appstatic.jeeliz.com/jeewidget/images/target.png',
    searchImageColor: 0xeeeeee, // color of loading (face not found) animation
    searchImageRotationSpeed: -0.001, // negative -> clockwise
    callbackReady: function(){
      console.log('INFO: JEELIZVTOWIDGET is ready :)')
    },
    onError: function(errorLabel){ // this function catches errors, so you can display custom integrated messages
      alert('An error happened. errorLabel =' + errorLabel)
      switch(errorLabel) {
        case 'WEBCAM_UNAVAILABLE':
          // the user has no camera, or does not want to share it.
          break

        case 'INVALID_SKU':
          // the provided SKU does not match with a glasses model
          break

        case 'PLACEHOLDER_NULL_WIDTH':
        case 'PLACEHOLDER_NULL_HEIGHT':
          // Something is wrong with the placeholder
          // (element whose id='JeelizVTOWidget')
          break
          
        case 'FATAL':
        default:
          // a bit error happens:(
          break
      } // end switch
    } // end onError()
  }) // end JEELIZVTOWIDGET.start call
}


function AppCanvas({ onClose }){
  const refPlaceHolder = useRef()
  const refCanvas = useRef()
  const refAdjustEnter = useRef()
  const refAdjust = useRef()
  const refChangeModel = useRef()
  const refLoading = useRef()

  const toggle_loading = (isLoadingVisible) => {
    refLoading.current.style.display = (isLoadingVisible) ? 'block' : 'none'
  }

  const enter_adjustMode = () => {
    JEELIZVTOWIDGET.enter_adjustMode()
    refAdjustEnter.current.style.display = 'none'
    refAdjust.current.style.display = 'block'
    refChangeModel.current.style.display = 'none'
  }

  const exit_adjustMode = () => {
    JEELIZVTOWIDGET.exit_adjustMode()
    refAdjustEnter.current.style.display = 'block'
    refAdjust.current.style.display = 'none'
    refChangeModel.current.style.display = 'block'
  }

  const set_glassesModel = (sku) => {
    JEELIZVTOWIDGET.load(sku)
  }

  useEffect(() => {
    const placeHolder = refPlaceHolder.current
    const canvas = refCanvas.current
    init_VTOWidget(placeHolder, canvas, toggle_loading)

    return () => {
      //JEELIZVTOWIDGET.destroy()
    }
  }, [])

  const closeCameraOrCanvas = () => {
    // Destroy the JEELIZVTOWIDGET instance
    JEELIZVTOWIDGET.destroy();

    // function got as prop, now setting the state IsTryonOpen to false 
    onClose();
  
  };
  

  return (
    
    <div ref={refPlaceHolder} className='JeelizVTOWidget'>
      <canvas ref={refCanvas} className='JeelizVTOWidgetCanvas rounded-md'></canvas>
      
      <div ref={refAdjustEnter} className='JeelizVTOWidgetControls'>
        <button className='py-7'>
    
        </button>
        <button className="JeelizVTOWidgetAdjustExitButton p-2 px-[15px] JeelizVTOWidgetButtonClose shadow-sm rounded-full font-bold" onClick={closeCameraOrCanvas}>X</button>
      </div>

      <div ref={refAdjust} className='JeelizVTOWidgetAdjustNotice pl-8'>
        Move the glasses to adjust them.
        <button className='JeelizVTOWidgetButton JeelizVTOWidgetAdjustExitButton' onClick={exit_adjustMode}>
          Quit
        </button>
      </div>

      <div ref={refChangeModel} className='JeelizVTOWidgetControls JeelizVTOWidgetChangeModelContainer flex justify-center rounded-b-[6px]'>
        {/* <button className='JeelizVTOWidgetButton' onClick={set_glassesModel.bind(this, 'rayban_aviator_or_vertFlash')}>Try On</button> */}
        <button className='JeelizVTOWidgetButton JeelizVTOWidgetAdjustEnterButton mx-auto' onClick={enter_adjustMode}>
          Adjust
        </button>
      </div>

      <div ref={refLoading} className='JeelizVTOWidgetLoading'>
       <div className='JeelizVTOWidgetLoadingText text-center' >
          LOADING...
        </div>
      </div>

    </div>
  )
}

export default AppCanvas