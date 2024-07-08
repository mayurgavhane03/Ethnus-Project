import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import TransactionDashboard from "./components/TransactionDashboard";
import Statistics from "./components/Statistics";


const AppLayout = () => {
  return (
    <div>
   <TransactionDashboard />
   <Statistics />
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
