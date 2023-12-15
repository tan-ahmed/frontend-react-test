import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { TfiPencil, TfiTrash } from "react-icons/tfi";
import { toast } from "react-toastify";
import { UserData } from "../../types/users";
import useDeleteUser from "../../hooks/useDeleteUser";
import { useAuthStore } from "../../store/store";

type UserCardProps = {
    person: UserData;
};

const UserCard = ({ person }: UserCardProps) => {
    const token = useAuthStore((state) => state.token);
    const deleteUser = useDeleteUser(token);

    const handleDelete = (userId: number) => {
        deleteUser.mutateAsync({ userId, token });
    };

    const handleEdit = () => {
        toast.error("This feature is not yet implemented.");
    };

    return (
        <motion.li
            key={person.id}
            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
            }}
        >
            <div className="flex flex-1 flex-col p-4 xl:p-8">
                <img
                    className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                    src={person.display_picture}
                    alt={person.first_name}
                />
                <h3 className="mt-6 text-sm font-medium text-gray-900">
                    {person.first_name} {person.last_name}
                </h3>
                <dl className="mt-1 flex flex-grow flex-col justify-between">
                    <dt className="sr-only">Email</dt>
                    <dt className="sr-only">Role</dt>
                    <dd className="mt-3">
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            {person.email}
                        </span>
                    </dd>
                </dl>
            </div>
            <div>
                <div className="grid grid-cols-2 divide-x divide-gray-200 py-2">
                    <div className="flex justify-center">
                        <Button variant="light" onClick={handleEdit}>
                            <TfiPencil />
                            Edit
                        </Button>
                    </div>
                    <div className="flex justify-center">
                        <Button
                            variant="light"
                            onClick={() => handleDelete(person.id)}
                        >
                            <TfiTrash />
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        </motion.li>
    );
};

export default UserCard;
