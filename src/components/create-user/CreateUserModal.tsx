import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import CreateUserForm from "./CreateUserForm";

type CreateUserModalProps = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
};

const CreateUserModal = ({ isOpen, onOpenChange }: CreateUserModalProps) => {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(close) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Create a new user
                        </ModalHeader>
                        <ModalBody>
                            <CreateUserForm close={close} />
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default CreateUserModal;
