import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

//Import Layout and Pages
import { Header, Footer, About } from "./components";
import { HomePage, NotFoundPage, ProfilePage } from "./Pages";
import { VisualCard } from "./components/Practice";

{
  /*
  When you write an import path that points to a folder instead of a specific file—like this:
           import { HomePage } from "./Pages";
      The JavaScript engine and Vite look at ./Pages, see that it's a folder, and automatically look for a file named index inside it (checking extensions like .js, .jsx, .ts, or .tsx).

  Think of it like index.html on websites
  It works the exact same way web servers handle URLs:
  When you type google.com, you don't type [google.com/index.html] (https://google.com/index.html). The server automatically looks for an index.html file inside the root directory and serves it.
  */
}
import Layout from "./Layout";

// Redux Imports
import { Provider } from "react-redux";
import { store } from "./store/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "visualcard",
        element: <VisualCard />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
   < Provider store = {store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
