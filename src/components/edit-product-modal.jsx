import { useState } from "react";
import { editProduct } from "../store/productSlice";
import { useDispatch } from "react-redux";
export function EditProductModal({ product, setIsEditModalOpen }) {
  const [editedTitle, setEditedTitle] = useState(product.title);
  const [editedPrice, setEditedPrice] = useState(product.price);
  const [editedImage, setEditedImage] = useState(product.image);
  const dispatch = useDispatch();
  const handleSave = () => {
    handleEditProduct(product.id, {
      title: editedTitle,
      price: editedPrice,
      image: editedImage,
    });
  };
  const handleEditProduct = (productId, updatedInfo) => {
    dispatch(editProduct({ id: productId, updatedInfo }));
    setIsEditModalOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-20">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="text"
            value={editedImage}
            onChange={(e) => setEditedImage(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            value={editedPrice}
            onChange={(e) => setEditedPrice(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="flex justify-end gap-2 font-medium">
          <button
            className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 cursor-pointer"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-white text-gray-500 px-3 py-2 rounded-md cursor-pointer border border-gray-400 hover:text-gray-600"
            onClick={() => setIsEditModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
