import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const user = window.localStorage.getItem("user");
  if (!user) {
    return <Navigate to={"login"}></Navigate>;
  } else return children;
};

export default ProtectedRoute;
