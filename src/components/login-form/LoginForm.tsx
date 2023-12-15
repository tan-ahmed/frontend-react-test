import { Button, Input, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { PiEyeFill, PiEyeSlash } from "react-icons/pi";
import { useLocation } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useLogin from "../../hooks/useLogin";
import AuthLayout from "./AuthLayout";
import { AppRoutes } from "../../types/routes";
import { LoginFormSchema, LoginSchema } from "./LoginSchema";

const LoginForm = () => {
    const [isVisible, setIsVisible] = useState(false);
    const location = useLocation();
    const methods = useForm();

    const toggleVisibility = () => setIsVisible(!isVisible);
    const login = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormSchema>({
        resolver: zodResolver(LoginSchema),
    });

    const onSubmit = async (data: LoginFormSchema) => {
        await login.mutateAsync({ email: data.email, password: data.password });
    };

    return (
        <AuthLayout
            heading="Sign in to your account"
            actionLinkText="Sign up"
            additionalActionText="Not a member?"
            additionalActionLink={AppRoutes.Register}
        >
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-10 mt-14">
                        <Input
                            type="email"
                            label="Email"
                            placeholder="Enter your email"
                            labelPlacement="outside"
                            isRequired
                            {...register("email")}
                            defaultValue={location.state?.email || ""}
                            errorMessage={errors.email && errors.email.message}
                        />
                    </div>

                    <div className="mb-6">
                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            labelPlacement="outside"
                            isRequired
                            {...register("password")}
                            errorMessage={
                                errors.password && errors.password.message
                            }
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
                        />
                    </div>

                    <div>
                        <Button
                            type="submit"
                            fullWidth
                            color="secondary"
                            isLoading={login.isPending}
                            spinner={<Spinner />}
                        >
                            Sign in
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </AuthLayout>
    );
};

export default LoginForm;
