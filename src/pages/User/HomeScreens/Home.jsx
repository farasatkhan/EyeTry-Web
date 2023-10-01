import React, { useEffect, useState } from "react";
import API_URL from "../../../config/config";
import { useNavigate } from "react-router-dom";
import { viewProductsList } from "../../../api/productsApi";

const Home = () => {
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    fetchProductsList();
  }, []);


  const fetchProductsList = async () => {
    try {
      const fetchedProductsList = await viewProductsList();
      setProductsList(fetchedProductsList);
    } catch (error) {
      console.error("Error fetching products list", error);
    }
  };

  const productImage = (product) => {
    if (
      product &&
      product.frame_information &&
      product.frame_information.frame_variants &&
      product.frame_information.frame_variants[0] &&
      product.frame_information.frame_variants[0].images &&
      product.frame_information.frame_variants[0].images[0]
    ) {
      const path = product.frame_information.frame_variants[0].images[0];

      const completePath = API_URL + path;
      console.log(completePath)

      return (
        <div className="mt-2">
          <img src={completePath} alt="product" className="" />
        </div>
      );
    }

    // Return a placeholder or handle the case where image data is missing
    return <div className="mt-2">Image not available</div>;
  };

    const navigate = useNavigate()
    // Function to handle navigation to product details
    const handleNavigation = (id) => {
      console.log(id)
      navigate(`/product_details/${id}`);
    };

  return (
    <>
      <p>Home Page</p>
      <div className="h-200 mx-auto mb-20 mt-20 w-[20%]  bg-gray-300 cursor-pointer">
        {productsList.map((product) => (
          <div onClick={() => handleNavigation(product._id)} key={product._id} className=" justify-center items-center flex flex-col">
            {/* Display product information */}
            <div className="h-400 w-[100%] overflow-hidden mr-2 shrink-0">
              {productImage(product)}
            </div>
            <p>{product.name}</p>
            <p>{product.type}</p>
            {product.frame_information && product.frame_information.frame_variants ? (
              <>
                <p>{product.frame_information.frame_variants[0].color}</p>
                <p>{product.frame_information.frame_variants[0].quantity}</p>
              </>
            ) : (
              <>
                <p>Color not available</p>
                <p>Quantity not available</p>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
