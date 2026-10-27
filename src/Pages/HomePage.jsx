// src/Pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../store/usersApi";
import UserModal from "../components/UserModal";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  // Local state overrides so edits and newly added users show up instantly on cards
  const [localEdits, setLocalEdits] = useState({});
  const [localAddedUsers, setLocalAddedUsers] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { data, isLoading, isError, error } = useGetUsersQuery(page);
  const { data: singleUserData, isLoading: isDetailLoading } =
    useGetUserByIdQuery(selectedUserId, { skip: !selectedUserId });

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  useEffect(() => {
    if (editingUser) {
      setValue("first_name", editingUser.first_name);
      setValue("last_name", editingUser.last_name);
      setValue("email", editingUser.email);
      setValue("avatar", editingUser.avatar);
    }
  }, [editingUser, setValue]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-xl font-medium text-gray-600 animate-pulse">
          Loading users...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-red-500 font-semibold">
          Error loading users: {error?.error || "Something went wrong"}
        </p>
      </div>
    );
  }

  // Combine API users with local additions and apply local edit overrides
  const rawApiUsers = data?.data || [];
  const combinedUsers =
    page === 1 ? [...localAddedUsers, ...rawApiUsers] : rawApiUsers;
  const users = combinedUsers.map((user) =>
    localEdits[user.id] ? { ...user, ...localEdits[user.id] } : user,
  );

  const totalPages = data?.total_pages || 1;
  const userDetail = singleUserData?.data;

  const handleUserAdded = (newUser) => {
    setLocalAddedUsers((prev) => [newUser, ...prev]);
    setSuccessMessage(`User "${newUser.first_name}" created successfully!`);
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id).unwrap();
        setLocalAddedUsers((prev) => prev.filter((u) => u.id !== id));
        setSuccessMessage("User deleted successfully!");
        setTimeout(() => setSuccessMessage(""), 4000);
      } catch (err) {
        console.error("Failed to delete user:", err);
      }
    }
  };

  const handleUpdateSubmit = async (formData) => {
    try {
      await updateUser({
        id: editingUser.id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        avatar: formData.avatar,
      }).unwrap();

      setLocalEdits((prev) => ({
        ...prev,
        [editingUser.id]: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          avatar: formData.avatar,
        },
      }));

      setSuccessMessage(`User "${formData.first_name}" updated successfully!`);
      setEditingUser(null);
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            User Management Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage, view, edit, and create users seamlessly.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1.5 rounded-xl">
            Total Users: {(data?.total || 12) + localAddedUsers.length}
          </span>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-xl text-sm transition-colors cursor-pointer shadow-sm"
          >
            + Add User
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successMessage && (
        <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl flex items-center justify-between shadow-sm">
          <span className="text-sm font-medium">✨ {successMessage}</span>
          <button
            onClick={() => setSuccessMessage("")}
            className="text-emerald-600 hover:text-emerald-800 font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Add User Modal Component */}
      <UserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onUserAdded={handleUserAdded}
      />

      {/* Grid Layout for Users */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col justify-between"
          >
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-500 shadow-sm"
              />
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {user.first_name} {user.last_name}
                </h3>
                <p className="text-sm text-gray-500 truncate max-w-[180px]">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Medium-Sized Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 space-x-2">
              <button
                onClick={() => setSelectedUserId(user.id)}
                className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-2 px-3 rounded-xl text-sm transition-colors cursor-pointer text-center"
              >
                View
              </button>
              <button
                onClick={() => setEditingUser(user)}
                className="flex-1 bg-amber-50 hover:bg-amber-100 text-amber-600 font-medium py-2 px-3 rounded-xl text-sm transition-colors cursor-pointer text-center"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                disabled={isDeleting}
                className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 font-medium py-2 px-3 rounded-xl text-sm transition-colors cursor-pointer text-center disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 py-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm"
        >
          Previous
        </button>

        <span className="text-gray-700 font-medium">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm"
        >
          Next
        </button>
      </div>

      {/* --- VIEW DETAILS MODAL --- */}
      {selectedUserId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative border border-gray-100">
            <button
              onClick={() => setSelectedUserId(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
            >
              ✕
            </button>

            {(() => {
              const localUserMatch = localAddedUsers.find(
                (u) => u.id === selectedUserId,
              );

              // Ensure we only show userDetail if it matches the currently selected ID (prevents ghost flash)
              const displayUser =
                localUserMatch ||
                (singleUserData?.data?.id === selectedUserId
                  ? singleUserData.data
                  : null);

              if (!displayUser) {
                return (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-500 font-medium">
                      Loading user profile...
                    </p>
                  </div>
                );
              }

              return (
                <div className="flex flex-col items-center text-center">
                  <img
                    src={displayUser.avatar}
                    alt={`${displayUser.first_name} ${displayUser.last_name}`}
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-md mb-4"
                  />
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {displayUser.first_name} {displayUser.last_name}
                  </h2>
                  <p className="text-sm text-blue-600 font-medium mb-6">
                    {displayUser.email}
                  </p>
                  <button
                    onClick={() => setSelectedUserId(null)}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 rounded-xl transition-colors cursor-pointer text-sm"
                  >
                    Close
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      )}
      {/* --- EDIT USER MODAL --- */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative border border-gray-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingUser(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-5">
              Edit User Profile
            </h2>

            <form onSubmit={handleSubmit(handleUpdateSubmit)}>
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">
                  First Name
                </label>
                <input
                  type="text"
                  {...register("first_name", {
                    required: "First name is required",
                  })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                {errors.first_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.first_name.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">
                  Last Name
                </label>
                <input
                  type="text"
                  {...register("last_name", {
                    required: "Last name is required",
                  })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                {errors.last_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.last_name.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">
                  Avatar Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/avatar.jpg"
                  {...register("avatar", {
                    required: "Avatar URL is required",
                  })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                {errors.avatar && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.avatar.message}
                  </p>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition-colors cursor-pointer text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors cursor-pointer text-sm disabled:opacity-50"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
