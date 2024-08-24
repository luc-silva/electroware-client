import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";

type ToastTypes = "warning" | "info" | undefined;

export const useToast = () => {
    const { setConfig, setToastActive } = useContext(ToastContext);

    function toggleToast() {
        setToastActive((isActive) => !isActive);
    }

    const setToastMessage = (message: string, type: ToastTypes = "info") => {
        setConfig((prev) => ({ ...prev, message, toastType: type }));
        toggleToast();
    };

    return { setToastMessage, toggleToast };
};
