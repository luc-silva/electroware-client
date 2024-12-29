import { useContext, useEffect, useState } from "react";

//style
import styles from "./InfoToast.module.css";
import { X, Info, WarningCircle } from "phosphor-react";
import { ToastContext } from "../../../context/ToastContext";
import { useToast } from "../../../hooks/useToast";

export const InfoToast = () => {
    const { cfg, toastActive } = useContext(ToastContext);
    const { toggleToast } = useToast();

    useEffect(() => {
        if (!toastActive) toggleToast();
    }, [cfg]);

    useEffect(() => {
        if (toastActive) {
            let timeout = setTimeout(() => {
                toggleToast();
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [toastActive, toggleToast]);

    if (!toastActive) return null;
    return (
        <div className={`${styles["toast"]} ${styles[cfg.toastType]}`}>
            <div className={styles["toast__message"]}>
                {(cfg.toastType === "warning" && (
                    <WarningCircle size={25} color={"white"} weight="bold" />
                )) || <Info size={25} color={"white"} weight="bold" />}
                <p>{cfg.message}</p>
            </div>
            <div className={styles["toast__btn"]} onClick={toggleToast}>
                <X size={30} color={"white"} weight="bold" />
            </div>
            <div className={styles["timer-bar"]} />
        </div>
    );
};
