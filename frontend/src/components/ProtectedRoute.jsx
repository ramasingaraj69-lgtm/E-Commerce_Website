import { useSelector } from "react-redux";

import {
  Navigate,
  useLocation,
} from "react-router-dom";

function ProtectedRoute({
  children,
}) {

  const {
    user,
    loading,
  } = useSelector(
    (state) => state.auth
  );

  const location =
    useLocation();

  // LOADING
  if (loading) {

    return (

      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent:
            "center",
          alignItems: "center",
          background: "black",
          color: "#FFE066",
          fontSize: "2rem",
        }}
      >
        Loading 🌻
      </div>
    );
  }

  // NOT LOGGED IN
  if (!user?.email) {

    return (
      <Navigate
        to="/login"
        state={{
          from: location,
        }}
        replace
      />
    );
  }

  // AUTHORIZED
  return children;
}

export default ProtectedRoute;