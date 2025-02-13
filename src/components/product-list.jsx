import React from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import usePagination from "../hooks/usePagination";

const ProductList = () => {
  const { products, hasNextPage, loadMoreProducts } = usePagination();

  const isProductLoaded = (index) => index < products.length;

  const Row = ({ index, style }) => {
    if (!isProductLoaded(index)) {
      return (
        <div
          style={style}
          className="grid grid-cols-4 items-center p-4 border-b border-gray-200 animate-pulse"
        >
          <div className="flex items-center space-x-4 col-span-2">
            <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
            <div className="flex flex-col space-y-2">
              <div className="h-4 bg-gray-300 rounded w-32"></div>
              <div className="h-4 bg-gray-300 rounded w-24"></div>
            </div>
          </div>

          <div className="h-4 bg-gray-300 rounded w-16"></div>

          <div className="h-8 bg-gray-300 rounded-full w-8 ml-auto"></div>
        </div>
      );
    }

    const product = products[index];
    return (
      <div
        style={style}
        className="grid grid-cols-4 items-center p-4 border-b border-gray-200 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center space-x-4 col-span-2">
          <img
            src={product.image}
            alt={product.title}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <h2 className="text-lg font-semibold text-gray-800 w-1/2">
            {product.title}
          </h2>
        </div>

        <p className="text-sm text-gray-600 ">${product.price}</p>

        <div className="flex justify-end">
          <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h.01M12 12h.01M19 12h.01"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="virtualized-wrapper p-6 bg-[#f6f8fa] rounded-3xl shadow-md w-full border border-gray-200 max-w-7xl mt-5">
      <div className="grid grid-cols-4 items-center p-4 border-b border-gray-200 bg-[#ecf0f3] rounded-t-lg text-gray-600">
        <span className="text-lg font-semibold col-span-2">Products</span>
        <span className="text-lg font-semibold">Price</span>
      </div>

      <InfiniteLoader
        isItemLoaded={isProductLoaded}
        itemCount={hasNextPage ? products.length + 6 : products.length}
        loadMoreItems={loadMoreProducts}
      >
        {({ onItemsRendered, ref }) => (
          <List
            height={600}
            itemCount={hasNextPage ? products.length + 6 : products.length}
            itemSize={120}
            width="100%"
            onItemsRendered={onItemsRendered}
            ref={ref}
          >
            {Row}
          </List>
        )}
      </InfiniteLoader>
    </div>
  );
};

export default ProductList;
