import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-orange-700 text-white font-bold p-1.5 rounded-md text-sm leading-none">
                UM
              </div>
              <span className="text-lg font-bold text-gray-900">
                UserManager
              </span>
            </div>
            <p className="text-sm text-gray-500">
              User management app built with React, RTK Query, and React Hook
              Form.
            </p>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
              Resources
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 font-medium">
              <li>
                <Link
                  to="/"
                  className="hover:text-orange-700 transition-colors"
                >
                  Home (All Users)
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-orange-700 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                
              </li>
            </ul>
          </div>

          {/* Follow / Project Source Column */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
              Project Source
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 font-medium">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-orange-700 transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="https://reqres.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-orange-700 transition-colors"
                >
                  ReqRes API Docs
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {currentYear} UserManager. All rights reserved.
          </p>
          <span className="text-xs text-gray-400">
            Dashain Holiday Assignment
          </span>
        </div>
      </div>
    </footer>
  );
}
