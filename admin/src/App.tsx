import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import BrandPage from "./pages/BrandPage";
import ProductType from "./pages/ProductType";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductMeasure from "./pages/ProductMeasure";

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
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
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
