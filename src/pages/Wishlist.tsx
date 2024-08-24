import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../services/UserService";
import styles from "./Wishlist.module.css";
import { CollectionContainer } from "../components/Containers/CollectionContainer";
import { UserContext } from "../context/UserContext";

export const Wishlist = () => {
    const { user } = useContext(UserContext);

    let [collections, setCollections] = useState([]);
    let { id } = useParams();
    const navigate = useNavigate();

    async function updateCollections() {
        UserService.getUserCollections(user.id, user.token).then((data) => {
            setCollections(data);
        });
    }
    useEffect(() => {
        if (!user.logged) {
            navigate("/login");
        }

        updateCollections();
    }, [id]);

    return (
        <main role="main" className={styles["wishlist"]}>
            <section className={styles["wishlist__main"]}>
                <div className={styles["wishlist__title"]}>
                    <h2>Lista de Desejos</h2>
                </div>
                <div className={styles["products__container"]}>
                    {(collections.length > 0 &&
                        collections.map(
                            (item: WishlistCollection, index: React.Key) => {
                                return (
                                    <CollectionContainer
                                        data={item}
                                        user={user}
                                        key={index}
                                        updateCollections={updateCollections}
                                    />
                                );
                            }
                        )) || <p>Sem Produtos Disponíveis</p>}
                </div>
            </section>
        </main>
    );
};
