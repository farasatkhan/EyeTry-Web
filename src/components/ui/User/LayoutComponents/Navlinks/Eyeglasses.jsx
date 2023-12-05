import React from "react";
import { Link } from "react-router-dom";

export default function EyeglassesNavLink() {
    return (
        <div className='py-1 absolute left-0 ' >
            <div className=' p-2 rounded-md bg-white shadow-lg z-50 w-[300px] cursor-pointer  h-[200px]'>
                <ul>
                    <Link to="/products/men_eyeglasses">
                        <li className='hover:bg-gray-800 text-[15px] hover:text-white p-1.5 pl-8 pr-4 rounded-sm' >
                            Men's Eyeglasses
                        </li>
                    </Link>
                    <Link to="/products/women_eyeglasses">
                        <li className='hover:bg-gray-800 text-[15px] hover:text-white p-1.5 pl-8 pr-4 rounded-sm' >
                            Women's Eyeglasses
                        </li>
                    </Link>
                    <Link to="/products/kids_eyeglasses">
                        <li className='hover:bg-gray-800 text-[15px] hover:text-white p-1.5 pl-8 pr-4 rounded-sm' >
                            Kid's Eyeglasses
                        </li>
                    </Link>
                    <Link to="/products/new_arrival">
                        <li className='hover:bg-gray-800 text-[15px] hover:text-white p-1.5 pl-8 pr-4 rounded-sm' >
                            New Arrivals
                        </li>
                    </Link>
                    <Link to="/products/featured_products">
                        <li className='hover:bg-gray-800 text-[15px] hover:text-white p-1.5 pl-8 pr-4 rounded-sm' >
                            Featured Products
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
}

