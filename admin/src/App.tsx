import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import BrandPage from "./pages/BrandPage";
import ProductType from "./pages/ProductType";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductMeasure from "./pages/ProductMeasure";
import Products from "./pages/Products";
import Builders from "./pages/Builders";
import Branch from "./pages/Branch";
import Users from "./pages/Users";
import Sale from "./pages/Sale";
import Report from "./pages/Report";
import Market from "./pages/Market";
import MarketProtected from "./components/MarketProtected";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout></MainLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <BrandPage></BrandPage>,
      },
      {
        path: "product-types",
        element: <ProductType></ProductType>,
      },
      {
        path: "product-measures",
        element: <ProductMeasure></ProductMeasure>,
      },
      {
        path: "products",
        element: <Products></Products>,
      },
      {
        path: "builders",
        element: <Builders></Builders>,
      },
      {
        path: "branches",
        element: <Branch></Branch>,
      },
      {
        path: "users",
        element: <Users></Users>,
      },
      {
        path: "sales",
        element: <Sale></Sale>,
      },
      {
        path: "reports",
        element: <Report></Report>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/market",
    element: (
      <MarketProtected>
        <Market></Market>
      </MarketProtected>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
