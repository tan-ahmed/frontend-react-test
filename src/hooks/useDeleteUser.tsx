import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { UserKeys } from "../types/users";
import { ErrorResponse } from "../types/api";

type DeleteUserType = {
    userId: number;
    token: string;
};

const deleteUser = async ({ userId, token }: DeleteUserType) => {
    const response = await axios.delete(`/api/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

const useDeleteUser = (token: string) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (variables: DeleteUserType) =>
            deleteUser({ ...variables, token }),
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({
                queryKey: [UserKeys.allUsers],
            });
            toast.success("User deleted successfully.", {
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

export default useDeleteUser;
