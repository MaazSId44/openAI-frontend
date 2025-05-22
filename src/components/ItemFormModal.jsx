import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem, fetchItems } from "../features/items/itemSlice";
import toast from "react-hot-toast";

import Button from "../reuseable/Button";
import TextField from "../reuseable/TextField";
import TextArea from "../reuseable/TextArea";

const ItemFormModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required.";
    if (!formData.description.trim())
      errs.description = "Description is required.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const res = await dispatch(addItem(formData));
      const response = res?.payload;
      if (response?.success) {
        toast.success(response.message || "Item added successfully");
        dispatch(fetchItems());
        closeModal();
      } else {
        toast.error(response?.message || "Failed to add item");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
          <TextArea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            error={errors.description}
          />
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              onClick={closeModal}
              variant="cancel"
              disabled={loading}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="primary"
              loading={loading}
              disabled={loading}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemFormModal;
