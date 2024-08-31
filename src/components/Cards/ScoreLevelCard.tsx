import { Star } from "phosphor-react";
import { useEffect, useState } from "react";
import styles from "./ScoreLevelCard.module.css";

export const ScoreLevelCard = ({
    index,
    data,
}: {
    index: number;
    data: ProductScoreMetrics;
}) => {
    const [level, setLevel] = useState(0);
    useEffect(() => {
        if (Number(data.average.score) !== 0) {
            data.scoreMetrics.forEach((item) => {
                if (index === item._id) {
                    const scores = data.scoreMetrics.reduce(
                        (a: number, b: Score) => a + b.quant,
                        0
                    );
                    if (scores === item.quant) {
                        setLevel(100); //erro aqui
                    } else {
                        setLevel((item.quant * 100) / data.scoreMetrics.length);
                    }
                }
            });
        }
    }, [data.scoreMetrics, index]);
    return (
        <div className={styles["score__card"]}>
            <div className={styles["score"]}>
                <p>{index}</p>
                <Star size={20} color="var(--text-color)" key={4} />
            </div>
            <div className={styles["level-bar"]}>
                <span
                    className={styles["level"]}
                    style={{ width: `${level}%` }}
                />
            </div>
        </div>
    );
};
