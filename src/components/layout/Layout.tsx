import { useDisclosure } from "@nextui-org/react";
import Header from "../header/Header";
import CreateUserModal from "../create-user/CreateUserModal";

type Props = {
    children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div className="h-screen">
            <Header onOpen={onOpen} />
            {children}
            <CreateUserModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </div>
    );
};

export default Layout;
