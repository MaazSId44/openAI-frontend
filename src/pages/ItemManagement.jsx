// Updated: ItemManagement.jsx
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchItems } from "../features/items/itemSlice";
import ItemList from "../components/ItemList";
import ItemFormModal from "../components/ItemFormModal";
import Button from "../reuseable/Button";

function ItemManagement() {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Item Management</h1>
        <Button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Add Item
        </Button>
      </div>
      <ItemList />
      {modalOpen && <ItemFormModal closeModal={() => setModalOpen(false)} />}
    </div>
  );
}

export default ItemManagement;
