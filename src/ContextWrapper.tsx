import { ModalProvider } from "./context/ModalContext";
import { ToastProvider } from "./context/ToastContext";
import { UserProvider } from "./context/UserContext";

export const ContextWrapper = ({ children }: { children: JSX.Element }) => {
    return (
        <UserProvider>
            <ModalProvider>
                <ToastProvider>{children}</ToastProvider>
            </ModalProvider>
        </UserProvider>
    );
};
