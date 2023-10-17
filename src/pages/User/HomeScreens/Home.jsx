import React, { useEffect, useState } from "react";
import API_URL from "../../../config/config";
import { useNavigate } from "react-router-dom";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
// Import rating components
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { viewAllReviews, viewProductsList } from "../../../api/productsApi";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/dist/css/splide.min.css";
import menSunglassesImage from '../../../assets/images/products/menSunglasses.jpg'
import womenSunglassesImage from '../../../assets/images/products/womenSunglasses.jpg'
import kidsGlasses from '../../../assets/images/products/kidsGlasses.png'
import menGlasses from '../../../assets/images/products/menGlasses.jpg'
import womenGlasses from '../../../assets/images/products/womenGlasses.png'
import shopByFace from '../../../assets/images/products/shopByFace.jpg'
import shopByStyle from '../../../assets/images/products/shopByStyle.jpg'
import glassesColor from '../../../assets/images/products/glassesColor.jpg'
import logo from '../../../assets/images/Logo/logo.png'

import faceShapeAnalysis from '../../../assets/images/ExclusiveFeatures/faceShapeAnalysis.jpg'
import ipdMeasurement from '../../../assets/images/ExclusiveFeatures/ipdMeasurement.png'
import virtualTryOn from '../../../assets/images/ExclusiveFeatures/virtualTryOn.png'
import vissionAssessments from '../../../assets/images/ExclusiveFeatures/visionAcuity.jpg'
import 'aos/dist/aos.css'; // Import the AOS CSS
import banner1 from '../../../assets/images/products/banner1.jpg'
import banner2 from '../../../assets/images/products/banner2.jpg'
import HashLoader from "react-spinners/HashLoader";

