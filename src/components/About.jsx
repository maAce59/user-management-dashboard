import React from "react";
import { Link } from "react-router-dom";

export default function AboutPage() {
    {/*Create an array of objects that stores the name and description for each technology required so that we can use map() 
        to dynamically render them later */}
  const techStack = [
    { name: "React", desc: "UI Library & Component Architecture" },
    { name: "Redux Toolkit", desc: "Global State Management" },
    { name: "RTK Query", desc: "API Data Fetching & Caching" },
    { name: "React Hook Form", desc: "Form State & Validation" },
    { name: "Tailwind CSS", desc: "Responsive & Modern Styling" },
    { name: "ReqRes API", desc: "RESTful User Endpoints" },
  ];

  return (
    <div className="min-h-[80vh] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            About The Project
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            User Management System
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A single-page application built to perform full CRUD operations on
            user records using modern React state management and form handling
            tools.
          </p>
        </div>

        {/* Features Overview */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4 items-start">
              <div className="bg-orange-100 text-orange-700 font-bold p-2.5 rounded-xl text-sm shrink-0">
                01
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">User Directory</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Paginated view fetching live user profiles, emails, and
                  avatars from the ReqRes REST API.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-orange-100 text-orange-700 font-bold p-2.5 rounded-xl text-sm shrink-0">
                02
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Validated Forms</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Seamless form controls powered by React Hook Form with
                  real-time error messages and schema rules.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-orange-100 text-orange-700 font-bold p-2.5 rounded-xl text-sm shrink-0">
                03
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  RTK Query Mutations
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Optimistic updates and automated cache invalidation for
                  adding, updating, and deleting records.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-orange-100 text-orange-700 font-bold p-2.5 rounded-xl text-sm shrink-0">
                04
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Responsive UI</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Clean, mobile-first design system constructed using
                  utility-first Tailwind CSS components.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Technologies Used
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="bg-white p-5 rounded-xl border border-gray-200 hover:border-orange-300 transition-colors"
              >
                <h3 className="font-bold text-gray-900 text-base">
                  {tech.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Footer Section */}
        <div className="bg-orange-700 text-white rounded-2xl p-8 text-center space-y-4 shadow-lg">
          <h2 className="text-2xl font-bold">Ready to manage users?</h2>
          <p className="text-orange-100 text-sm max-w-md mx-auto">
            Head back to the main directory to search, inspect, or register new
            team profiles.
          </p>
          <div className="pt-2">
            <Link
              to="/"
              className="inline-block bg-white text-orange-700 font-semibold px-6 py-2.5 rounded-lg hover:bg-orange-50 transition-colors shadow-sm"
            >
              Go to User List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
