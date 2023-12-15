import { Pagination } from "@nextui-org/react";
import { useState } from "react";
import Layout from "../components/layout/Layout";
import UsersList from "../components/user-list/UserList";

import useGetAllUsers from "../hooks/useGetUsers";

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isFetching, isLoading, error } = useGetAllUsers(currentPage);

    const allUsers = data?.data;
    const totalPages = data?.total_pages;

    if (isFetching || isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500 text-lg">{error.message}</p>;
    }

    return (
        <Layout>
            <div className="py-8 md:py-12">
                <div className="container">
                    {allUsers && <UsersList allUsers={allUsers} />}
                </div>
            </div>

            {totalPages && totalPages !== 1 && (
                <div className="flex w-full justify-center my-3">
                    <Pagination
                        loop
                        showControls
                        total={totalPages}
                        page={currentPage}
                        onChange={setCurrentPage}
                        variant="bordered"
                    />
                </div>
            )}
        </Layout>
    );
};

export default Home;
