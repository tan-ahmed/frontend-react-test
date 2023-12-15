import { Button, Input, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { PiEyeFill, PiEyeSlash } from "react-icons/pi";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthLayout from "../login-form/AuthLayout";
import useRegister from "../../hooks/useRegister";
import { AppRoutes } from "../../types/routes";
import { RegisterFormSchema, RegisterSchema } from "./RegisterSchema";

const RegisterForm = () => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const signup = useRegister();
    const methods = useForm();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormSchema>({
        resolver: zodResolver(RegisterSchema),
    });

    const onSubmit = async (data: RegisterFormSchema) => {
        await signup.mutateAsync(data);
    };

    return (
        <AuthLayout
            heading="Register for an account"
            actionLinkText="Log in"
            additionalActionText="Already a member?"
            additionalActionLink={AppRoutes.Login}
        >
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex gap-2 mb-10">
                        <Input
                            label="First name"
                            placeholder="Enter your first name"
                            isRequired
                            labelPlacement="outside"
                            type="text"
                            {...register("firstName")}
                            errorMessage={
                                errors.firstName && errors.firstName.message
                            }
                        />
                        <Input
                            label="Last name"
                            placeholder="Enter your last name"
                            labelPlacement="outside"
                            isRequired
                            type="text"
                            {...register("lastName")}
                            errorMessage={
                                errors.lastName && errors.lastName.message
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

                    <div className="mb-10">
                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            isRequired
                            labelPlacement="outside"
                            endContent={
                                <button
                                    className="focus:outline-none"
                                    type="button"
                                    onClick={toggleVisibility}
                                >
                                    {!isVisible ? (
                                        <PiEyeFill />
                                    ) : (
                                        <PiEyeSlash />
                                    )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                            {...register("password")}
                            errorMessage={
                                errors.password && errors.password.message
                            }
                        />
                    </div>
                    <div className="mb-6">
                        <Input
                            label="Password confirmation"
                            placeholder="Confirm your password"
                            isRequired
                            labelPlacement="outside"
                            endContent={
                                <button
                                    className="focus:outline-none"
                                    type="button"
                                    onClick={toggleVisibility}
                                >
                                    {!isVisible ? (
                                        <PiEyeFill />
                                    ) : (
                                        <PiEyeSlash />
                                    )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                            {...register("passwordConfirmation")}
                            errorMessage={
                                errors.passwordConfirmation &&
                                errors.passwordConfirmation.message
                            }
                        />
                    </div>

                    <div>
                        <Button
                            type="submit"
                            fullWidth
                            color="secondary"
                            isLoading={signup.isPending}
                            spinner={<Spinner />}
                        >
                            Sign up
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </AuthLayout>
    );
};

export default RegisterForm;
