import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/store";
import { AppRoutes } from "../types/routes";

const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
    const navigate = useNavigate();
    const token = useAuthStore((state) => state.token);

    useEffect(() => {
        if (!token) {
            navigate(AppRoutes.Login);
        }
    }, [token, navigate]);

    return token ? element : null;
};

export default ProtectedRoute;
