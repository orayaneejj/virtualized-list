import { createSlice } from "@reduxjs/toolkit";

const loadProductsFromLocalStorage = () => {
  const products = localStorage.getItem("products");
  return products ? JSON.parse(products) : [];
};

const saveProductsToLocalStorage = (products) => {
  localStorage.setItem("products", JSON.stringify(products));
};

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: loadProductsFromLocalStorage(),
    hasNextPage: true,
    page: 1,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      saveProductsToLocalStorage(state.products);
    },
    updateHasNextPage: (state, action) => {
      state.hasNextPage = action.payload;
    },
    updatePage: (state, action) => {
      state.page = action.payload;
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      saveProductsToLocalStorage(state.products);
    },
    editProduct: (state, action) => {
      state.products = state.products.map((product) =>
        product.id === action.payload.id
          ? { ...product, ...action.payload.updatedInfo }
          : product
      );
      saveProductsToLocalStorage(state.products);
    },
  },
});

export const {
  setProducts,
  updateHasNextPage,
  updatePage,
  removeProduct,
  editProduct,
} = productsSlice.actions;
export default productsSlice.reducer;
