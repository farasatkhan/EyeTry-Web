const PriceFilter = ({ minPrice, maxPrice, onPriceChange }) => {
    const handleMinPriceChange = (e) => {
        const newMinPrice = e.target.value;
        onPriceChange(newMinPrice, maxPrice);
    };

    const handleMaxPriceChange = (e) => {
        const newMaxPrice = e.target.value;
        onPriceChange(minPrice, newMaxPrice);
    };

    return (
        <>
            <div className="absolute left-0 p-2 bg-white rounded-md shadow-lg z-50 w-[300px]">
                <div className="space-y-2">
                    <div className="rounded-sm py-1 px-1">
                        <div className="cursor-pointer flex items-center">
                            <label htmlFor="minPrice" className="font-sans mr-2">
                                Min Price:
                            </label>
                            <input
                                type="number"
                                id="minPrice"
                                value={minPrice}
                                onChange={handleMinPriceChange}
                                className="cursor-text w-20 h-8 border-gray-300 rounded-md px-2 border"
                            />
                        </div>
                    </div>
                    <div className="rounded-sm py-1 px-1">
                        <div className="cursor-pointer flex items-center">
                            <label htmlFor="maxPrice" className="font-sans mr-2">
                                Max Price:
                            </label>
                            <input
                                type="number"
                                id="maxPrice"
                                value={maxPrice}
                                onChange={handleMaxPriceChange}
                                className="w-20 h-8 cursor-text border-gray-300 rounded-md px-2 border"
                            />
                        </div>
                    </div>
                    <div className="rounded-sm py-1 px-1">
                        <div className="cursor-pointer flex items-center">
                            <label className="font-sans mr-2">Price Range:</label>
                            <input
                                type="range"
                                min="0"
                                max="5000" // Adjust the max value as needed
                                value={maxPrice} // Use maxPrice for the value
                                onChange={handleMaxPriceChange}
                                className="cursor-pointer w-40 h-6 border-gray-300 rounded-md px-2"
                            />

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PriceFilter;
