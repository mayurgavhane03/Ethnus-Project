import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";


const AppLayout = () => {
  return (
    <div>
   
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
  },
]);

const App = () => {


  return (
    <div className="h-auto">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
