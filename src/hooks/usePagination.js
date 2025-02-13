import { useState, useCallback } from "react";
import axios from "axios";

const usePagination = (initialPage = 1, productsPerPage = 10) => {
  const [products, setProducts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [page, setPage] = useState(initialPage);

  const loadMoreProducts = useCallback(async () => {
    if (!hasNextPage) return;

    try {
      const response = await axios.get(`https://fakestoreapi.com/products`, {
        params: {
          limit: productsPerPage,
          page: page,
        },
      });

      if (response.data.length > 0) {
        setProducts((prevProducts) => [...prevProducts, ...response.data]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasNextPage(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [hasNextPage, page, productsPerPage]);

  return {
    products,
    hasNextPage,
    loadMoreProducts,
  };
};

export default usePagination;
