import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCredentials } from "../redux/auth/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, isLoading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser && !isAuthenticated) {
      try {
        dispatch(
          setCredentials({
            token: storedToken,
            user: JSON.parse(storedUser),
          })
        );
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, [dispatch, isAuthenticated]);

  const isAdmin = user?.role === "admin";

  return {
    user,
    token,
    isAuthenticated,
    isAdmin,
    isLoading,
    error,
  };
};
