import React, { useState, useEffect } from "react";
import yellowGlassesImg from "../../../../assets/images/UserProfiling/yellowglasses.png";
import { Link } from "react-router-dom";
import { FaCheckCircle } from 'react-icons/fa';
import { BiEdit } from "react-icons/bi";
import pfp from '../../../../assets/images/UserProfiling/Ellipse.png'
import { useParams } from "react-router-dom";
import { viewParticularProduct } from "../../../../api/productsApi";

export default function SelectLensTypeScreen({ rating }) {


    const [product, setProduct] = useState({})
    const [frameColors, setFrameColors] = useState([])
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            try {
                async function fetchData() {
                    const fetchedGlasses = await viewParticularProduct(id);

                    const colors = fetchedGlasses.frame_information.frame_variants.map(
                        (variant) => variant.color
                    );
                    setProduct(fetchedGlasses)
                    setFrameColors(colors);
                    console.log("frame colors: ", frameColors)
                }
                fetchData();
            } catch (error) {
                console.log("error getting particular glasses.");
            }
        }
    }, [id]);


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
        img1: "https://img.freepik.com/premium-photo/eyeglasses-isolated-white-background_33900-1477.jpg?w=2000",
        img2: "https://i5.walmartimages.com/asr/ede8eae4-8e51-4029-aac6-59c692426861.20c4489bd3559f8dcfd027a34150bfd2.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
        img3: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/matte-blue-full-rim-wayfarer-lenskart-air-essentials-la-e10592-l-c2-eyeglasses_lenskart-air-la-e10592-l-c2-eyeglasses_g_2972_27july23.jpg",
        img4: "https://www.otticacenter.gr/image/cache/catalog/7th_street/7A056_003_4918_145-420x420w.jpg",
        img5: "https://www.otticacenter.gr/image/cache/catalog/7th_street/7A056_003_4918_145-420x420w.jpg",
        img6: "https://www.otticacenter.gr/image/cache/catalog/7th_street/7A056_003_4918_145-420x420w.jpg",
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

    //  table content 
    const [activeTab, setActiveTab] = useState('description');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
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
                                <div className={` justify-center items-center object-cover flex flex-wrap ${imageAnimationClass}`}>
                                    <div className="w-[600px] h-[400px]">
                                        <img src={activeImg} alt="" className='w-full h-full rounded-xl' />
                                        <div className={`mt-2 flex flex-row justify-between ${imageAnimationClass}`}>
                                            <img src={images.img1} alt=""
                                                className='w-20 h-20 border rounded-md cursor-pointer' onClick={() => setActiveImage(images.img1)} />
                                            <img src={images.img2} alt=""
                                                className='w-20 h-20 border rounded-md cursor-pointer' onClick={() => setActiveImage(images.img2)} />
                                            <img src={images.img3} alt=""
                                                className='w-20 h-20 border rounded-md cursor-pointer' onClick={() => setActiveImage(images.img3)} />
                                            <img src={images.img4} alt=""
                                                className='w-20 h-20 border rounded-md cursor-pointer' onClick={() => setActiveImage(images.img4)} />
                                            <img src={images.img5} alt=""
                                                className='w-20 h-20 border rounded-md cursor-pointer' onClick={() => setActiveImage(images.img5)} />
                                            <img src={images.img6} alt=""
                                                className='w-20 h-20 border rounded-md cursor-pointer' onClick={() => setActiveImage(images.img6)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* section 2 */}
                    <div className={`flex flex-col w-full md:w-[40%]  ${rightComponentAnimationClass}`}>
                        <div className="flex flex-col w-[90%] mx-auto bg-gray-100 m-10 flex-1 p-5 justify-center">
                            <h1 className="font-semibold font-sans text-4xl">{product.name}</h1>
                            <p className="font-sans mt-2 text-base">{product.manufacturer}</p>
                            <div className="product-rating font-bold text-2xl text-yellow-500">
                                {renderStars()}
                                <span className="rating">{rating}</span>
                            </div>
                            <p className="font-sans mt-2 text-base">{product.type}</p>
                            {/* displaying frame colors */}
                            <div className="flex">
                                {product && frameColors ? (
                                    frameColors.map((color, index) => (
                                        <div
                                            key={index}
                                            className={`rounded-full w-6 h-6 ${color && `bg-${color.toLowerCase()}-500 : bg-${color.toLowerCase()}`} m-2`}
                                        ></div>
                                    ))
                                ) : (
                                    <p className="mt-5 text-blue-400 cursor-pointer">colors (Loading...)</p>
                                )}
                            </div>

                            {product && product.reviewsInformation ? (
                                <p className="mt-5 text-blue-400 cursor-pointer">
                                    Reviews ({product.reviewsInformation.total_reviews})
                                </p>
                            ) : (
                                <p className="mt-5 text-blue-400 cursor-pointer">
                                    Reviews (Loading...)
                                </p>
                            )}
                            <div className="max-h-24 w-full mt-2 description-box overflow-hidden">
                                <p className=" text-base overflow-hidden text-ellipsis">{product.description}</p>
                            </div>
                            { product && product.priceInfo ? (
                                <p className="font-bold text-2xl mt-5 ">{product.priceInfo.price} {product.priceInfo.currency}</p>

                            ) : (
                                <p className="mt-5 text-blue-400 cursor-pointer">
                                    price (Loading...)
                                </p>
                            )}
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
                                <Link to={`/select_lens/${id}`} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Select Lens</Link>
                                <button type="button" className="w-full focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Try-ON Virtually</button>
                            </div>
                        </div>
                    </div>
                </div>


                {/* table tabs content */}
                <div className="bg-gray-200 p-10 pl-36 font-sans mb-10 rounded-sm mx-auto w-[95%]">
                    {/* Tab buttons */}
                    <div className="flex mb-4 space-x-4">
                        <button
                            className={` text-lg tab-btn ${activeTab === 'description' ? 'text-blue-400 border-b-[3px] border-blue-500' : ''}`}
                            onClick={() => handleTabClick('description')}
                        >
                            Description
                        </button>
                        <button
                            className={`text-lg tab-btn ${activeTab === 'frame' ? 'text-blue-400 border-b-[3px] border-blue-500' : ''}`}
                            onClick={() => handleTabClick('frame')}
                        >
                            Frame and Measurements
                        </button>
                        <button
                            className={`text-lg tab-btn ${activeTab === 'shipping' ? 'text-blue-400 border-b-[3px] border-blue-500' : ''}`}
                            onClick={() => handleTabClick('shipping')}
                        >
                            Shipping & Returns
                        </button>
                    </div>

                    {/* Tab contents */}
                    <div
                        className="border p-4 h-[250px] overflow-y-auto"
                        id="tab-content-container"
                    >
                        <div
                            className={`tab-content ${activeTab === 'description' ? '' : 'hidden'}`}
                            id="description-tab"
                        >
                            <p className="text-2xl font-semibold">SPECIFICATIONS</p>
                            <div className="text-md">
                                <p className="font-semibold mt-2">{product.name}</p>
                                <p>{product.description}</p>

                                {product && product.meta ? (
                                    <p className="mt-2 md:mt-8">
                                        Tags: {product.meta.meta_keywords.join(', ')}
                                    </p>
                                ) : (
                                    <p className="mt-5 text-blue-400 cursor-pointer">
                                        Tags (Loading...)
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Frame and Measurements section */}
                        <div
                            className={`tab-content ${activeTab === 'frame' ? '' : 'hidden'}`}
                            id="frame-tab"
                        >
                            <h1 className="text-2xl font-semibold">Frame and Measurements</h1>
                            {
                                product && product.frame_information && product.lens_information && product.person_information ? (
                                    <table className="text-md mt-4">
                                        <tbody>
                                            <div className=" flex-col flex md:flex-row space-x-10">
                                                <div>
                                                    <tr>
                                                        <td className="font-semibold">Frame Material:</td>
                                                        <td>
                                                            {product.frame_information.frame_material.join(', ')}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="font-semibold">Frame Size:</td>
                                                        <td>
                                                            {product.frame_information.frame_size.join(', ')}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="font-semibold">Lens Material:</td>
                                                        <td>
                                                            {product.lens_information.measurement_type}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="font-semibold">Lens Width:</td>
                                                        <td>
                                                            {product.lens_information.lens_width} mm
                                                        </td>
                                                    </tr>
                                                </div>
                                                <div>
                                                    <tr>
                                                        <td className="font-semibold">Lens Height:</td>
                                                        <td>
                                                            {product.lens_information.lens_height} mm
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="font-semibold">Total Width:</td>
                                                        <td>
                                                            {product.lens_information.total_width} mm
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="font-semibold">Bridge Width:</td>
                                                        <td>
                                                            {product.lens_information.bridge_width} mm
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="font-semibold">Temple Length:</td>
                                                        <td>
                                                            {product.lens_information.temple_length} mm
                                                        </td>
                                                    </tr>
                                                </div>
                                                <div>
                                                    <tr>
                                                        <td className="font-semibold">Is Multifocal:</td>
                                                        <td>
                                                            {product.lens_information.is_multifocal ? 'Yes' : 'No'}
                                                        </td>
                                                    </tr>
                                                    {/* Add more lens properties as needed... */}
                                                    <tr>
                                                        <td className="font-semibold">Face Shape:</td>
                                                        <td>
                                                            {product.person_information.face_shape.join(', ')}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="font-semibold">Genders:</td>
                                                        <td>
                                                            {product.person_information.genders.join(', ')}
                                                        </td>
                                                    </tr>
                                                </div>
                                            </div>
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="mt-5 text-blue-400 cursor-pointer">
                                        Frame Measurements (Loading...)
                                    </p>
                                )
                            }
                        </div>
                        <div
                            className={`tab-content ${activeTab === 'shipping' ? '' : 'hidden'}`}
                            id="shipping-tab"
                        >
                            <h1 className="text-2xl font-semibold">Shipping & Returns</h1>
                            <p className="text-base mt-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac libero non orci dictum cursus. Nullam eget augue a velit suscipit eleifend. Vivamus vestibulum ipsum non dapibus. Sed vel vestibulum ex. Nullam bibendum pharetra quam vel pellentesque.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-[80%] mx-auto">
                    <h1 className="text-2xl font-semibold">Customer Reviews</h1>
                    <div className="flex justify-center items-center space-x-4 py-5 flex-wrap flex-col md:flex-row">
                        <p className="font-bold text-2xl">4.1</p><p className="font-bold text-2xl text-yellow-500 ">★★★★★</p>
                        { product && product.reviewsInformation ? (
                            <p className="text-sm ml-4 text-blue-400">Based on {product.reviewsInformation.total_reviews} Reviews</p>
                        ) : (
                                    <p className="mt-5 text-blue-400 cursor-pointer">colors (Loading...)</p>

                        )}
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
                            <p className="text-base font-sans">
                                I can’t believe how well these acetate frames fit my face! My eyes don’t sit right in
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
                            <p className="text-base font-sans">
                                I can’t believe how well these acetate frames fit my face! My eyes don’t sit right in
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
            <div className="parent">
            </div>
        </>
    );
}
