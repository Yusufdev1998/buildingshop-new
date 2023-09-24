import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import getUserData from "../utils/getUserData";

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const user = getUserData();
  if (!user) {
    return <Navigate to={"/login"}></Navigate>;
  } else if (user.user_type === "ADMIN") {
    return children;
  } else if (user.user_type === "RETAILER") {
    return <Navigate to={"/market"}></Navigate>;
  }
};

export default ProtectedRoute;
