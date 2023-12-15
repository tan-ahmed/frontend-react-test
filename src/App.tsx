import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import { AppRoutes } from "./types/routes";
import ProtectedRoute from "./utils/ProtectedRoute";

const App = () => {
    return (
        <Routes>
            <Route path={AppRoutes.Login} element={<Login />} />
            <Route path={AppRoutes.Register} element={<Register />} />
            <Route
                path={AppRoutes.Home}
                element={<ProtectedRoute element={<Home />} />}
            />
            <Route
                path="*"
                element={<Navigate to={AppRoutes.Login} replace />}
            />
        </Routes>
    );
};

export default App;
