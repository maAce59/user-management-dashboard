// src/components/UserModal.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { useAddUserMutation } from "../store/usersApi";

export default function UserModal({ isOpen, onClose, onUserAdded }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [addUser, { isLoading }] = useAddUserMutation();

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    try {
      const response = await addUser({
        name: `${data.first_name} ${data.last_name}`,
        email: data.email,
        avatar: data.avatar,
      }).unwrap();

      const newUserObject = {
        id: response.id || Date.now(),
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        avatar: data.avatar,
      };

      onUserAdded(newUserObject);
      reset();
      onClose();
    } catch (err) {
      console.error("Failed to save the user:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative border border-gray-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-5">Add New User</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">
              First Name
            </label>
            <input
              type="text"
              placeholder="e.g. John"
              {...register("first_name", { required: "First name is required" })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {errors.first_name && (
              <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">
              Last Name
            </label>
            <input
              type="text"
              placeholder="e.g. Doe"
              {...register("last_name", { required: "Last name is required" })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {errors.last_name && (
              <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">
              Email
            </label>
            <input
              type="email"
              placeholder="e.g. john.doe@reqres.in"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address"
                }
              })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">
              Avatar Image URL
            </label>
            <input
              type="url"
              placeholder="https://reqres.in/img/faces/1-image.jpg"
              {...register("avatar", { required: "Avatar URL is required" })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {errors.avatar && (
              <p className="text-red-500 text-xs mt-1">{errors.avatar.message}</p>
            )}
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition-colors cursor-pointer text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors cursor-pointer text-sm disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}