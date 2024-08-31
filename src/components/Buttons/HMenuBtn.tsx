import styles from "./HMenuBtn.module.css";
import { List } from "phosphor-react";

export const HMenuBtn = ({ toggleHMenu }: { toggleHMenu: Function }) => {
    return (
        <button
            className={styles["hmenu-btn"]}
            onClick={() => {
                toggleHMenu();
            }}
        >
            <List size={30} weight="bold" />
        </button>
    );
};
