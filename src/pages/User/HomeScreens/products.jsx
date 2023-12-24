import React, { useEffect, useState } from "react";
import { viewAllReviews, viewProductsList } from "../../../api/productsApi";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from "../../../config/config";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import banner from '../../../assets/images/products/banner.webp'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { filters } from '../../../components/ui/User/ProductComponents/Filters'
import ColorsFilter from "../../../components/ui/User/ProductComponents/Colors";
import FrameMaterial from "../../../components/ui/User/ProductComponents/FrameMaterial";
import SizeFilter from "../../../components/ui/User/ProductComponents/FrameSize";
import GenderFilter from "../../../components/ui/User/ProductComponents/Gender";
import ShapeFilter from "../../../components/ui/User/ProductComponents/FrameShape"
import FaceShapeFilter from "../../../components/ui/User/ProductComponents/FaceShape"
import PriceFilter from "../../../components/ui/User/ProductComponents/Price"
import CategoryFilter from "../../../components/ui/User/ProductComponents/Categories"
import RimFilter from "../../../components/ui/User/ProductComponents/FrameRim"
import SyncLoader from "react-spinners/SyncLoader";

const Products = () => {
    const [productsList, setProductsList] = useState([]);
    const [productRatings, setProductRatings] = useState({});
    const [selectedColorsFeatured, setSelectedColorsFeatured] = useState({});
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [activeFilter, setActiveFilter] = useState(null);
    const [filterColor, setFilterColor] = useState("All Colors");
    const [filterMaterial, setFilterMaterial] = useState("All Materials");
    const [selectedSize, setSelectedSize] = useState("All Size");
    const [selectedGender, setSelectedGender] = useState("All Genders");
    const [selectedShape, setSelectedShape] = useState("All Shapes");
    const [selectedFaceShape, setSelectedFaceShape] = useState("All");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(5000);
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [selectedRim, setSelectedRim] = useState("All Rims");
    const [newArrivals, setNewArrivals] = useState([]);
    const [loading, setLoading] = useState(false);
    const { page } = useParams();


    useEffect(() => {
        fetchProductsList();
    }, []);

    useEffect(() => {
        setFilteredProducts(productsList);
    }, [productsList, page]);

    useEffect(() => {
        pageFilter();
    }, [productsList, page]);



    const fetchProductsList = async () => {
        try {
            setLoading(true);
            const fetchedProductsList = await viewProductsList();
            setProductsList(fetchedProductsList);

            // for new arrivals
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            const arrivals = fetchedProductsList.filter(product => new Date(product.createdAt) >= oneWeekAgo);
            setNewArrivals(arrivals);

            const productRatingsData = await Promise.all(
                fetchedProductsList.map(async (product) => {
                    const response = await viewAllReviews(product._id);
                    const reviews = response.data;

                    // Check if there are no reviews
                    if (reviews.length === 0) {
                        return { productId: product._id, rating: "No Reviews" };
                    }

                    const sum = reviews.reduce((total, review) => total + review.stars, 0);
                    const averageRating = sum / reviews.length;
                    return { productId: product._id, rating: averageRating };
                })
            );

            const ratingsObject = {};
            productRatingsData.forEach((item) => {
                ratingsObject[item.productId] = item.rating;
            });

            setProductRatings(ratingsObject);
            setLoading(false);
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
                            className="object-contain w-[300px] h-[200px] p-5"
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
        navigate(`/product_details/${id}`);
    };

    const handleFilterHover = (filterName) => {
        setActiveFilter(filterName);
    };

    const handleFilterLeave = (filterName) => {
        if (filterName === "Face Shape")
            setActiveFilter(filterName);
        else setActiveFilter(null)
    };


    const handleFilter = ({ color, material, size, gender, shape, faceShape, minPrice, maxPrice, category, rim }) => {
        setFilterColor(color);
        setFilterMaterial(material);
        setSelectedSize(size);
        console.log("Gender Selected from page A", gender)
        setSelectedGender(gender);
        setSelectedShape(shape);
        setSelectedFaceShape(faceShape);
        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
        setSelectedCategory(category);
        setSelectedRim(rim);

        console.log("Filters: " + color + ", " + material + ", " + size + ", " + gender + ", " + shape +
            ", " + faceShape + ", " + minPrice + ", " + maxPrice + ", " + category + ", " + rim)

        console.log("first product list: ", productsList)
        if (productsList) {
            const filtered = productsList.filter((product) => {
                if (color === "All Colors" && material === "All Materials"
                    && size === "All Size" && gender === "All Genders" &&
                    shape === "All Shapes" && faceShape === "All Shapes" &&
                    category === "All Categories" && rim === "All Rims" &&
                    (product.priceInfo.price >= minPrice && // Price filtering
                        product.priceInfo.price <= maxPrice)) {

                    return true;
                }
                const colorMatch =
                    color === "All Colors" ||
                    (product.frame_information &&
                        product.frame_information.frame_variants &&
                        product.frame_information.frame_variants.some(
                            (variant) =>
                                variant.color &&
                                variant.color.toLowerCase() === color.toLowerCase()
                        ));

                const materialMatch =
                    material === "All Materials" ||
                    (product.frame_information &&
                        product.frame_information.frame_variants &&
                        product.frame_information.frame_material &&
                        product.frame_information.frame_material.includes(material || material.toLowerCase()));

                const sizeMatch =
                    size === "All Size" ||
                    (product.frame_information &&
                        product.frame_information.frame_size &&
                        product.frame_information.frame_size &&
                        product.frame_information.frame_size.includes(size || size.toLowerCase()));

                const genderMatch =
                    gender === "All Genders" ||
                    (product && product.person_information.genders.includes(gender || gender.toLowerCase()));

                const shapeMatch =
                    shape === "All Shapes" ||
                    (product && (product.frame_shape === shape || product.frame_shape === shape.toLowerCase()));

                const faceShapeMatch =
                    faceShape === "All" ||
                    (product && product.person_information.face_shape.includes(faceShape || faceShape.toLowerCase()));

                const categoryMatch =
                    category === "All Categories" ||
                    (product && (product.categories.includes(category) || product.type.includes(category)));
                // const rimMatch =
                // category === "All Rims" ||
                // (product && (product.rim_shape === rim || product.rim_shape === rim.toLowerCase()));

                return (
                    colorMatch &&
                    materialMatch &&
                    sizeMatch &&
                    genderMatch &&
                    shapeMatch &&
                    faceShapeMatch &&
                    categoryMatch &&
                    (product.priceInfo.price >= minPrice &&
                        product.priceInfo.price <= maxPrice)
                );


            }
            )
            setFilteredProducts(filtered);
            console.log("page filtered products: ", filtered);

        };

    };


    // products colors handling:
    const handleColorSelect = (productId, color) => {
        setSelectedColorsFeatured({
            ...selectedColorsFeatured,
            [productId]: color,
        });

    };

    // handling Men eyeglasses category 


    const pageFilter = () => {

        switch (page) {
            case "men_glasses":
                handleFilter({
                    color: filterColor,
                    material: filterMaterial,
                    size: selectedSize,
                    gender: "Male",
                    shape: selectedShape,
                    faceShape: selectedFaceShape,
                    minPrice: minPrice,
                    maxPrice: maxPrice,
                    category: "Men",
                    rim: selectedRim
                });
                break;
            case "women_glasses":
                handleFilter({
                    color: filterColor,
                    material: filterMaterial,
                    size: selectedSize,
                    gender: "Female",
                    shape: selectedShape,
                    faceShape: selectedFaceShape,
                    minPrice: minPrice,
                    maxPrice: maxPrice,
                    category: "Women",
                    rim: selectedRim
                });
                break;
            case "kids_glasses":
                handleFilter({
                    color: filterColor,
                    material: filterMaterial,
                    size: selectedSize,
                    gender: "Kids",
                    shape: selectedShape,
                    faceShape: selectedFaceShape,
                    minPrice: minPrice,
                    maxPrice: maxPrice,
                    category: "Kids",
                    rim: selectedRim
                });
                break;
            case "Sunglasses":
                handleFilter({
                    color: filterColor,
                    material: filterMaterial,
                    size: selectedSize,
                    gender: selectedGender,
                    shape: selectedShape,
                    faceShape: selectedFaceShape,
                    minPrice: minPrice,
                    maxPrice: maxPrice,
                    category: "Sunglasses",
                    rim: selectedRim
                });
                break;
            case "Eyeglasses":
                handleFilter({
                    color: filterColor,
                    material: filterMaterial,
                    size: selectedSize,
                    gender: selectedGender,
                    shape: selectedShape,
                    faceShape: selectedFaceShape,
                    minPrice: minPrice,
                    maxPrice: maxPrice,
                    category: "Eyeglasses",
                    rim: selectedRim
                });
                break;
            case "men_eyeglasses":
                handleFilter({
                    color: filterColor,
                    material: filterMaterial,
                    size: selectedSize,
                    gender: "Male",
                    shape: selectedShape,
                    faceShape: selectedFaceShape,
                    minPrice: minPrice,
                    maxPrice: maxPrice,
                    category: "Eyeglasses",
                    rim: selectedRim
                });
                break;
            case "women_eyeglasses":
                handleFilter({
                    color: filterColor,
                    material: filterMaterial,
                    size: selectedSize,
                    gender: "Female",
                    shape: selectedShape,
                    faceShape: selectedFaceShape,
                    minPrice: minPrice,
                    maxPrice: maxPrice,
                    category: "Eyeglasses",
                    rim: selectedRim
                });
                break;
            case "kids_eyeglasses":
                handleFilter({
                    color: filterColor,
                    material: filterMaterial,
                    size: selectedSize,
                    gender: "Kids",
                    shape: selectedShape,
                    faceShape: selectedFaceShape,
                    minPrice: minPrice,
                    maxPrice: maxPrice,
                    category: "Eyeglasses",
                    rim: selectedRim
                });
                break;
            case "men_sunglasses":
                handleFilter({
                    color: filterColor,
                    material: filterMaterial,
                    size: selectedSize,
                    gender: "Male",
                    shape: selectedShape,
                    faceShape: selectedFaceShape,
                    minPrice: minPrice,
                    maxPrice: maxPrice,
                    category: "Sunglasses",
                    rim: selectedRim
                });
                break;
            case "women_sunglasses":
                handleFilter({
                    color: filterColor,
                    material: filterMaterial,
                    size: selectedSize,
                    gender: "Female",
                    shape: selectedShape,
                    faceShape: selectedFaceShape,
                    minPrice: minPrice,
                    maxPrice: maxPrice,
                    category: "Sunglasses",
                    rim: selectedRim
                });
                break;
            case "kids_sunglasses":
                handleFilter({
                    color: filterColor,
                    material: filterMaterial,
                    size: selectedSize,
                    gender: "Kids",
                    shape: selectedShape,
                    faceShape: selectedFaceShape,
                    minPrice: minPrice,
                    maxPrice: maxPrice,
                    category: "Sunglasses",
                    rim: selectedRim
                });
                break;
            case "new_arrival":
                setFilteredProducts(newArrivals)
                break;

            default:
                break;
        }

    }


    // cut price calculation
    const cutPrice = (price, discount) => {
        return (price - (price * discount) / 100).toFixed()
    }

    // handling view more button
    const [rowsToShow, setRowsToShow] = useState(12);

    const handleViewMore = () => {
        // Increase the number of rows to show by 3
        setRowsToShow(rowsToShow + 12);
    };


    return (
        <>
            <div className="bg-gray-50">
                <div className="relative">
                    <img src={banner} className="w-full" alt="" />
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h2 className="text-white text-3xl font-sans font-semibold ">
                            {page === "featured_products" ? "Featured Products"
                                : page === "new_arrival" ? "New Arrival"
                                    : page === "men_sunglasses" ? "Men Sunglasses"
                                        : page === "women_sunglasses" ? "Women Sunglasses"
                                            : page === "men_glasses" ? "Men's Eyeglasses"
                                                : page === "women_glasses" ? "Women's Eyeglasses"
                                                    : page === "kids_glasses" ? "Kids Eyeglasses"
                                                        : page === "Sunglasses" ? "Sunglasses"
                                                            : page === "Eyeglasses" ? "Eyeglasses"
                                                                : page === "shop_by_face_shape" ? (
                                                                    <div className="text-center">
                                                                        <p className="mx-auto">Shop By Face Shape</p>
                                                                        <p className="mx-auto font-mono text-lg">Select face shape filter to get recommendations on the basis of facial feature</p>
                                                                    </div>
                                                                )
                                                                    : page === "shop_by_frame_shape" ? (
                                                                        <div className="text-center">
                                                                            <p className="mx-auto">Shop By Frame Shape</p>
                                                                            <p className="mx-auto font-mono text-lg">Select frame shape filter to get the results based on selected frame shape</p>
                                                                        </div>
                                                                    )
                                                                        : page === "shop_by_frame_color" ? (
                                                                            <div className="text-center">
                                                                                <p className="mx-auto">Shop By Frame Color</p>
                                                                                <p className="mx-auto font-mono text-lg">Select frame color filter to get the results based on selected color</p>
                                                                            </div>
                                                                        ) : "All Products"}


                        </h2>
                    </div>
                </div>
                <div className="mx-auto">
                    <div className="bg-white shadow-sm p-4 flex items-center space-x-4 flex-wrap w-full justify-evenly">
                        {filters.map((filter) => (
                            <div
                                key={filter.name}
                                className="relative group cursor-pointer "
                                onMouseEnter={() => handleFilterHover(filter.name)}
                                onMouseLeave={() => handleFilterLeave(filter.name)}
                            >
                                <div className="flex items-center h-full transition duration-300 ease-in-out group-hover:text-blue-400">
                                    <span className="group-hover:text-blue-400 text-black font-mono ">
                                        {filter.name}
                                    </span>
                                    <span className="ml-2">
                                        {activeFilter === filter.name ? <FaChevronUp /> : <FaChevronDown />}
                                    </span>
                                </div>
                                {activeFilter === "Colors" && filter.name === "Colors" && (
                                    <ColorsFilter
                                        selectedColor={filterColor}
                                        onColorSelect={(color) => handleFilter({ color, material: filterMaterial, size: selectedSize, gender: selectedGender, shape: selectedShape, faceShape: selectedFaceShape, minPrice: minPrice, maxPrice: maxPrice, category: selectedCategory, rim: selectedRim })}
                                    />
                                )}


                                {activeFilter === "Material" && filter.name === "Material" && (
                                    <FrameMaterial
                                        selectedMaterial={filterMaterial}
                                        onMaterialSelect={(material) => handleFilter({ color: filterColor, material, size: selectedSize, gender: selectedGender, shape: selectedShape, faceShape: selectedFaceShape, minPrice: minPrice, maxPrice: maxPrice, category: selectedCategory, rim: selectedRim })}
                                    />
                                )}


                                {activeFilter === "Size" && filter.name === "Size" && (
                                    <SizeFilter
                                        selectedSize={selectedSize}
                                        onSizeSelect={(size) => handleFilter({ color: filterColor, material: filterMaterial, size, gender: selectedGender, shape: selectedShape, faceShape: selectedFaceShape, minPrice: minPrice, maxPrice: maxPrice, category: selectedCategory, rim: selectedRim })}
                                    />
                                )}

                                {activeFilter === "Gender" && filter.name === "Gender" && (
                                    <GenderFilter
                                        selectedGender={selectedGender}
                                        onGenderSelect={(gender) => handleFilter({ color: filterColor, material: filterMaterial, size: selectedSize, gender, shape: selectedShape, faceShape: selectedFaceShape, minPrice: minPrice, maxPrice: maxPrice, category: selectedCategory, rim: selectedRim })}
                                    />
                                )}

                                {activeFilter === "Frame Shape" && filter.name === "Frame Shape" && (
                                    <ShapeFilter
                                        selectedShape={selectedShape}
                                        onShapeSelect={(shape) => handleFilter({ color: filterColor, material: filterMaterial, size: selectedSize, gender: selectedGender, shape, faceShape: selectedFaceShape, minPrice: minPrice, maxPrice: maxPrice, category: selectedCategory, rim: selectedRim })}
                                    />
                                )}

                                {activeFilter === "Face Shape" && filter.name === "Face Shape" && (
                                    <FaceShapeFilter
                                        selectedShape={selectedFaceShape}
                                        onShapeSelect={(faceShape) => handleFilter({ color: filterColor, material: filterMaterial, size: selectedSize, gender: selectedGender, shape: selectedShape, faceShape, minPrice: minPrice, maxPrice: maxPrice, category: selectedCategory, rim: selectedRim })}
                                    />
                                )}

                                {activeFilter === "Price" && filter.name === "Price" && (
                                    <PriceFilter
                                        minPrice={minPrice}
                                        maxPrice={maxPrice}
                                        onPriceChange={(newMinPrice, newMaxPrice) => {
                                            setMinPrice(newMinPrice);
                                            setMaxPrice(newMaxPrice);
                                            handleFilter({
                                                color: filterColor,
                                                material: filterMaterial,
                                                size: selectedSize,
                                                gender: selectedGender,
                                                shape: selectedShape,
                                                faceShape: selectedFaceShape,
                                                minPrice: newMinPrice,
                                                maxPrice: newMaxPrice,
                                                category: selectedCategory,
                                                rim: selectedRim
                                            });
                                        }}
                                    />
                                )}

                                {activeFilter === "Category" && filter.name === "Category" && (
                                    <CategoryFilter
                                        selectedCategory={selectedCategory}
                                        onCategorySelect={(category) => handleFilter({ color: filterColor, material: filterMaterial, size: selectedSize, gender: selectedGender, shape: selectedShape, faceShape: selectedFaceShape, minPrice: minPrice, maxPrice: maxPrice, category, rim: selectedRim })}
                                    />
                                )}

                                {activeFilter === "Rim" && filter.name === "Rim" && (
                                    <RimFilter
                                        selectedRim={selectedRim}
                                        onRimSelect={(rim) => handleFilter({ color: filterColor, material: filterMaterial, size: selectedSize, gender: selectedGender, shape: selectedShape, faceShape: selectedFaceShape, minPrice: minPrice, maxPrice: maxPrice, category: selectedCategory, rim })}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <section
                        id="Projects"
                        className="p-1 flex flex-wrap items-center justify-center min-h-screen"
                    >
                        {
                            loading ? (
                                <div className="flex justify-center items-center p-20">
                                    <SyncLoader color="#0369a1" />
                                </div>

                            ) : (
                                filteredProducts.slice(0, rowsToShow).map((product, index) => (
                                    <div data-aos="fade-up" data-aos-duration="1000" key={index}
                                        className="flex-shrink-0 m-6 relative overflow-hidden rounded-lg max-w-xs shadow-sm bg-white cursor-pointer">
                                        <div className="justify-center flex" onClick={() => handleNavigation(product._id)}>
                                            {productImage(
                                                product,
                                                selectedColorsFeatured[product._id] ||
                                                (product.frame_information &&
                                                    product.frame_information.frame_variants[0].color)
                                            )}
                                        </div>
                                        {/* product details section */}
                                        <div className="px-4">
                                            {/* color palette */}
                                            <div className="">
                                                {product.frame_information &&
                                                    product.frame_information.frame_variants ? (
                                                    <>
                                                        <div className="flex mt-2 h-6 items-center">
                                                            {product.frame_information.frame_variants.map((variant, index) => (
                                                                <div
                                                                    key={index}
                                                                    className={`border-grey rounded-full  mr-2 ${selectedColorsFeatured[product._id] === variant.color
                                                                        ? 'border-[2px] bg-blue-900'
                                                                        : ''
                                                                        }`}
                                                                >
                                                                    <div
                                                                        className={`h-7 w-7 rounded-full bg-blue-800 cursor-pointer border-white border-[4px] hover:bg-blue-900`}
                                                                        style={{ backgroundColor: `${variant.color_code}` }}
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
                                            </div>
                                            <div onClick={() => handleNavigation(product._id)} className="product-rating font-bold text-base text-[#FAAF00] justify-between flex mx-auto mt-[5px]">
                                                <Rating
                                                    name={`rating-${product._id}`}
                                                    value={parseFloat(productRatings[product._id]) || 0}
                                                    readOnly
                                                    precision={0.1}
                                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                />
                                                <p className={`${productRatings[product._id] === "No Reviews" ? 'text-sm text-gray-400' : 'text-xl'} `}>{productRatings[product._id]}</p>
                                            </div>
                                            <div>

                                                <p className=" mt-[3px] text-lg font-sans text-black block capitalize whitespace-no-wrap overflow-hidden truncate">{product.name}</p>
                                                <div className="flex justify-between items-center">
                                                    {/* <p className="text-lg font-sans text-black truncate block capitalize">{product.name}</p> */}
                                                    <span className="mt-[4px]  mb-[4px] text-gray-400 font-sans uppercase text-sm whitespace-nowrap ">{product.manufacturer}</span>
                                                </div>
                                                <div className="flex items-center mb-2">
                                                    <p className="text-lg font-semibold text-black cursor-auto">${product.priceInfo.price}</p>
                                                    <del>
                                                        <p className="text-sm text-gray-600 cursor-auto ml-2">${cutPrice(product.priceInfo.price, product.discount)}</p>
                                                    </del>
                                                    <div className="ml-auto bg-gray-200 rounded-2xl p-1.5">
                                                        <p className={`font-sans text-xs font-bold ${product.discount > 0 ? 'text-green-600' : 'text-red-600 px-1'}`}>{product.discount}% off</p>
                                                    </div>                                        </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                    </section>
                    {filteredProducts.length > rowsToShow && (
                        <div className="flex justify-center mt-8 mb-32">
                            <button onClick={handleViewMore} className="py-1 px-4 rounded inline-flex items-center 
                        bg-transparent hover:bg-gray-700 text-gray-700 font-semibold 
                        hover:text-white border border-gray-500 hover:border-transparent ">
                                <span>View More </span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Products;
