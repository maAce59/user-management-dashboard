
import React from "react";
import { useForm } from "react-hook-form";
import { useAddUserMutation } from "../store/usersApi";

export default function UserForm({ onSuccess }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [addUser, { isLoading }] = useAddUserMutation();

  const onSubmit = async (data) => {
    try {
      const response = await addUser({ name: data.name, job: data.job }).unwrap();
      
      const newUserObject = {
        id: response.id || Date.now(),
        first_name: response.name,
        last_name: `(${response.job})`,
        email: `${response.name.toLowerCase().replace(/\s+/g, '')}@reqres.in`,
        avatar: "https://reqres.in/img/faces/support-image.jpg",
      };

      if (onSuccess) {
        onSuccess(newUserObject, response.name);
      }

      reset();
    } catch (err) {
      console.error("Failed to save the user:", err);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 max-w-md mx-auto mb-10"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4">Add New User</h2>
      
      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Name</label>
        <input
          type="text"
          placeholder="e.g. John Doe"
          {...register("name", { required: "Name is required" })}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Job / Role</label>
        <input
          type="text"
          placeholder="e.g. Software Engineer"
          {...register("job", { required: "Job/Role is required" })}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        {errors.job && (
          <p className="text-red-500 text-xs mt-1">{errors.job.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors disabled:bg-blue-300 text-sm cursor-pointer"
      >
        {isLoading ? "Saving..." : "Create User"}
      </button>
    </form>
  );
}