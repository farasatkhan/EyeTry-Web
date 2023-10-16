import React, { useEffect, useState } from "react";
import { viewAllReviews, viewProductsList } from "../../../api/productsApi";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from "../../../config/config";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import banner from '../../../assets/images/products/banner.jpg'
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
    const [selectedFaceShape, setSelectedFaceShape] = useState("All Shapes");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(5000);
    const [selectedCategory , setSelectedCategory] = useState("All Categories");
    const [selectedRim , setSelectedRim] = useState("All Rims");

    useEffect(() => {
        fetchProductsList();
    }, []);

    useEffect(() => {
        setFilteredProducts(productsList);
    }, [productsList]);

    const fetchProductsList = async () => {
        try {
            const fetchedProductsList = await viewProductsList();
            setProductsList(fetchedProductsList);

            const productRatingsData = await Promise.all(
                fetchedProductsList.map(async (product) => {
                    const response = await viewAllReviews(product._id);
                    const reviews = response.data;
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
        navigate(`/product_details/${id}`);
    };

    const handleFilterHover = (filterName) => {
        setActiveFilter(filterName);
    };

    const handleFilterLeave = () => {
        setActiveFilter(null);
    };


    const handleFilter = ({ color, material, size, gender, shape, faceShape ,minPrice, maxPrice, category, rim }) => {   // face shape remaining
        setFilterColor(color);
        setFilterMaterial(material);
        setSelectedSize(size);
        setSelectedGender(gender);
        setSelectedShape(shape);
        setSelectedFaceShape(faceShape);
        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
        setSelectedCategory(category);
        setSelectedRim(rim);

        console.log("Filters: " + color + ", " + material + ", " + size + ", " + gender + ", " + shape +
         ", " + faceShape + ", " + minPrice + ", " + maxPrice + ", " + category + ", " + rim )

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
                            variant.colorName &&
                            variant.colorName.toLowerCase() === color.toLowerCase()
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
                faceShape === "All Shapes" ||
                (product && product.person_information.face_shape.includes(faceShape || faceShape.toLowerCase()));
            
            const categoryMatch =
                category === "All Categories" ||
                (product && (product.categories.includes(category) || product.type.includes(category)));
            
                // const rimMatch =
                // category === "All Rims" ||
                // (product && (product.rim_shape === rim || product.rim_shape === rim.toLowerCase()));
            

            return colorMatch && materialMatch && sizeMatch && genderMatch && shapeMatch && faceShapeMatch && categoryMatch &&
                (product.priceInfo.price >= minPrice && // Price filtering
                product.priceInfo.price <= maxPrice) 
        });

        setFilteredProducts(filtered);
    };


    // products colors handling:
    const handleColorSelect = (productId, color, category) => {
          setSelectedColorsFeatured({
            ...selectedColorsFeatured,
            [productId]: color,
          });

      };


    const { page } = useParams();

    return (
        <>
            <div className="bg-gray-50">
                <div className="relative">
                    <img src={banner} className="w-full" alt="" />
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h2 className="text-white text-3xl font-sans font-semibold ">
                            {page === "featured_products" ? "Featured Products" : "Products"}
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
                                onMouseLeave={handleFilterLeave}
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
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        className="p-1 flex flex-wrap items-center justify-center mb-[500px]"
                    >
                        {filteredProducts.map((product) => (
                            <div class="flex-shrink-0 m-6 relative overflow-hidden rounded-lg max-w-xs shadow-sm bg-white cursor-pointer">
                                <div onClick={() => handleNavigation(product._id)}>
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
                                                    {product.frame_information.frame_variants.map((variant) => (
                                                        <div
                                                            className={`border-gray-300 rounded-full mr-1 ${selectedColorsFeatured[product._id] === variant.color
                                                                ? "border-[2px] bg-blue-900"
                                                                : ""
                                                                }`}
                                                        >
                                                            <div
                                                                className={`h-6 w-6 rounded-full bg-blue-800 cursor-pointer border-white border-[3px] hover:bg-blue-900`}
                                                                style={{ backgroundColor: variant.color }}
                                                                onClick={() =>
                                                                    handleColorSelect(product._id, variant.color, "featured")
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
                                    <div onClick={() => handleNavigation(product._id)} className="product-rating font-bold text-base text-yellow-500 justify-between flex mx-auto mt-[4px]">
                                        <Rating
                                            name={`rating-${product._id}`}
                                            value={productRatings[product._id] || 0}
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
                                            <div class="ml-auto"><p className=" font-sans text-base font-bold text-red-600">{product.discount}% off</p></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </>
    );
};

export default Products;
