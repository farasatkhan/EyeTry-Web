import React, { useState, useEffect } from "react";
import API_URL from "../../../config/config";


import StatusPill from "../../../components/ui/Admin/StatusPill";

import { BiEdit, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

const ProductsTable = ({ data, query }) => {
  const [pages, setPages] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
  });

  /*
    Page:1 0-4
    Page:2 5-9
    Page:3 10-14
    Page:4 15-19
    Page:5 20-24

    Suppose Current Page is 3 so (3 - 1) * 5 = 10 and ((3 - 1) * 5) + 5 = 15 thus 
    elements between 10 and 14 will be displayed on the page.
  */
  const [modifiedData, setModifiedData] = useState(
    data.slice(
      (pages.currentPage - 1) * pages.pageSize,
      (pages.currentPage - 1) * pages.pageSize + pages.pageSize
    )
  );

  useEffect(() => {
    setPages({ ...pages, totalPages: Math.ceil(data.length / pages.pageSize) });
  }, [data]);

  useEffect(() => {
    setModifiedData(
      data.slice(
        (pages.currentPage - 1) * pages.pageSize,
        (pages.currentPage - 1) * pages.pageSize + pages.pageSize
      )
    );
  }, [pages]);

  useEffect(() => {
    !!query
      ? setModifiedData(
          data
            .filter((product) =>
              product.productName.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 10)
          // Max Items to be displayed will be 10.
        )
      : setModifiedData(
          data.slice(
            (pages.currentPage - 1) * pages.pageSize,
            (pages.currentPage - 1) * pages.pageSize + pages.pageSize
          )
        );
  }, [query]);

  const totalPages = (totalPages) => {
    return Array.from({ length: totalPages }, (_, index) => (
      <div
        key={index}
        className="px-2 py-2 cursor-pointer"
        onClick={() => changePage(index + 1)}
      >
        <div
          className={`${
            pages.currentPage === index + 1 && "bg-blue-500"
          } rounded-md w-8 h-8 flex justify-center items-center`}
        >
          <p
            className={`${
              pages.currentPage === index + 1 && "text-white"
            } text-sm`}
          >
            {index + 1}
          </p>
        </div>
      </div>
    ));
  };

  const changePage = (page) => {
    if (page < 1 || page > pages.totalPages) return;

    setPages({ ...pages, currentPage: page });
  };

  const checkStatus = (stockStatus) => {
    if (stockStatus.is_in_stock) {
      return <StatusPill text="Available" type="primary" />;
    } else if (stockStatus.is_low_stock) {
      return <StatusPill text="Low Stock" type="danger" />;
    } else if (stockStatus.is_out_of_stock) {
      return <StatusPill text="Out of Stock" type="warning" />;
    } else if (stockStatus.is_to_be_announced) {
      return <StatusPill text="To be announced" type="primary" />;
    }
  };

  const totalStockInventory = (product) => {
    const quantities = product.frame_information.frame_variants.map(
      (item) => item.quantity
    );
    const totalQuantity = quantities.reduce((acc, curr) => acc + curr, 0);

    return totalQuantity;
  };

  const productImage = (product) => {
    const path = product.frame_information.frame_variants[0]?.images[0];

    const completePath = API_URL + path;

    return (
      <div className="mt-2">
        <img src={completePath} alt="product" className="" />
      </div>
    );
  };

  return (
    <>
      {/* relative overflow-x-auto */}
      <div className={`flex-grow relative overflow-x-auto`}>
        <table className="table-auto w-full text-left text-sm border-x">
          <thead className="text-sm bg-slate-100">
            <tr>
              <th scope="col" className="px-2 py-3 font-normal ">
                Product
              </th>
              <th scope="col" className="px-2 py-3 font-normal">
                Status
              </th>
              <th scope="col" className="px-2 py-3 font-normal ">
                Inventory
              </th>
              <th scope="col" className="px-2 py-3 font-normal ">
                SKU
              </th>
              <th scope="col" className="px-2 py-3 font-normal ">
                Type
              </th>
              <th scope="col" className="px-2 py-3 font-normal ">
                Manufacturer
              </th>
              <th scope="col" className="px-2 py-3 font-normal ">
                Edit
              </th>
              <th scope="col" className="px-2 py-3 font-normal ">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {modifiedData.map((product, index) => {
              return (
                <tr key={index} className="border-b">
                  <td className="px-2 py-1 ">
                    <div className="flex items-center cursor-pointer">
                      <div className="h-6 w-9 overflow-hidden mr-2 shrink-0">
                        {/* <img
                          src={Person}
                          alt="Person"
                          className="object-cover h-full w-full"
                        /> */}
                        {productImage(product)}
                      </div>
                      <div className="mt-1">
                        <p className="text-sm">{product.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-1 ">
                    {checkStatus(product.stock)}
                    {/* {product.status === "active" ? (
                      <div
                        className={`bg-primary-100 w-16 h-6 flex justify-center items-center rounded-full`}
                      >
                        <p className={`text-primary-900 text-xs`}>
                          {product.status}
                        </p>
                      </div>
                    ) : (
                      <div
                        className={`bg-danger-100 w-16 h-6 flex justify-center items-center rounded-full`}
                      >
                        <p className={`text-danger-900 text-xs`}>
                          {product.status}
                        </p>
                      </div>
                    )} */}
                  </td>
                  <td className="px-2 py-1">
                    <p className="">
                      <span className="font-semibold">
                        {totalStockInventory(product)}
                      </span>{" "}
                      items are in the inventory
                    </p>
                  </td>
                  <td className="px-2 py-1">
                    <p className="">{product.sku}</p>
                  </td>
                  <td className="px-2 py-1">
                    <p className="">{product.type}</p>
                  </td>
                  <td className="px-2 py-1">
                    <p>{product.manufacturer}</p>
                  </td>
                  <td className="px-2 py-1 cursor-pointer">
                    <Link to={`/products/${product._id}`}>
                      <BiEdit size={20} />
                    </Link>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between my-4">
        <div className="px-2 py-2">
          <p className="text-sm">
            Showing {modifiedData.length} of {data.length}
          </p>
        </div>
        <div className="flex gap-1">
          <div
            className="px-2 py-2 cursor-pointer bg-slate-100 rounded-md"
            onClick={() => changePage(pages.currentPage - 1)}
          >
            <div className="rounded-md w-8 h-8 flex justify-center items-center">
              <p
                className={`${
                  pages.currentPage <= 1 && "text-gray-500"
                } text-sm`}
              >
                Prev
              </p>
            </div>
          </div>
          {totalPages(pages.totalPages)}
          <div
            className="px-2 py-2 cursor-pointer bg-slate-100 rounded-md"
            onClick={() => changePage(pages.currentPage + 1)}
          >
            <div className="rounded-md w-8 h-8 flex justify-center items-center">
              <p
                className={`${
                  pages.currentPage >= pages.totalPages && "text-gray-500"
                } text-sm`}
              >
                Next
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsTable;
