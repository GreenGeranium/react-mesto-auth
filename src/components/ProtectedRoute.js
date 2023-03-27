import { Navigate } from "react-router-dom";

function ProtectedRoute({ element: Component, ...props }) {
  return props.loggedIn ? (
    <Component {...props}></Component>
  ) : (
    <Navigate to={"/sign-in"} replace={true}></Navigate>
  );
}

export default ProtectedRoute;
