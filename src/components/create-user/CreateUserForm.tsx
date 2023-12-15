import { Button, Input, Spinner } from "@nextui-org/react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateUser from "../../hooks/useCreateUser";
import { CreateUser, CreateUserSchema } from "./CreateUserSchema";
import { useAuthStore } from "../../store/store";

type CreateUserFormProps = {
    close: () => void;
};

const CreateUserForm = ({ close }: CreateUserFormProps) => {
    const token = useAuthStore((state) => state.token);
    const createUser = useCreateUser(token);
    const methods = useForm();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateUserSchema>({
        resolver: zodResolver(CreateUser),
    });

    const onSubmit = async (data: CreateUserSchema) => {
        await createUser.mutateAsync({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            token,
        });
        close();
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-10 mt-14">
                    <Input
                        label="First Name"
                        placeholder="Enter your first name"
                        labelPlacement="outside"
                        isRequired
                        {...register("first_name")}
                        errorMessage={
                            errors.first_name && errors.first_name.message
                        }
                    />
                </div>

                <div className="mb-10">
                    <Input
                        label="Last Name"
                        placeholder="Enter your last name"
                        labelPlacement="outside"
                        isRequired
                        {...register("last_name")}
                        errorMessage={
                            errors.last_name && errors.last_name.message
                        }
                    />
                </div>

                <div className="mb-10">
                    <Input
                        type="email"
                        label="Email"
                        placeholder="Enter your email"
                        labelPlacement="outside"
                        isRequired
                        {...register("email")}
                        errorMessage={errors.email && errors.email.message}
                    />
                </div>

                <div className="mb-4">
                    <Button
                        type="submit"
                        fullWidth
                        color="secondary"
                        isLoading={createUser.isPending}
                        spinner={<Spinner />}
                    >
                        Create User
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};

export default CreateUserForm;
