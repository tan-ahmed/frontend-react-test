import { Link } from "react-router-dom";

type AuthLayoutProps = {
    children: React.ReactNode;
    heading: string;
    actionLinkText: string;
    additionalActionText: string;
    additionalActionLink: string;
};
const AuthLayout = ({
    children,
    heading,
    actionLinkText,
    additionalActionText,
    additionalActionLink,
}: AuthLayoutProps) => {
    return (
        <div className="flex min-h-full flex-1 h-screen">
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <img
                            className="h-10 w-auto"
                            src="https://www.businessofapps.com/wp-content/uploads/2015/07/hhl_primary_logo_dark_blue_blue.png"
                            alt="hedgehog lab"
                        />
                        <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            {heading}
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            {additionalActionText}{" "}
                            <Link
                                to={additionalActionLink}
                                className="font-semibold text-purple-600 hover:text-purple-500"
                            >
                                {actionLinkText}
                            </Link>
                        </p>
                    </div>

                    <div className="mt-10">{children}</div>
                </div>
            </div>
            <div className="relative hidden w-0 flex-1 lg:block">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                    alt=""
                />
            </div>
        </div>
    );
};

export default AuthLayout;
