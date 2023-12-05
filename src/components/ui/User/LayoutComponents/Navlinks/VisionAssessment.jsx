import React from "react";
import { Link } from "react-router-dom";

export default function EyeglassesNavLink() {
    return (
        <div className='py-1 absolute left-0 ' >
            <div className=' p-2 rounded-md bg-white shadow-lg z-50 w-[300px] cursor-pointer  h-[200px]'>
                <ul>
                    <Link to="/assessments/color_blind_test">
                        <li className='hover:bg-gray-800 text-[15px] hover:text-white p-1.5 pl-8 pr-4 rounded-sm' >
                            Vision Assessments
                        </li>
                    </Link>
                    <Link to="/assessments/color_blind_test">
                        <li className='hover:bg-gray-800 text-[15px] hover:text-white p-1.5 pl-8 pr-4 rounded-sm' >
                            Color Blind Test
                        </li>
                    </Link>
                    <Link to="/assessments/vision_acuity_test">
                        <li className='hover:bg-gray-800 text-[15px] hover:text-white p-1.5 pl-8 pr-4 rounded-sm' >
                            Vision Acuity Test
                        </li>
                    </Link>
                    <Link to="/assessments/contrast_sensitivity_test">
                        <li className='hover:bg-gray-800 text-[15px] hover:text-white p-1.5 pl-8 pr-4 rounded-sm' >
                            Contrast Sensitivity Test
                        </li>
                    </Link>
                    <Link to="/assessments/astigmatism_test">
                        <li className='hover:bg-gray-800 text-[15px] hover:text-white p-1.5 pl-8 pr-4 rounded-sm' >
                            Astigmatism Test
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
}

