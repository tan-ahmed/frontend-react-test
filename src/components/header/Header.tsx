import { Button } from "@nextui-org/react";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/store";

type HeaderProps = {
    onOpen: () => void;
};

const Header = ({ onOpen }: HeaderProps) => {
    const clearToken = useAuthStore((state) => state.clearToken);
    const handleLogout = () => {
        clearToken();
        toast.info("Logged out successfully");
    };
    return (
        <div className="bg-white shadow sticky top-0 z-10">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div>
                        <img
                            className="h-10 w-auto"
                            src="https://www.businessofapps.com/wp-content/uploads/2015/07/hhl_primary_logo_dark_blue_blue.png"
                            alt="hedgehog lab"
                        />
                    </div>
                    <div className="space-x-2">
                        <Button color="primary" onClick={onOpen}>
                            Add user
                        </Button>
                        <Button
                            color="primary"
                            variant="ghost"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
