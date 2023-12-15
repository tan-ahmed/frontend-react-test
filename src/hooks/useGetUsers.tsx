import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserData, UserKeys } from "../types/users";
import { useAuthStore } from "../store/store";
import { ApiResponse } from "../types/api";

const TWO_MINUTES = 60 * 2000;
const PER_PAGE = 8;

const useGetAllUsers = (page: number = 1) => {
    const token = useAuthStore((state) => state.token);
    const { isLoading, isPending, data, isFetching, error, isSuccess } =
        useQuery<ApiResponse<UserData>>({
            queryKey: [UserKeys.allUsers, page],
            staleTime: TWO_MINUTES,
            refetchInterval: TWO_MINUTES,
            enabled: !!token,
            queryFn: async () => {
                const response = await axios
                    .get(`/api/users`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            per_page: PER_PAGE,
                            page,
                        },
                    })
                    .then((res) => res.data);
                return response;
            },
        });
    return { isLoading, isPending, data, isFetching, error, isSuccess };
};
export default useGetAllUsers;
