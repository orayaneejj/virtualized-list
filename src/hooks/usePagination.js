import { useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  updateHasNextPage,
  updatePage,
} from "../store/productSlice";

const usePagination = (initialPage = 1, productsPerPage = 20) => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  const hasNextPage = useSelector((state) => state.products.hasNextPage);
  const page = useSelector((state) => state.products.page);

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
        dispatch(setProducts([...products, ...response.data]));
        dispatch(updatePage(page + 1));
      } else {
        dispatch(updateHasNextPage(false));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [hasNextPage, page, productsPerPage, dispatch, products]);

  return {
    products,
    hasNextPage,
    loadMoreProducts,
  };
};

export default usePagination;
