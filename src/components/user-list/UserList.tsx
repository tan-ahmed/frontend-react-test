import { motion } from "framer-motion";
import { UserData } from "../../types/users";
import UserCard from "./UserCard";

type UsersListProps = {
    allUsers: UserData[];
};

const UsersList = ({ allUsers }: UsersListProps) => {
    return (
        <motion.ul
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.1,
                    },
                },
            }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
            {allUsers.map((person) => (
                <UserCard person={person} key={person.id} />
            ))}
        </motion.ul>
    );
};

export default UsersList;
