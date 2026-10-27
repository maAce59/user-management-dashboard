import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="shadow-md sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between">
          {/* UserManager button on the right*/}
          <Link
            to="/"
            className="flex items-center gap-2 text-decoration-none "
          >
            {/* <Link to="/"> wrapper: If a user is currently on the profile page or add-user page and clicks on the logo or "UserManager" text, it instantly routes them back to the home page (/) without refreshing the browser.*/}
            <div className="bg-orange-700 text-white font-bold p-2 rounded-lg text-lg leading-none">
              UM
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              UserManager
            </span>
          </Link>

          {/* 'NavLink' Theory
          The <NavLink to="/">: 
             Because it is a <NavLink> instead of a regular <Link>, it constantly monitors the browser's URL to see if it matches "/".

             The Dynamic className Function (({ isActive }) => ...):
             Instead of applying a fixed style, it uses an arrow function that checks the isActive state provided by React Router:
                        Base Styles (Always applied): px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200
                              These give the link clean padding, rounded corners, proper font sizing, and a smooth animation duration whenever its color changes.
             The Conditional Logic (Ternary Operator ? :):
                        When isActive is true (You are currently on the "All Users" page):
                              It applies bg-orange-100 text-orange-700 font-semibold. This gives the button a soft orange background, bold orange text so the user 
                              instantly knows, "I am on this page right now."
                        When isActive is false (You are on a different page, like Profile or Add User):
                              It applies text-gray-600 hover:text-gray-900 hover:bg-gray-100. This keeps the text a muted gray, but turns it darker and gives it a 
                              light gray background when the user hovers their mouse over it.

          */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <NavLink
              to="/about"
              className={({ isActive }) => {
                return `px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
                  isActive
                    ? "bg-orange-100 text-orange-700 font-semibold"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`;
              }}
            >
              About
            </NavLink>
            {/* All Users Link */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
                  isActive
                    ? "bg-orange-100 text-orange-700 font-semibold"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`
              }
            >
              All Users
            </NavLink>

           
          </div>
        </div>
      </nav>
    </header>
  );
}
