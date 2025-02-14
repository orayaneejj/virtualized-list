import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/productSlice"; 

export function AddProductModal({ setIsAddModalOpen }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();

  const handleAddProduct = () => {
    if (!title || !price || !image) {
      alert("Please fill the input");
      return;
    }

    const newProduct = {
      id: Date.now(), 
      title,
      price: Number(price),
      image,
    };

    dispatch(addProduct(newProduct));
    setIsAddModalOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-20 bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="flex justify-end gap-2 font-medium">
          <button
            className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 cursor-pointer"
            onClick={handleAddProduct}
          >
            Add
          </button>
          <button
            className="bg-white text-gray-500 px-3 py-2 rounded-md cursor-pointer border border-gray-400 hover:text-gray-600"
            onClick={() => setIsAddModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
