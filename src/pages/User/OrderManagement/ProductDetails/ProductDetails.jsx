import React, { useState, useEffect } from "react";
import yellowGlassesImg from "../../../../assets/images/UserProfiling/yellowglasses.png";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from 'react-icons/fa';
import { BiEdit } from "react-icons/bi";
import pfp from '../../../../assets/images/UserProfiling/Ellipse.png'
import { useParams } from "react-router-dom";
import { viewParticularProduct } from "../../../../api/productsApi";
import API_URL from "../../../../config/config";
import { useDispatch } from 'react-redux';
import { updateSelectedOptions } from '../../../../redux/actions/orderSelectionAction';

// ratings
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { viewAllOrders, viewAllReviews, addReview } from "../../../../api/productsApi";

export default function SelectLensTypeScreen({ rating }) {

    const [product, setProduct] = useState({});
    // available frame colors
    const [frameColors, setFrameColors] = useState([]);
    const [activeImg, setActiveImg] = useState("");
    const { id } = useParams();
    const [activeColor, setActiveColor] = useState(""); // Track the active color
    const [activeImages, setActiveImages] = useState([]); // Initialize activeImages state
    const [frameSize, setFrameSize] = useState('medium');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // review states
    const [hideReviewBox, setHideReviewBox] = useState(true)
    const [reviewTitle, setReviewTitle] = useState(null)
    const [reviewDescription, setReviewDescription] = useState(null)
    const [value, setValue] = React.useState(3);
    const [hover, setHover] = React.useState(-1);
    const [userHasOrderedProduct, setUserHasOrderedProduct] = useState(false)
    const [orders, setOrders] = useState([])
    // getting user ID from local storage
    const userString = localStorage.getItem('user')
    const userData = JSON.parse(userString);

    const [reviews, setReviews] = useState([])
    const [matchingOrderId, setMatchingOrderId] = useState(null)

    // getting all reviews
    useEffect(() => {
        const getReviews = async () => {
            try {
                const response = await viewAllReviews();
                // Use response.data directly to set reviews
                setReviews(response.data);

                // Now, you can log the reviews
                console.log("reviewsData: ", response.data);
            } catch (e) {
                console.error(e);
            }
        };

        getReviews();

    }, []);


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await viewAllOrders(userData._id);
                console.log("Orders list retrieved Successfully!");
                console.log("Order Data: ", response.data.orders);
                setOrders(response.data.orders)
            } catch (e) {
                console.error(e);
            }
        };

        fetchOrders();

    }, []);

    useEffect(() => {
        // Check if the user has ordered the specified product
        if (orders) {
            const matchingOrder = orders.find(order =>
                order.items.some(item => item.frame === id)
            );

            if (matchingOrder) {
                // If a matching order is found, store its ID in a state variable
                setMatchingOrderId(matchingOrder._id);
                setUserHasOrderedProduct(true);
            } else {
                // If no matching order is found, reset the state
                setMatchingOrderId(null);
                setUserHasOrderedProduct(false);
            }
        } else {
            // If orders is not set, reset the state
            setMatchingOrderId(null);
            setUserHasOrderedProduct(false);
        }
    }, [orders, id]);


    //ratings
    const labels = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
    };

    function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }



    const submitReview = async () => {
        console.log(userData._id)
        console.log("order ID " + matchingOrderId)
        const reviewData = {
            user: userData._id,
            order: matchingOrderId,
            product: id,
            user_review_title: reviewTitle,
            user_review_description: reviewDescription,
            stars: value
        }

        try {
            const response = await addReview(reviewData);
            console.log("review added Successfully!");
            console.log("Review Data: ", response.data);
        } catch (e) {
            console.error(e);
        }
    }


    useEffect(() => {
        if (id) {
            try {
                async function fetchData() {
                    const fetchedGlasses = await viewParticularProduct(id);

                    // Get frame colors and set the first one as the default active color
                    const colors = fetchedGlasses.frame_information.frame_variants.map(
                        (variant) => variant.color
                    );
                    if (colors.length > 0) { // Check if there are colors available
                        setProduct(fetchedGlasses);
                        setFrameColors(colors);

                        // Set the default color and image on the first render
                        const defaultColor = colors[0];
                        const absoluteImages = getAbsoluteImageURL(defaultColor, fetchedGlasses);
                        setActiveColor(defaultColor);
                        setActiveImages(absoluteImages);
                        setActiveImg(absoluteImages[0]);
                        console.log("default activeColor" + activeColor)
                    }
                }
                fetchData();
            } catch (error) {
                console.error("Error getting particular glasses.", error);
            }
        }
    }, [id]);



    // Additional images click handler
    const handleAdditionalImageClick = (imageURL) => {
        setActiveImg(imageURL);
    };

    const getAbsoluteImageURL = (color, glasses) => {
        if (glasses && glasses.frame_information && glasses.frame_information.frame_variants) {
            const variant = glasses.frame_information.frame_variants.find((v) => v.color === color);
            if (variant && variant.images && variant.images.length > 0) {
                // Assuming the images are stored on a specific server or CDN
                const baseURL = API_URL; // Replace with the actual base URL
                return variant.images.map((image) => `${baseURL}${image}`);
            }
        }
        return [];
    };


    const handleColorSelect = (color) => {
        if (product && frameColors) {
            const absoluteImages = getAbsoluteImageURL(color, product);

            if (absoluteImages.length > 0) {
                setActiveColor(color); // Set the active color
                setActiveImages(absoluteImages); // Set activeImages for the selected color
                setActiveImg(absoluteImages[0]); // Set the active image to the first image in the array
                console.log("selected activecolor" + activeColor)

            }
        }
    };


    // animation effect
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        // Trigger the animation when the component is mounted
        setLoaded(true);
    }, []);

    const imageAnimationClass = loaded ? 'translate-y-0 opacity-100 transition-transform ease-out duration-1000' : 'translate-y-20 opacity-0';
    const rightComponentAnimationClass = loaded ? 'translate-x-0 opacity-100 transition-transform ease-out duration-1000' : 'translate-x-20 opacity-0';
    const textAnimationClass = loaded ? 'translate-y-0 opacity-100 transition-transform ease-out duration-1000 delay-500' : 'translate-y-20 opacity-0';


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

    // adding frame size and color in redux - selectedOptions

    const handleSelectLensClick = () => {
        // Dispatch an action to update selected package and coatings
        dispatch(updateSelectedOptions({
            "frameProperties": {
                "frameSize": frameSize,
                "frameColor": activeColor
            }

        }));

        navigate(`/select_lens/${id}`)

    };

    // handling frame size selection
    const handleSizeSelect = (size) => {
        setFrameSize(size);
    }

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
                                {/* Display images based on selected color */}
                                <div className={`justify-center items-center object-cover flex flex-wrap ${imageAnimationClass}`}>
                                    <div className="w-[600px] h-[400px]">
                                        <img src={activeImg} alt="" className='w-full h-full rounded-xl' />
                                        {/* Display additional images for the selected color */}
                                        <div className={`mt-2 flex flex-row justify-center ${imageAnimationClass}`}>
                                            {activeImages.map((image, index) => (
                                                <div key={index} className="w-20 h-20 border rounded-md cursor-pointer">
                                                    <img
                                                        src={image}
                                                        alt=""
                                                        className='w-full h-full rounded-md'
                                                        onClick={() => handleAdditionalImageClick(image)} // Handle click on additional images
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* section 2 */}
                    <div className={`flex flex-col w-full md:w-[40%]  ${rightComponentAnimationClass}`}>
                        <div className="flex flex-col w-[90%] mx-auto mt-[35px] bg-gray-100 m-10 flex-1 p-5 justify-center">
                            <h1 className="font-semibold font-sans text-4xl">{product.name}</h1>
                            <p className="font-sans mt-2 text-base">{product.manufacturer}</p>
                            <div className="flex space-x-4 items-center">
                                <div className="product-rating font-bold text-2xl text-yellow-500">
                                    {renderStars()}
                                    <span className="rating">{rating}</span>
                                </div>
                                {product && product.reviewsInformation ? (
                                    <p className=" text-blue-400 cursor-pointer">
                                        Reviews ({product.reviewsInformation.total_reviews})
                                    </p>
                                ) : (
                                    <p className=" text-blue-400 cursor-pointer">
                                        Reviews (Loading...)
                                    </p>
                                )}
                            </div>
                            <p className="font-sans mt-1 text-base">{product.type}</p>
                            {/* displaying frame colors */}
                            <div className="flex mt-3">
                                {product && frameColors ? (
                                    frameColors.map((color, index) => (
                                        <div className={`${activeColor === color ? 'border-black rounded-full border-2 mr-2' : "mr-2"} `}>
                                            <div
                                                key={index}
                                                className={`h-8 w-8 rounded-full bg-blue-800 cursor-pointer border-white border-[4px] hover:bg-blue-900`}
                                                style={{ backgroundColor: color, }}
                                                onClick={() => handleColorSelect(color)}
                                            ></div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="mt-5 text-blue-400 cursor-pointer">Colors (Loading...)</p>
                                )}
                            </div>

                            {/*  Frame size buttons */}
                            <div>
                                {/* <label for="framesize" className="block mb-2 text-base font-semibold text-gray-800 font-sans">Frame Size</label> */}
                                <div className="flex justify-center h-5 mt-5 items-center mb-5">
                                    <button
                                        className={`mr-2 py-1 px-6 rounded-sm ${frameSize === 'small'
                                            ? 'bg-red-700 text-white'
                                            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                                            }`}
                                        onClick={() => handleSizeSelect('small')}
                                    >
                                        S
                                    </button>
                                    <button
                                        className={`mx-2 py-1 px-6 rounded-sm ${frameSize === 'medium'
                                            ? 'bg-red-700 text-white'
                                            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                                            }`}
                                        onClick={() => handleSizeSelect('medium')}
                                    >
                                        M
                                    </button>
                                    <button
                                        className={`ml-2 py-1 px-6 rounded-sm ${frameSize === 'large'
                                            ? 'bg-red-700 text-white'
                                            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                                            }`}
                                        onClick={() => handleSizeSelect('large')}
                                    >
                                        L
                                    </button>
                                </div>
                            </div>


                            <div className="max-h-24 w-full mt-2 description-box overflow-hidden">
                                <p className=" text-base overflow-hidden text-ellipsis">{product.description}</p>
                            </div>
                            {product && product.priceInfo ? (
                                <p className="font-bold text-2xl mt-5 ">{product.priceInfo.price} {product.priceInfo.currency}</p>

                            ) : (
                                <p className="mt-5 text-blue-400 cursor-pointer">
                                    price (Loading...)
                                </p>
                            )}
                            <span className="flex space-x-2 mt-4 cursor-pointer items-center">
                                <FaCheckCircle size={15} color="green" />
                                <p className="text-green-500">Shipping & returns</p>
                            </span>
                            <span className="flex space-x-2 cursor-pointer items-center">
                                <FaCheckCircle size={15} color="green" />
                                <p className="text-green-500">100% money-back guarantee</p>
                            </span>
                            {/* buttons */}
                            <div className="flex justify-center items-center w-full flex-col text-center mt-10 mb-10">
                                <button onClick={handleSelectLensClick} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Select Lens</button>
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
                        {product && product.reviewsInformation ? (
                            <p className="text-sm ml-4 text-blue-400">Based on {product.reviewsInformation.total_reviews} Reviews</p>
                        ) : (
                            <p className="mt-5 text-blue-400 cursor-pointer">colors (Loading...)</p>

                        )}
                        <button onClick={() => {
                            if (userHasOrderedProduct) {
                                setHideReviewBox(!hideReviewBox)
                            } else {
                                alert("Place the Order First");
                            }
                        }}
                            className=" py-1 px-4 rounded inline-flex items-center 
                                            bg-transparent hover:bg-gray-700 text-gray-700 font-semibold 
                                             hover:text-white border border-gray-500 hover:border-transparent ">
                            <BiEdit size={20} class="mr-2" />
                            <span>Write a Review</span>
                        </button>
                    </div>

                    {/* reviews box */}
                    <div className={` ${hideReviewBox ? 'hidden' : ''}`}>
                        <div className="">
                            <input value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)} id='reviewTitle' className="block w-full pl-5 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border-2 rounded-md
                            focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out" placeholder="Review Title" type="Text" />
                        </div>
                        <div>
                            <textarea value={reviewDescription} onChange={(e) => setReviewDescription(e.target.value)} className="block w-full p-2 pr-3 borderblock px-4 py-2.5 mt-2  bg-white rounded-md
                                    focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                                    sm:text-sm transition duration-150 ease-in-out border-2"
                                placeholder="Write Your Review" id="w3review" name="w3review" rows="4" cols="50">
                            </textarea>
                        </div>
                        <div className="flex flex-col justify-center items-center mt-6">
                            {/* star rating input */}
                            <Box
                                sx={{
                                    width: 200,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Rating
                                    name="hover-feedback"
                                    value={value}
                                    precision={0.5}
                                    getLabelText={getLabelText}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    onChangeActive={(event, newHover) => {
                                        setHover(newHover);
                                    }}
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                {value !== null && (
                                    <div className="ml-4 rounded-lg bg-blue-200 flex items-center justify-center w-30 h-8">
                                        <Box sx={{ ml: 2, mr: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                                    </div>

                                )}
                            </Box>
                            <button onClick={submitReview} className="mt-10 py-1 px-4 rounded inline-flex items-center 
                                            bg-transparent hover:bg-gray-700 text-gray-700 font-semibold 
                                             hover:text-white border border-gray-500 hover:border-transparent ">
                                <span>Submit</span>
                            </button>

                        </div>
                    </div>

                    <hr className="mt-10"></hr>
                </div>



                {/* customers reviews */}
                <div className="w-[80%] mx-auto mb-20">
                    {reviews.map((review, index) => (
                        <div className="mt-5">
                            <div className="flex items-center space-x-3">
                                <img src={API_URL + "/uploads/profile_images/" + review.user.profilePicture} alt="" className='w-[40px] h-[40px] rounded-xl' />
                                <h3 className="font-semibold">{review.user.firstName} {review.user.lastName}</h3>
                            </div>
                            <div className="ml-12">
                                <div className="product-rating font-bold text-xl text-yellow-500">
                                    {renderStars()}
                                    <span className="rating">{review.starts}</span>
                                </div>
                                <h1 className="font-semibold">{review.user_review_title}</h1>
                                <p className="text-base font-sans">
                                    {review.user_review_description}
                                </p>
                                <p className="text-sm text-blue-400 mt-2 mb-4">
                                    {new Date(review.date).toLocaleDateString()} {/* Formats date to "MM/DD/YYYY" */}
                                </p>
                            </div>
                            <hr></hr>
                        </div>
                    ))}
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