export default () => {

  const items = [
    {
      imageUrl: banner1,
    },
    {
      imageUrl: banner2,
    },
  ];

  const exclusiveFeatures = [
    {
      imageUrl: faceShapeAnalysis,
      text: 'Face Shape Analysis', // Add text for the first image
      info: 'Our frame finder feature uses advanced facial recognition technology to analyze your unique facial features and suggest the best eyeglass frames for your face shape. By simply uploading a photo of yourself, our system can identify key features and recommend frames that will complement your unique facial structure. '
    },
    {
      imageUrl: ipdMeasurement,
      text: 'IPD Measurement', // Add text for the second image
      info: 'Your IPD is a key factor in achieving optimal vision through your eyeglasses. An incorrect IPD measurement can lead to discomfort, headaches, and distorted vision. Our technology ensures that your IPD is taken into account, so the eyeglass frames we recommend aesthetically pleasing, functional and enhancing your visual experience.'
    },
    {
      imageUrl: virtualTryOn,
      text: 'Virtual Try-On', // Add text for the third image
      info: 'Our visual assessment feature is designed to help you assess your vision and determine whether you need glasses or a new prescription. Using a series of simple and intuitive tests, our system measures your visual acuity, color vision, depth perception, and other key factors that contribute to good vision. '

    },
    {
      imageUrl: vissionAssessments,
      text: 'Vision Assessments', // Add text for the fourth image
      info: 'Our visual assessment feature is designed to help you assess your vision and determine whether you need glasses or a new prescription. Using a series of simple and intuitive tests, our system measures your visual acuity, color vision, depth perception, and other key factors that contribute to good vision. '
    },
  ];

  const [productsList, setProductsList] = useState([]);
  // const [selectedColors, setSelectedColors] = useState({});
  const [productRatings, setProductRatings] = useState({}); // Store product ratings
  const [newArrivals, setNewArrivals] = useState([]);
  const [selectedColorsFeatured, setSelectedColorsFeatured] = useState({});
  const [selectedColorsNewArrivals, setSelectedColorsNewArrivals] = useState({});
  const [menSunglasses, setMenSunglasses] = useState([])
  const [womenSunglasses, setWomenSunglasses] = useState([])


  // // animation
  // useEffect(() => {
  //   AOS.init({
  //     duration: 2000,
  //     once: false, // Make sure "once" is set to false
  //     // offset: 100,
  //     delay: 1000,
  //   });
  // }, []);


  // AOS.refresh(); // Refresh AOS when content changes



  useEffect(() => {
    fetchProductsList();
  }, []);

  const fetchProductsList = async () => {
    try {
      const fetchedProductsList = await viewProductsList();
      setProductsList(fetchedProductsList);

      // for new arrivals
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // Subtract 7 days to go back one week
      const arrivals = fetchedProductsList.filter(product => new Date(product.createdAt) >= oneWeekAgo);
      console.log('new arrivals: ' + JSON.stringify(arrivals, null, 2));
      setNewArrivals(arrivals);


      // for men sunglasses
      const fetchMenSunglasses = fetchedProductsList.filter(product => product.type === "Sunglasses" && product.categories.includes("Men"));
      setMenSunglasses(fetchMenSunglasses);
      console.log('fetchMenSunglasses: ' + JSON.stringify(fetchMenSunglasses, null, 2));

      // for men sunglasses
      const fetchWomenSunglasses = fetchedProductsList.filter(product => product.type === "Sunglasses" && product.categories.includes("Women"));
      setWomenSunglasses(fetchWomenSunglasses);
      console.log('fetchWomenSunglasses: ' + JSON.stringify(fetchWomenSunglasses, null, 2));


      // Fetch and calculate product ratings for each product
      const productRatingsData = await Promise.all(
        fetchedProductsList.map(async (product) => {
          const response = await viewAllReviews(product._id);
          const reviews = response.data;
          const sum = reviews.reduce((total, review) => total + review.stars, 0);
          const averageRating = sum / reviews.length;
          return { productId: product._id, rating: averageRating };
        })
      );

      // Convert product ratings data to an object
      const ratingsObject = {};
      productRatingsData.forEach((item) => {
        ratingsObject[item.productId] = item.rating;
      });

      setProductRatings(ratingsObject);
    } catch (error) {
      console.error("Error fetching products list", error);
    }
  };

  const productImage = (product, color) => {
    if (
      product &&
      product.frame_information &&
      product.frame_information.frame_variants
    ) {
      const variant = product.frame_information.frame_variants.find(
        (variant) => variant.color === color
      );

      if (variant && variant.images && variant.images[0]) {
        const path = variant.images[0];
        const completePath = API_URL + path;
        return (
          <div className="">
            <img
              src={completePath}
              alt="product"
              className="object-contain w-[300px] h-[200px]"
            />
          </div>
        );
      }
    }

    // Return a placeholder or handle the case where image data is missing
    return <div className="mt-2">Image not available</div>;

  };

  const newArrivalImage = (product, color) => {
    if (
      product &&
      product.frame_information &&
      product.frame_information.frame_variants
    ) {
      const variant = product.frame_information.frame_variants.find(
        (variant) => variant.color === color
      );

      if (variant && variant.images && variant.images[0]) {
        const path = variant.images[0];
        const completePath = API_URL + path;
        return (
          <div className="">
            <img
              src={completePath}
              alt="product"
              className="object-contain w-[300px] h-[200px]"
            />
          </div>
        );
      }
    }

    // Return a placeholder or handle the case where image data is missing
    return <div className="mt-2">Image not available</div>;

  };


  // const sunglassesImage = (product) => {
  //   if (
  //     product
  //   ) {
  //     const variant = product.frame_information.frame_variants[0]


  //     if (variant && variant.images && variant.images[0]) {
  //       const path = variant.images[0];
  //       const completePath = API_URL + path;
  //       return (
  //         <div className="">
  //           <img
  //             src={completePath}
  //             alt="product"
  //             className="object-contain"
  //           />
  //         </div>
  //       );
  //     }
  //   }

  //   // Return a placeholder or handle the case where image data is missing
  //   return <div className="mt-2">Image not available</div>;
  // };

  const navigate = useNavigate();
  const handleNavigation = (id) => {
    console.log(id)
    navigate(`/product_details/${id}`);
  };

  const handleColorSelect = (productId, color, category) => {
    if (category == "featured") {
      setSelectedColorsFeatured({
        ...selectedColorsFeatured,
        [productId]: color,
      });
    } else {
      setSelectedColorsNewArrivals({
        ...selectedColorsNewArrivals,
        [productId]: color,
      });
    }
  };

  // handle navigations
  const handleNavigate = (page) => {
    navigate(`/products/${page}`)
  }

  // loading spinners
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }, [])


  return (

    <>
      {

        loading ?

          (
            <div className="bg-white flex justify-center items-center h-screen">
              <HashLoader

                color={"#0891b2"}
                loading={loading}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>

          )

          :

          (
            <div className="bg-white flex-1">
              <Carousel>
                {items.map((item, i) => (
                  <Paper key={i}>
                    <img className="w-full h-[300px] md:h-[450px] lg:h-[500px] xl:h-[600px] object-fit" src={item.imageUrl} alt={`Image ${i + 1}`} />
                  </Paper>
                ))}
              </Carousel>
              <div className="w-[80%] mx-auto">

                {/* featured products */}
                <div>
                  <div data-aos="fade-up">
                    <h1 className="font-sans text-3xl text-gray-500 font-semibold mx-auto text-center mt-10">Featured Products</h1>
                    <div class="h-1 w-full mt-2 mb-5 bg-blue-400 lg:w-1/3 mx-auto rounded-full"></div>
                    <p className="font-sans text-sm mx-auto text-justify text-gray-500 font-semibold">The most excellent online eyeglasses and eyeglass frames are offered at Easy Sight, your one-stop
                      online store. We offer a wide range of high-quality items because we know how important it is for
                      you to access stylish and affordable eyewear. We provide options for everyone, whether you need
                      prescription or non-prescription sunglasses. Finding the ideal set of eyeglasses frames that fit
                      your style, personality, and budget is simple with the help of our easy-to-use website. We have
                      everything you want, glasses from timelessly elegant designs to the newest techniques.</p>
                  </div>

                  <Splide data-aos="fade-up"
                    className="mx-auto w-[420px] md:w-[680px] lg:w-[700px] xl:w-[1350px]"
                    options={{
                      perPage: 4,
                      gap: '2rem',
                      perMove: 1,
                      cover: true,
                      lazyLoad: 'nearby',
                      pagination: false,
                      breakpoints: {
                        1024: {
                          perPage: 3,
                          gap: '1rem',
                        },
                        768: {
                          perPage: 2,
                          gap: '.7rem',
                        },
                        480: {
                          perPage: 1,
                          gap: '.7rem',
                        },
                      },
                      rewind: true,
                    }}
                    aria-label="My Favorite Images"
                  >
                    {productsList.map((product) => (
                      <SplideSlide className="" key={product._id}>
                        <div
                          className="items-center justify-center flex flex-col"
                        >
                          <div className="" >
                            <div onClick={() => handleNavigation(product._id)} className="cursor-pointer items-center justify-center flex flex-col mx-auto">
                              {productImage(
                                product,
                                selectedColorsFeatured[product._id] ||
                                (product.frame_information &&
                                  product.frame_information.frame_variants[0].color)
                              )}
                            </div>
                            {/* color palet */}
                            <div className="">
                              {product.frame_information &&
                                product.frame_information.frame_variants ? (
                                <>
                                  <div className="flex mt-2">
                                    {product.frame_information.frame_variants.map((variant) => (
                                      <div
                                        className={`border-grey rounded-full  mr-2 ${selectedColorsFeatured[product._id] === variant.color
                                          ? 'border-[2px] bg-blue-900'
                                          : ''
                                          }`}
                                      >
                                        <div
                                          className={`h-7 w-7 rounded-full bg-blue-800 cursor-pointer border-white border-[4px] hover:bg-blue-900`}
                                          style={{ backgroundColor: variant.color }}
                                          onClick={() => handleColorSelect(product._id, variant.color, "featured")}

                                        ></div>
                                      </div>
                                    ))}
                                  </div>
                                </>
                              ) : (
                                <>
                                  <p>Color not available</p>
                                </>
                              )}
                            </div>
                            {/* Display product ratings */}
                            <div className="">
                              <div className="product-rating font-bold text-base text-yellow-500 justify-between flex mx-auto">
                                <Rating
                                  name={`rating-${product._id}`}
                                  value={productRatings[product._id] || 0} // Use the calculated average rating
                                  readOnly
                                  precision={0.1}
                                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                <p className="text-base">{productRatings[product._id]}</p>
                              </div>
                              <div className="">
                                <div className="flex justify-between items-center">
                                  <p class="text-lg font-sans text-black block capitalize truncate w-[100px]">{product.name}</p>
                                  <span class="text-gray-400 font-sans uppercase text-xs whitespace-nowrap ">{product.manufacturer}</span>
                                </div>
                                <div class="flex items-center mb-2">
                                  <p class="text-lg font-semibold text-black cursor-auto">${product.priceInfo.price}</p>
                                  <del>
                                    <p class="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                                  </del>
                                  <div class="ml-auto"><p className=" font-sans text-base font-bold text-red-600">{product.discount}% off</p></div>
                                </div>
                              </div>

                            </div>
                          </div>


                        </div>
                      </SplideSlide>
                    ))}
                  </Splide>

                  {/* view more button */}
                  <div data-aos="fade-up" onClick={() => handleNavigate("featured_products")}
                    className=" mx-auto flex justify-center mt-10">
                    <button class="py-1 px-4 rounded inline-flex items-center 
                        bg-transparent hover:bg-gray-700 text-gray-700 font-semibold 
                        hover:text-white border border-gray-500 hover:border-transparent ">
                      <span>View All </span>
                    </button>
                  </div>
                </div>

                {/* categories */}
                <div data-aos="fade-up">
                  <div className="flex items-center justify-center mx-auto mt-10">
                    <h1 className="font-sans text-3xl text-gray-500 font-semibold  text-center">Eyewear for everyone ™ </h1>
                    <img data-aos="zoom-in" src={logo} className=" ml-1 w-[50px] h-[30px] object-contain" alt="" />
                  </div>
                  <div class="h-1 w-full mt-2 mb-5 bg-blue-400 lg:w-[45%] mx-auto rounded-full shadow-lg"></div>
                  <p className="font-sans text-sm mx-auto text-center text-gray-500 font-semibold">Get a complete pair of prescription glasses</p>
                </div>
                <div data-aos="fade-up" className="flex flex-col space-y-2 mx-auto mt-10">
                  <div className="flex flex-wrap">
                    <div onClick={() => handleNavigate('men_glasses')} className="w-full md:w-1/3 px-1 relative group cursor-pointer">
                      <img data-aos="zoom-in" src={menGlasses} className="w-full h-[300px] object-cover" alt="" />
                      <div class="absolute inset-0 flex items-center justify-center opacity-100 transition-opacity">
                        <button class="bg-black bg-opacity-50 text-white py-2 px-4 rounded-lg">Shop Now</button>
                      </div>
                      <div className="flex items-center mt-5 mb-5 justify-between">
                        <p className="font-sans text-2xl text-gray-700 font-semibold">Men's Eyeglasses</p>
                      </div>
                    </div>
                    <div onClick={() => handleNavigate('women_glasses')} className="w-full md:w-1/3 px-1 relative group cursor-pointer">
                      <img data-aos="zoom-in" src={womenGlasses} className="w-full h-[300px] object-cover" alt="" />
                      <div class="absolute inset-0 flex items-center justify-center opacity-100 transition-opacity">
                        <button class="bg-black bg-opacity-50 text-white py-2 px-4 rounded-lg">Shop Now</button>
                      </div>
                      <div className="flex items-center mt-5 mb-5 justify-between">
                        <p className="font-sans text-2xl text-gray-700 font-semibold">Women's Eyeglasses</p>
                      </div>
                    </div>
                    <div onClick={() => handleNavigate('kids_glasses')} className="w-full md:w-1/3 px-1 relative group cursor-pointer">
                      <img data-aos="zoom-in" src={kidsGlasses} className="w-full h-[300px] object-cover" alt="" />
                      <div class="absolute inset-0 flex items-center justify-center opacity-100 transition-opacity">
                        <button class="bg-black bg-opacity-50 text-white py-2 px-4 rounded-lg">Shop Now</button>
                      </div>
                      <div className="flex items-center mt-5 mb-5 justify-between">
                        <p className="font-sans text-2xl text-gray-700 font-semibold">Kid's Eyeglasses</p>
                      </div>
                    </div>
                    <div onClick={() => handleNavigate('shop_by_frame_color')} className="w-full md:w-1/3 px-1 relative group cursor-pointer">
                      <img data-aos="zoom-in" src={glassesColor} className="w-full h-[300px] object-cover" alt="" />
                      <div class="absolute inset-0 flex items-center justify-center opacity-100 transition-opacity">
                        <button class="bg-black bg-opacity-50 text-white py-2 px-4 rounded-lg">Shop Now</button>
                      </div>
                      <div className="flex items-center mt-5 mb-5 justify-between">
                        <p className="font-sans text-2xl text-gray-700 font-semibold">Shop By Frame Color</p>
                      </div>
                    </div>
                    <div onClick={() => handleNavigate('shop_by_face_shape')} className="w-full md:w-1/3 px-1 relative group cursor-pointer">
                      <img data-aos="zoom-in" src={shopByFace} className="w-full h-[300px] object-cover" alt="" />
                      <div class="absolute inset-0 flex items-center justify-center opacity-100 transition-opacity">
                        <button class="bg-black bg-opacity-50 text-white py-2 px-4 rounded-lg">Shop Now</button>
                      </div>
                      <div className="flex items-center mt-5 mb-5 justify-between">
                        <p className="font-sans text-2xl text-gray-700 font-semibold">Shop By Face Shape</p>
                      </div>
                    </div>
                    <div onClick={() => handleNavigate('shop_by_frame_shape')} className="w-full md:w-1/3 px-1 relative group cursor-pointer">
                      <img data-aos="zoom-in" src={shopByStyle} className="w-full h-[300px] object-cover" alt="" />
                      <div class="absolute inset-0 flex items-center justify-center opacity-100 transition-opacity">
                        <button class="bg-black bg-opacity-50 text-white py-2 px-4 rounded-lg">Shop Now</button>
                      </div>
                      <div className="flex items-center mt-5 mb-5 justify-between">
                        <p className="font-sans text-2xl text-gray-700 font-semibold">Shop By Frame Shape</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* New Arrival */}
                <div>
                  <div data-aos="fade-up">
                    <h1 className="font-sans text-3xl text-gray-500 font-semibold mx-auto text-center mt-10">New Arrival</h1>
                    <div class="h-1 w-full mt-2 mb-5 bg-blue-400 lg:w-1/3 mx-auto rounded-full shadow-lg"></div>
                    <p className="font-sans text-sm mx-auto text-justify text-gray-500 font-semibold">Everyone should have access
                      to high-quality eyewear, according to Easy Sight. We put a lot of effort into choosing the most fashionable and
                      long-lasting eyeglass frames available. High-quality materials are used to construct our goods to guarantee
                      durability and wear ability. We offer the ideal option for you, whether you need a set of glasses for regular
                      usage or a special event. In addition to helping you discover the best glasses for your requirements, our team
                      of professionals is always accessible to answer any questions you may have. Therefore, why wait? Experience
                      the greatest online eyeglass and frame purchasing at Easy Sight right now!</p>
                  </div>

                  <Splide data-aos="fade-up"
                    className="mx-auto w-[420px] md:w-[680px] lg:w-[800px] xl:w-[1350px]"
                    options={{
                      perPage: 4,
                      gap: '2rem',
                      perMove: 1,
                      cover: true,
                      lazyLoad: 'nearby',
                      pagination: false,
                      breakpoints: {
                        1024: {
                          perPage: 3,
                          gap: '1rem',
                        },
                        768: {
                          perPage: 2,
                          gap: '.7rem',
                        },
                        480: {
                          perPage: 1,
                          gap: '.7rem',
                        },
                      },
                      rewind: true,
                    }}
                    aria-label="My Favorite Images"
                  >
                    {newArrivals.map((product) => (
                      <SplideSlide className="" key={product._id}>
                        <div
                          className="items-center justify-center flex flex-col"
                        >
                          <div className="" >
                            <div onClick={() => handleNavigation(product._id)} className="cursor-pointer items-center justify-center flex flex-col mx-auto">
                              {newArrivalImage(
                                product,
                                selectedColorsNewArrivals[product._id] ||
                                (product.frame_information &&
                                  product.frame_information.frame_variants[0].color)
                              )}
                            </div>

                            {/* color palet */}
                            {product.frame_information &&
                              product.frame_information.frame_variants ? (
                              <>
                                <div className="flex mt-2">
                                  {product.frame_information.frame_variants.map((variant) => (
                                    <div
                                      className={`border-grey rounded-full  mr-2 ${selectedColorsNewArrivals[product._id] === variant.color
                                        ? 'border-[2px] bg-blue-900'
                                        : ''
                                        }`}
                                    >
                                      <div
                                        className={`h-7 w-7 rounded-full bg-blue-800 cursor-pointer border-white border-[4px] hover:bg-blue-900`}
                                        style={{ backgroundColor: variant.color }}
                                        onClick={() =>
                                          handleColorSelect(product._id, variant.color)
                                        }
                                      ></div>
                                    </div>
                                  ))}
                                </div>
                              </>
                            ) : (
                              <>
                                <p>Color not available</p>
                              </>
                            )}
                            {/* Display product ratings */}
                            <div className="">
                              <div className="product-rating font-bold text-base text-yellow-500 justify-between flex mx-auto">
                                <Rating
                                  name={`rating-${product._id}`}
                                  value={productRatings[product._id] || 0} // Use the calculated average rating
                                  readOnly
                                  precision={0.1}
                                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                <p className="text-base">{productRatings[product._id]}</p>
                              </div>
                              {/* <div className=" flex justify-between">
                                <p className="font-sans text-base" >{product.name}</p>
                                <p className="font-sans text-lg font-semibold" >${product.priceInfo.price}</p>
                              </div> */}
                              <div className="">
                                <div className="flex justify-between items-center">
                                  <p class="text-lg font-sans text-black block capitalize truncate w-[100px]">{product.name}</p>
                                  <span class="text-gray-400 font-sans uppercase text-xs whitespace-nowrap ">{product.manufacturer}</span>
                                </div>
                                <div class="flex items-center mb-2">
                                  <p class="text-lg font-semibold text-black cursor-auto">${product.priceInfo.price}</p>
                                  <del>
                                    <p class="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                                  </del>
                                  <div class="ml-auto"><p className=" font-sans text-base font-bold text-red-600">{product.discount}% off</p></div>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </SplideSlide>
                    ))}
                  </Splide>
                  {/* view more button */}
                  <div data-aos="fade-up"
                    className=" mx-auto flex justify-center mt-10">
                    <button onClick={() => handleNavigate('new_arrival')} class="py-1 px-4 rounded inline-flex items-center 
                        bg-transparent hover:bg-gray-700 text-gray-700 font-semibold 
                        hover:text-white border border-gray-500 hover:border-transparent ">
                      <span>View All </span>
                    </button>
                  </div>

                </div>


                {/* Sunglasses & Fashion */}

                <div data-aos="fade-up">
                  <h1 className="font-sans text-3xl text-gray-500 font-semibold mx-auto text-center mt-10">Fashion & Prescription Sunglasses</h1>
                  <div class="h-1 w-full mt-2 mb-5 bg-blue-400 lg:w-1/2 mx-auto rounded-full shadow-lg"></div>
                  <p className="font-sans text-sm mx-auto  text-gray-500 font-semibold text-center">Sun rays and Style needs with and without power lens are extremely essential
                    for each and every one. Enjoy all solutions at one place in an exclusive variety</p>
                </div>

                {/* Men Sunglasses  */}
                <div className="flex space-x-3 justify-center items-center mx-auto mt-10 w-[420px] md:w-[680px] lg:w-[800px] xl:w-[1200px]">
                  <div className="w-[50%]">
                    <div onClick={() => handleNavigate('men_sunglasses')} class="relative group cursor-pointer">
                      <img data-aos="zoom-in" src={menSunglassesImage} class="w-full object-cover h-[345px]" alt="" />
                      <div class="absolute inset-0 flex items-center justify-center opacity-100 transition-opacity">
                        <button class="bg-black bg-opacity-50 text-white py-2 px-4 rounded-lg">View All</button>
                      </div>
                    </div>
                    <Splide data-aos="fade-up"
                      className=""
                      options={{
                        perPage: 2,
                        gap: '2rem',
                        perMove: 1,
                        cover: true,
                        lazyLoad: 'nearby',
                        pagination: false,
                        arrows: false,
                        autoplay: true, // Enable auto-play
                        interval: 1500,
                        breakpoints: {
                          780: {
                            perPage: 1,
                            gap: '.7rem',
                          },
                        },
                        rewind: true,
                      }}
                      aria-label="My Favorite Images"
                    >
                      {menSunglasses.map((product) => (
                        <SplideSlide className="" key={product._id}>
                          <div
                            className="items-center justify-center flex flex-col"
                          >
                            <div className="" >
                              <div onClick={() => handleNavigation(product._id)} className="cursor-pointer items-center justify-center flex flex-col mx-auto">
                                {productImage(
                                  product,
                                  selectedColorsNewArrivals[product._id] ||
                                  (product.frame_information &&
                                    product.frame_information.frame_variants[0].color)
                                )}
                              </div>
                              {/* color palet */}
                              {product.frame_information &&
                                product.frame_information.frame_variants ? (
                                <>
                                  <div className="flex mt-2">
                                    {product.frame_information.frame_variants.map((variant) => (
                                      <div
                                        className={`border-grey rounded-full  mr-2 ${selectedColorsNewArrivals[product._id] === variant.color
                                          ? 'border-[2px] bg-blue-900'
                                          : ''
                                          }`}
                                      >
                                        <div
                                          className={`h-7 w-7 rounded-full bg-blue-800 cursor-pointer border-white border-[4px] hover:bg-blue-900`}
                                          style={{ backgroundColor: variant.color }}
                                          onClick={() =>
                                            handleColorSelect(product._id, variant.color)
                                          }
                                        ></div>
                                      </div>
                                    ))}
                                  </div>
                                </>
                              ) : (
                                <>
                                  <p>Color not available</p>
                                </>
                              )}
                              {/* Display product ratings */}
                              <div className="">
                                <div className="product-rating font-bold text-base text-yellow-500 justify-between flex mx-auto">
                                  <Rating
                                    name={`rating-${product._id}`}
                                    value={productRatings[product._id] || 0} // Use the calculated average rating
                                    readOnly
                                    precision={0.1}
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                  />
                                  <p className="text-base">{productRatings[product._id]}</p>
                                </div>
                                {/* <div className=" flex justify-between">
                                  <div className="flex">
                                    <p className="font-sans text-base" >{product.name}</p>
                                    <p className="ml-2 font-sans text-base font-bold text-red-600" >{product.discount}% off</p>
                                  </div>
                                  <p className="font-sans text-lg font-semibold" >${product.priceInfo.price}</p>
                                </div> */}
                                <div className="">
                                  <div className="flex justify-between items-center">
                                    <p class="text-lg font-sans text-black block capitalize truncate w-[100px]">{product.name}</p>
                                    <span class="text-gray-400 font-sans uppercase text-xs whitespace-nowrap ">{product.manufacturer}</span>
                                  </div>
                                  <div class="flex items-center mb-2">
                                    <p class="text-lg font-semibold text-black cursor-auto">${product.priceInfo.price}</p>
                                    <del>
                                      <p class="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                                    </del>
                                    <div class="ml-auto"><p className=" font-sans text-base font-bold text-red-600">{product.discount}% off</p></div>
                                  </div>
                                </div>
                              </div>
                            </div>


                          </div>
                        </SplideSlide>
                      ))}
                    </Splide>
                  </div>

                  {/* Women Sunglasses */}
                  <div className="w-[50%]">
                    <div onClick={() => handleNavigate('women_sunglasses')} class="relative group cursor-pointer">
                      <img data-aos="zoom-in" src={womenSunglassesImage} class="w-full object-cover h-[345px]" alt="" />
                      <div class="absolute inset-0 flex items-center justify-center opacity-100 transition-opacity">
                        <button class="bg-black bg-opacity-50 text-white py-2 px-4 rounded-lg">View All</button>
                      </div>
                    </div>
                    <Splide data-aos="fade-up"
                      className=""
                      options={{
                        perPage: 2,
                        gap: '2rem',
                        perMove: 1,
                        cover: true,
                        lazyLoad: 'nearby',
                        pagination: false,
                        arrows: false,
                        autoplay: true, // Enable auto-play
                        interval: 1500,
                        breakpoints: {
                          780: {
                            perPage: 1,
                            gap: '.7rem',
                          },
                        },
                        rewind: true,
                      }}
                      aria-label="My Favorite Images"
                    >
                      {womenSunglasses.map((product) => (
                        <SplideSlide className="" key={product._id}>
                          <div
                            className="items-center justify-center flex flex-col"
                          >
                            <div className="" >
                              <div onClick={() => handleNavigation(product._id)} className="cursor-pointer items-center justify-center flex flex-col mx-auto">
                                {productImage(
                                  product,
                                  selectedColorsNewArrivals[product._id] ||
                                  (product.frame_information &&
                                    product.frame_information.frame_variants[0].color)
                                )}
                              </div>
                              {/* color palet */}
                              {product.frame_information &&
                                product.frame_information.frame_variants ? (
                                <>
                                  <div className="flex mt-2">
                                    {product.frame_information.frame_variants.map((variant) => (
                                      <div
                                        className={`border-grey rounded-full  mr-2 ${selectedColorsNewArrivals[product._id] === variant.color
                                          ? 'border-[2px] bg-blue-900'
                                          : ''
                                          }`}
                                      >
                                        <div
                                          className={`h-7 w-7 rounded-full bg-blue-800 cursor-pointer border-white border-[4px] hover:bg-blue-900`}
                                          style={{ backgroundColor: variant.color }}
                                          onClick={() =>
                                            handleColorSelect(product._id, variant.color)
                                          }
                                        ></div>
                                      </div>
                                    ))}
                                  </div>
                                </>
                              ) : (
                                <>
                                  <p>Color not available</p>
                                </>
                              )}
                              {/* Display product ratings */}
                              <div className="">
                                <div className="product-rating font-bold text-base text-yellow-500 justify-between flex mx-auto">
                                  <Rating
                                    name={`rating-${product._id}`}
                                    value={productRatings[product._id] || 0} // Use the calculated average rating
                                    readOnly
                                    precision={0.1}
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                  />
                                  <p className="text-base">{productRatings[product._id]}</p>
                                </div>
                                {/* <div className=" flex justify-between">
                                  <div className="flex">
                                    <p className="font-sans text-base" >{product.name}</p>
                                    <p className="ml-2 font-sans text-base font-bold text-red-600" >{product.discount}% off</p>
                                  </div>
                                  <p className="font-sans text-lg font-semibold" >${product.priceInfo.price}</p>
                                </div> */}
                                <div className="">
                                  <div className="flex justify-between items-center">
                                    <p class="text-lg font-sans text-black block capitalize truncate w-[100px]">{product.name}</p>
                                    <span class="text-gray-400 font-sans uppercase text-xs whitespace-nowrap ">{product.manufacturer}</span>
                                  </div>
                                  <div class="flex items-center mb-2">
                                    <p class="text-lg font-semibold text-black cursor-auto">${product.priceInfo.price}</p>
                                    <del>
                                      <p class="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                                    </del>
                                    <div class="ml-auto"><p className=" font-sans text-base font-bold text-red-600">{product.discount}% off</p></div>
                                  </div>
                                </div>
                              </div>
                            </div>


                          </div>
                        </SplideSlide>
                      ))}
                    </Splide>
                  </div>

                </div>


                {/* Exclusive Features */}
                <div className="mb-20">

                  <div data-aos="fade-up">
                    <h1 className="font-sans text-3xl text-gray-500 font-semibold mx-auto text-center mt-10">Enhance Your Experience With Our Outstanding Features
                    </h1>
                    <div class="h-1 w-full mt-2 mb-5 bg-blue-400 lg:w-[75%] mx-auto rounded-full shadow-lg"></div>
                    <p className="mb-10 font-sans text-sm mx-auto text-center text-gray-500 font-semibold">Sun rays and Style needs with and without power lens are extremely essential
                      for each and every one. Enjoy all solutions at one place in an exclusive variety</p>
                  </div>

                  <Splide data-aos="fade-up"
                    options={{
                      type: "loop",
                      gap: "5px",
                      drag: "free",
                      arrows: false,
                      pagination: false,
                      perPage: 2,
                      autoScroll: {
                        pauseOnHover: false,
                        pauseOnFocus: false,
                        speed: 1
                      },
                      breakpoints: {
                        800: {
                          perPage: 1, // For screens with a width of 768px or greater
                        },

                      },
                    }}
                    extensions={{ AutoScroll }}
                    aria-label="My Favorite Images"
                  >
                    {exclusiveFeatures.map((item, index) => (
                      <SplideSlide key={index}>
                        <div className="relative group cursor-pointer h-76">
                          <img data-aos="zoom-in"
                            src={item.imageUrl}
                            alt={`Image ${index + 1}`}
                            className="w-full h-76 object-cover opacity-100 hover:opacity-70 transition-opacity duration-300"
                            style={{ height: '450px' }}
                          />
                          <div className="dark-overlay absolute inset-0 bg-black bg-opacity-20 hover:opacity-0 transition-opacity duration-300"></div>

                          <div className="absolute inset-x-0 h-48 bottom-0 flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-60">
                            <div className="text-white text-center p-4">
                              <h2 className="text-2xl font-bold mb-2">{item.text}</h2>
                              <p className="text-sm">{item.info}</p>
                              <button className="bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg mt-2">Try Now</button>
                            </div>
                          </div>
                        </div>
                      </SplideSlide>
                    ))}
                  </Splide>

                </div>
              </div>
            </div>
          )
      }
    </>


  );
};
