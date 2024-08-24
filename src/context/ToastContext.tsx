import { createContext, useState } from "react";

interface ToastContext {
    cfg: ToastProps;
    setConfig: React.Dispatch<React.SetStateAction<ToastProps>>;
    toastActive: boolean;
    setToastActive: React.Dispatch<React.SetStateAction<boolean>>;
}
interface ToastProps {
    message: string;
    toastType: "info" | "warning";
}

export const ToastInitialSettings: ToastProps = {
    message: "Nothing to display",
    toastType: "info",
};

export const ToastContext = createContext<ToastContext>({
    cfg: ToastInitialSettings,
    setConfig: () => {},
    toastActive: false,
    setToastActive: () => {},
});

export const ToastProvider = ({ children }: { children: JSX.Element }) => {
    const [toastConfig, setToastConfig] =
        useState<ToastProps>(ToastInitialSettings);
    const [toastActive, setToastActive] = useState(false);

    const config = {
        cfg: toastConfig,
        setConfig: setToastConfig,
        toastActive,
        setToastActive,
    };

    return (
        <ToastContext.Provider value={config}>{children}</ToastContext.Provider>
    );
};
