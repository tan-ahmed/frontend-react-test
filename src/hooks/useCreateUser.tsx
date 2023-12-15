import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { UserKeys } from "../types/users";
import { ErrorResponse } from "../types/api";

type CreateUserType = {
    first_name: string;
    last_name: string;
    email: string;
    token: string;
};

const createUser = async ({
    first_name,
    last_name,
    email,
    token,
}: CreateUserType) => {
    const response = await axios.post(
        "/api/users",
        {
            first_name,
            last_name,
            email,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

const useCreateUser = (token: string) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (variables: CreateUserType) =>
            createUser({ ...variables, token }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [UserKeys.allUsers],
            });
            toast.success("User created successfully.", {
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
            });
        },
        onError: (error) => {
            const axiosError = error as AxiosError<ErrorResponse>;
            const errorMessage = axiosError.response?.data.data.message;
            toast.error(errorMessage);
        },
    });
    return mutation;
};

export default useCreateUser;
