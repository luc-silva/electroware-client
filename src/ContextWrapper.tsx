import { ToastProvider } from "./context/ToastContext";
import { UserProvider } from "./context/UserContext";

export const ContextWrapper = ({ children }: { children: JSX.Element }) => {
    return (
        <UserProvider>
            <ToastProvider>{children}</ToastProvider>
        </UserProvider>
    );
};
