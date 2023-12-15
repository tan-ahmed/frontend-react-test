import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppRoutes } from "../types/routes";
import { ErrorResponse } from "../types/api";

type UserRegisterRequest = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    passwordConfirmation: string;
};
const register = async ({
    email,
    firstName,
    lastName,
    password,
    passwordConfirmation,
}: UserRegisterRequest) => {
    const response = await axios.post("/api/register", {
        email,
        first_name: firstName,
        last_name: lastName,
        password,
        password_confirmation: passwordConfirmation,
    });
    return response.data;
};

const useRegister = () => {
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            toast.success("User successfully created, please login!");
            navigate(AppRoutes.Login, { state: { email: data.email } });
        },
        onError: (error) => {
            const axiosError = error as AxiosError<ErrorResponse>;
            const errorMessage = axiosError.response?.data.data.message;
            toast.error(errorMessage);
        },
    });
    return mutation;
};
export default useRegister;
