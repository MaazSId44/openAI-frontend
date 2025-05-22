import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/items/itemSlice';

const ItemForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description) return;
    await dispatch(addItem(formData));
    setFormData({ name: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mb-4">
      <h2 className="text-xl font-semibold mb-2">Add New Item</h2>
      <input
        type="text"
        name="name"
        placeholder="Item Name"
        value={formData.name}
        onChange={handleChange}
        className="border p-2 w-full mb-2 rounded"
      />
      <textarea
        name="description"
        placeholder="Item Description"
        value={formData.description}
        onChange={handleChange}
        className="border p-2 w-full mb-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Item
      </button>
    </form>
  );
};

export default ItemForm;
