import { Outlet } from "react-router-dom";
import styles from "./Chat.module.css";
export const Chat = () => {
    return (
        <main className={styles["chat"]}>
            <aside className={styles["chat__history-panel"]}></aside>
            <div className={styles["chat__content"]}>
                <Outlet />
            </div>
        </main>
    );
};
