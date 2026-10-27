import HomePage from "./HomePage";

{
  /*
   This file is used to clean up and simplify our import statements in main.jsx. This technique is commonly known as using an index barrel file.
   Instead of having a long, messy list of individual import lines for every single page and component, you can group them together and import them all in a single line.
    */
}

export { default as HomePage } from "./HomePage.jsx";
export { default as NotFoundPage } from "./NotFoundPage.jsx";
export { default as ProfilePage } from "./ProfilePage.jsx";

