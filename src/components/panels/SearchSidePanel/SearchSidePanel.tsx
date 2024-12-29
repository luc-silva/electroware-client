import { CategoriesPanel } from "../CategoriesPanel/CategoriesPanel";
import { FiltersPanel } from "../FiltersPanel/FiltersPanel";
import styles from "./SearchSidePanel.module.css";

export const SearchSidePanel = () => {
    return (
        <aside className={styles["search-results-panel"]}>
            <div className={styles["search-results-panel__filter"]}>
                <FiltersPanel />
            </div>
            <div className={styles["search-results-panel__category"]}>
                <CategoriesPanel />
            </div>
        </aside>
    );
};
