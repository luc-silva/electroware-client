import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { SearchResultItem } from "../components/Cards/SearchResultCard";

import styles from "./SearchResults.module.css";
import { SearchSidePanel } from "../components/panels/SearchSidePanel";
import { searchProduct } from "../service";

export const SearchResults = () => {
    const { search } = useParams();
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (search) {
            searchProduct(search).then((data) => {
                setSearchResults(data);
            });
        }
    }, [search]);

    return (
        <main role={"main"} className={styles["search-results"]}>
            <div className={styles["search-results__panel"]}>
                <SearchSidePanel />
            </div>

            <section className={styles["search-results__main"]}>
                <div className={styles["search-results__main__title"]}>
                    <h2>Resultados da Pesquisa</h2>
                    <p>{searchResults.length} resultados</p>
                </div>
                <div className={styles["results-container"]}>
                    {searchResults.length === 0 ? (
                        <strong>Nenhum produto encontrado.</strong>
                    ) : (
                        searchResults.map(
                            ({ _id }: { _id: string }, index: React.Key) => (
                                <SearchResultItem productId={_id} key={index} />
                            )
                        )
                    )}
                </div>
            </section>
        </main>
    );
};
