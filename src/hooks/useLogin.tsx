import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/store";
import { AppRoutes } from "../types/routes";
import { ErrorResponse } from "../types/api";

type UserLoginRequest = {
    email: string;
    password: string;
};
const login = async ({ email, password }: UserLoginRequest) => {
    const response = await axios.post("/api/login", {
        email,
        password,
    });
    return response.data;
};

const useLogin = () => {
    const navigate = useNavigate();
    const setToken = useAuthStore((state) => state.setToken);
    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            setToken(data.token);
            const successMessage = "Successfully logged in!";
            toast.success(successMessage);
            navigate(AppRoutes.Home);
        },
        onError: (error) => {
            const axiosError = error as AxiosError<ErrorResponse>;
            const errorMessage = axiosError.response?.data.data.message;
            toast.error(errorMessage);
        },
    });
    return mutation;
};
export default useLogin;
