import React, { useState, useEffect } from "react";
import yellowGlassesImg from "../../../assets/images/UserProfiling/yellowglasses.png";
import { Link } from "react-router-dom";
import { FaCheckCircle } from 'react-icons/fa';
import { BiEdit } from "react-icons/bi";
import pfp from '../../../assets/images/UserProfiling/Ellipse.png'


export default function SelectLensTypeScreen({ rating }) {

    // animation effect
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        // Trigger the animation when the component is mounted
        setLoaded(true);
    }, []);

    const imageAnimationClass = loaded ? 'translate-y-0 opacity-100 transition-transform ease-out duration-1000' : 'translate-y-20 opacity-0';
    const rightComponentAnimationClass = loaded ? 'translate-x-0 opacity-100 transition-transform ease-out duration-1000' : 'translate-x-20 opacity-0';
    const textAnimationClass = loaded ? 'translate-y-0 opacity-100 transition-transform ease-out duration-1000 delay-500' : 'translate-y-20 opacity-0';

    // for images
    const [images, setImages] = useState({
        img1: yellowGlassesImg,
        img2: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5/3396ee3c-08cc-4ada-baa9-655af12e3120/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
        img3: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/e44d151a-e27a-4f7b-8650-68bc2e8cd37e/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
        img4: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/44fc74b6-0553-4eef-a0cc-db4f815c9450/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
        img5: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/d3eb254d-0901-4158-956a-4610180545e5/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
    })

    const [activeImg, setActiveImage] = useState(images.img1)

    const [amount, setAmount] = useState(1);

    // start ratings 
    const renderStars = () => {
        const maxRating = 5; // Assuming a maximum rating of 5 stars
        const starIcons = [];

        for (let i = 1; i <= maxRating; i++) {
            const starClass = i <= rating ? 'star-filled' : 'star-empty';
            starIcons.push(
                <span key={i} className={`star ${starClass}`}>
                    ★
                </span>
            );
        }

        return starIcons;
    };
    return (
        <>
            <div className="bg-white">
                <div className="flex flex-col md:flex-row min-h-screen">
                    {/* section 1 */}
                    <div className="w-full mb-20 md:mb-0 md:w-[60%] justify-center sm:justify-start flex flex-col items-center">
                        <div className="w-full sm:w-85">
                            <div className="">
                                <button className="ml-10 mt-10 w-[20%] text-base font-semibold mb-2 hover:text-blue-400  cursor-pointer">
                                    &lt; <span className="hover:underline">Back</span></button>
                                <div className='py-4 rounded-md w-full'></div>
                                <div className={` justify-center items-center flex flex-wrap ${imageAnimationClass}`}>
                                    <div className="w-[600px] h-[400px]">
                                        <img src={activeImg} alt="" className='w-full h-full rounded-xl' />
                                        <div className={`mt-2 flex flex-row justify-between ${imageAnimationClass}`}>
                                            <img src={images.img1} alt="" className='w-20 h-20 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img1)} />
                                            <img src={images.img2} alt="" className='w-20 h-20 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img2)} />
                                            <img src={images.img3} alt="" className='w-20 h-20 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img3)} />
                                            <img src={images.img4} alt="" className='w-20 h-20 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img4)} />
                                            <img src={images.img5} alt="" className='w-20 h-20 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img5)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* section 2 */}
                    <div className={`flex flex-col w-full md:w-[40%]  ${rightComponentAnimationClass}`}>
                        <div className="flex flex-col w-[90%] mx-auto bg-gray-100 m-10 flex-1 p-5 justify-center">
                            <h1 className="font-semibold font-sans text-4xl">Jackson</h1>
                            <p className="font-sans text-base">Cat Eye Eyeglasses</p>
                            <div className="product-rating font-bold text-2xl text-yellow-500">
                                {renderStars()}
                                <span className="rating">{rating}</span>
                            </div>
                            <p className="mt-5 text-blue-400 cursor-pointer">Reviews (59)</p>
                            <p className="mt-5 text-base">These transparent grey frames are a refreshing hue that still goes with everything.</p>
                            <p className="font-bold text-2xl mt-5 ">$129.00</p>
                            <span className="flex space-x-2 mt-4 cursor-pointer items-center">
                                <FaCheckCircle size={15} color="green" />
                                <p className="text-green-500">Free shipping & returns</p>
                            </span>
                            <span className="flex space-x-2 cursor-pointer items-center">
                                <FaCheckCircle size={15} color="green" />
                                <p className="text-green-500">100% money-back guarantee</p>
                            </span>
                            {/* buttons */}
                            <div className="flex justify-center items-center w-full flex-col text-center mt-10 mb-10">
                                <button type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Select Lens</button>
                                <button type="button" className="w-full focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Try-ON Virtually</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-200 p-4 md:p-10 pl-36 font-sans mb-10 rounded-sm mx-auto w-[95%]">
                    <h1 className="text-2xl font-semibold">Description</h1>
                    <p className="font-semibold mb-2 md:mb-8 text-base">SPECIFICATIONS</p>
                    <table className="text-md font-semibold">
                        <tr>
                            <td class="px-2 md:px-5">PD Range: 56-72</td>
                            <td class="px-2 md:px-10">Rim: Full Rim</td>
                        </tr>
                        <tr>
                            <td class="px-2 md:px-5 py-3">Prescription Range: -20.00 ~ +12.00</td>
                            <td class="px-2 md:px-10">Shape: Square</td>
                        </tr>
                        <tr>
                            <td class="px-2 md:px-5 py-3">Frame size: Medium</td>
                            <td class="px-2 md:px-10">Feature: Spring Hinges, Custom engraving</td>
                        </tr>
                    </table>
                    <p className="mt-2 md:mt-8">Tags: Round Face Shape, Oval Face Shape, Diamond Face Shape, Triangle Face Shape, All Sunglasses</p>
                </div>

                <div className="w-[80%] mx-auto">
                    <h1 className="text-2xl font-semibold">Customer Reviews</h1>
                    <div className="flex justify-center items-center space-x-4 py-5 flex-wrap flex-col md:flex-row">
                        <p className="font-bold text-2xl">4.1</p><p className="font-bold text-2xl text-yellow-500 ">★★★★★</p><p className="text-sm ml-4 text-blue-400">Based on 11 Reviews</p>
                        <button class=" py-1 px-4 rounded inline-flex items-center 
                                            bg-transparent hover:bg-gray-700 text-gray-700 font-semibold 
                                             hover:text-white border border-gray-500 hover:border-transparent ">
                            <BiEdit size={20} class="mr-2" />
                            <span>Write a Review</span>
                        </button>
                    </div>
                    <hr className="mt-10"></hr>
                </div>

                {/* customers reviews */}
                <div className="w-[80%] mx-auto mb-20">
                    <div className="mt-5">
                        <div className="flex items-center space-x-3">
                            <img src={pfp} alt="" className='w-[40px] h-[40px] rounded-xl' />
                            <h3 className="font-semibold">Farasat Khan</h3>
                        </div>
                        <div className="ml-12">
                            <div className="product-rating font-bold text-xl text-yellow-500">
                                {renderStars()}
                                <span className="rating">{rating}</span>
                            </div>
                            <h1 className="font-semibold">Well made and fits!</h1>
                            <p className="text-base font-sans">I can’t believe how well these acetate frames fit my face! My eyes don’t sit right in
                                the middle of the lenses though, maybe that’s because the frame width is so big? But
                                I like the style. Maybe my nose is just too small? Regardless, I’m super happy with
                                my purchase. Definitely recommend.
                            </p>
                            <p className="text-sm text-blue-400 mt-2 mb-4">04 Apr 2023</p>
                        </div>
                        <hr></hr>
                    </div>
                    <div className="mt-5">
                        <div className="flex items-center space-x-3">
                            <img src={pfp} alt="" className='w-[40px] h-[40px] rounded-xl' />
                            <h3 className="font-semibold">Farasat Khan</h3>
                        </div>
                        <div className="ml-12">
                            <div className="product-rating font-bold text-xl text-yellow-500">
                                {renderStars()}
                                <span className="rating">{rating}</span>
                            </div>
                            <h1 className="font-semibold">Well made and fits!</h1>
                            <p className="text-base font-sans">I can’t believe how well these acetate frames fit my face! My eyes don’t sit right in
                                the middle of the lenses though, maybe that’s because the frame width is so big? But
                                I like the style. Maybe my nose is just too small? Regardless, I’m super happy with
                                my purchase. Definitely recommend.
                            </p>
                            <p className="text-sm text-blue-400 mt-2 mb-4">04 Apr 2023</p>
                        </div>
                        <hr></hr>
                    </div>
                    <div className="flex justify-center mt-10">
                        <button class="py-1 px-4 rounded inline-flex items-center 
                        bg-transparent hover:bg-gray-700 text-gray-700 font-semibold 
                        hover:text-white border border-gray-500 hover:border-transparent ">
                            <span>Load More</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}