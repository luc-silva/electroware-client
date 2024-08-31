import { Star } from "phosphor-react";
import styles from "./StarsContainer.module.css";

export const StarsContainer = ({
    size,
    score,
}: {
    size: number;
    score: number;
}) => {
    const starsArr = [
        <Star size={size} color="var(--main-color)" />,
        <Star size={size} color="var(--main-color)" />,
        <Star size={size} color="var(--main-color)" />,
        <Star size={size} color="var(--main-color)" />,
        <Star size={size} color="var(--main-color)" />,
    ];

    return (
        <div className={styles["stars-container"]}>
            {starsArr.map((_, index) => (
                <Star
                    size={size}
                    color="var(--main-color)"
                    weight={index >= Math.floor(score) ? undefined : "duotone"}
                    key={index}
                />
            ))}
        </div>
    );
};
