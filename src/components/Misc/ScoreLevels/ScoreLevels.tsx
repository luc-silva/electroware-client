import { ScoreLevelCard } from "../../Cards/ScoreLevelCard/ScoreLevelCard";
import styles from "./ScoreLevels.module.css";

export const ScoreLevels = ({ data }: { data: ProductScoreMetrics }) => {
    return (
        <div className={styles["score-levels"]}>
            {data.scoreMetrics.map((item: Score, index: number) => {
                return (
                    <ScoreLevelCard index={index} data={data} key={index} />
                );
            })}
        </div>
    );
};
