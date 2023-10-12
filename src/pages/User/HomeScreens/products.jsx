import React, { useEffect, useState } from "react";
import { viewAllReviews, viewProductsList } from "../../../api/productsApi";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from "../../../config/config";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

const Products = () => {

    const [productsList, setProductsList] = useState([]);
    const [productRatings, setProductRatings] = useState({}); // Store product ratings
    const [selectedColorsFeatured, setSelectedColorsFeatured] = useState({});


    useEffect(() => {
        fetchProductsList();
    }, []);

    const fetchProductsList = async () => {
        try {
            const fetchedProductsList = await viewProductsList();
            setProductsList(fetchedProductsList);

            // for new arrivals
            //   const oneHourAgo = new Date();
            //   oneHourAgo.setHours(oneHourAgo.getHours() - 1);
            //   const arrivals = fetchedProductsList.filter(product => new Date(product.createdAt) >= oneHourAgo);
            //   console.log('new arrivals: ' + JSON.stringify(arrivals, null, 2));
            //   setNewArrivals(arrivals);

            //   // for men sunglasses
            //   const fetchMenSunglasses = fetchedProductsList.filter(product => product.type === "Sunglasses" && product.categories.includes("Men"));
            //   setMenSunglasses(fetchMenSunglasses);
            //   console.log('fetchMenSunglasses: ' + JSON.stringify(fetchMenSunglasses, null, 2));

            //   // for men sunglasses
            //   const fetchWomenSunglasses = fetchedProductsList.filter(product => product.type === "Sunglasses" && product.categories.includes("Women"));
            //   setWomenSunglasses(fetchWomenSunglasses);
            //   console.log('fetchWomenSunglasses: ' + JSON.stringify(fetchWomenSunglasses, null, 2));


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

    // function to set image
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
        }
        // } else {
        //   setSelectedColorsNewArrivals({
        //     ...selectedColorsNewArrivals,
        //     [productId]: color,
        //   });
        // }
    };

    const { page } = useParams()

    // filters
    const [activeFilter, setActiveFilter] = useState(null);

    const handleFilterHover = (filterName) => {
      setActiveFilter(filterName);
    };
  
    const handleFilterLeave = () => {
      setActiveFilter(null);
    };
  
    const filters = [
      {
        name: 'Colors',
        options: ['All Colors', 'Red', 'Blue'], // Add more color options here
        settings: (
            <div className="mt-4">
            <label>Opacity</label>
            <input type="range" min="0" max="100" step="10" />
          </div>
        )


      },
      {
        name: 'Material',
        options: ['Acetate', 'Metal', 'Stainless Steel', 'Titanium', 'TR90', 'Plastic'], // Add more material options here
        settings: (
          <div className="mt-4">
            <label>Thickness</label>
            <input type="range" min="0" max="10" step="1" />
          </div>
        )
      }
      // Add more filter categories here
    ];


    return (
        <>


<div className="bg-gray-800 p-4 flex items-center space-x-4 whitespace-no-wrap">
      {filters.map((filter) => (
        <div
          key={filter.name}
          className="relative group cursor-pointer"
          onMouseEnter={() => handleFilterHover(filter.name)}
          onMouseLeave={handleFilterLeave}
        >
          <span className="text-white">{filter.name}</span>
          {activeFilter === filter.name && (
            <div className="absolute left-0 p-4 bg-white shadow-lg z-50">
              <ul className="space-y-2">
                {filter.options.map((option, index) => (
                  <li key={index}>
                    <span className="text-gray-700 hover:text-indigo-600">{option}</span>
                  </li>
                ))}
              </ul>
              {filter.settings}
            </div>
          )}
        </div>
      ))}
    </div>




            <div className="bg-gray-50 ">
                <div className="mx-auto">
                    <div class="text-center p-10">
                        <h1 class="font-semibold font-sans text-4xl mb-4">{
                            page === "featured_products" ? 'Featured Products' : 'Products'
                        }</h1>
                    </div>




                    <section id="Projects"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        // className="w-full mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-items-center justify-center gap-y-20 gap-x-5 mt-10 mb-5">
                        className="p-1 flex flex-wrap items-center justify-center mt-500">
                        {productsList && productsList.map((product) => (

                            <div class="flex-shrink-0 m-6 relative overflow-hidden rounded-lg max-w-xs shadow-lg bg-white">

                                {productImage(
                                    product,
                                    selectedColorsFeatured[product._id] ||
                                    (product.frame_information &&
                                        product.frame_information.frame_variants[0].color)
                                )}
                                {/* product details section */}
                                <div className="px-4">
                                    {/* color palet */}
                                    <div className="">
                                        {product.frame_information &&
                                            product.frame_information.frame_variants ? (
                                            <>
                                                <div className="flex mt-2">
                                                    {product.frame_information.frame_variants.map((variant) => (
                                                        <div
                                                            className={`border-grey rounded-full mr-1 ${selectedColorsFeatured[product._id] === variant.color
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
                                    <div className="product-rating font-bold text-base text-yellow-500 justify-between flex mx-auto mt-[3px]">
                                        <Rating
                                            name={`rating-${product._id}`}
                                            value={productRatings[product._id] || 0} // Use the calculated average rating
                                            readOnly
                                            precision={0.1}
                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                        />
                                        <p className="text-base">{productRatings[product._id]}</p>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center">
                                            <p class="text-lg font-sans text-black truncate block capitalize">{product.name}</p>
                                            <span class="text-gray-400 font-sans uppercase text-xs">{product.manufacturer}</span>
                                        </div>
                                        <div class="flex items-center mb-2">
                                            <p class="text-lg font-semibold text-black cursor-auto">${product.priceInfo.price}</p>
                                            <del>
                                                <p class="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                                            </del>
                                            <div class="ml-auto"><p className=" font-sans text-base font-bold text-red-600" >{product.discount}% off</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                        }
                    </section>
                </div>
            </div>
        </>
    )
}

export default Products;