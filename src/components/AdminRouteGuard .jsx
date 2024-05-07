import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRouteGuard = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user || !user.is_superuser) {
      navigate("/login"); 
    }
  }, [user, navigate]);

  return children;
};

export default AdminRouteGuard;
