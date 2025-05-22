import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, fetchItems } from "../features/items/itemSlice";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import Button from "../reuseable/Button";

const ItemList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.items);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  // Show modal when clicking delete
  const confirmDelete = (id) => {
    setSelectedId(id);
    setShowConfirmModal(true);
  };

  // Actual delete handler
  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      setDeleteLoading(true);
      const res = await dispatch(deleteItem(selectedId));
      const response = res?.payload;

      if (response?.success) {
        toast.success(response.message || "Item deleted successfully");
        dispatch(fetchItems());
      } else {
        toast.error(response?.message || "Failed to delete item");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setDeleteLoading(false);
      setShowConfirmModal(false);
      setSelectedId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <ClipLoader size={35} color="#3B82F6" />
      </div>
    );
  }

  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden relative">
      {!items?.length ? (
        <p className="p-4">No items found.</p>
      ) : (
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Description</th>
              <th className="text-right px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item, idx) => (
              <tr
                key={item._id}
                className={`border-t ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.description}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => confirmDelete(item._id)}
                    disabled={deleteLoading}
                    className="text-red-600 hover:underline disabled:opacity-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={() => {
            if (!deleteLoading) {
              setShowConfirmModal(false);
              setSelectedId(null);
            }
          }}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-6">Are you sure you want to delete this item?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setSelectedId(null);
                }}
                disabled={deleteLoading}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
              >
                Cancel
              </button>

              <Button
                type="button"
                onClick={handleDelete}
                variant="cancel"
                disabled={deleteLoading}
              >
                {deleteLoading && (
                  <ClipLoader size={16} color="#fff" className="mr-2" />
                )}
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemList;
