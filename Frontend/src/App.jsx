import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TransactionDashboard from "./components/TransactionDashboard";
import Statistics from "./components/Statistics";
import BarChartComponent from "./components/BarChartComponent";

const AppLayout = () => {
  return (
    <div>
      <TransactionDashboard />
      <Statistics />
      <BarChartComponent />
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
