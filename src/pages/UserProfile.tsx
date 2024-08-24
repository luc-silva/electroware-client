import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    imageInitialValue,
    userProfileInitialValues,
} from "../constants/initialStates";

//
import UserService from "../services/UserService";
import ImageService from "../services/ImageService";
import { createImage } from "../utils/operations";
import { UserProducts } from "../components/Sections/UserProducts";
import { ProfileDetails } from "../components/Misc/ProfileDetails";
import { ImageBox } from "../components/Misc/ImageBox";

//
import styles from "./UserProfile.module.css";

export const UserProfile = () => {
    const { id } = useParams();
    const [userImage, setUserImage] = useState(imageInitialValue);

    const initialProfileData = {
        user: userProfileInitialValues,
        products: [],
        reviewsScore: [],
    };

    const [profileData, setProfileData] = useState(initialProfileData);

    useEffect(() => {
        if (id) {
            UserService.getUserInfo(id).then((data) => {
                setProfileData((prev) => ({ ...prev, user: data }));
            });
            UserService.getUserProducts(id).then((data) => {
                setProfileData((prev) => ({ ...prev, products: data }));
            });
            UserService.getUserProductsReceivedReviews(id).then((data) => {
                setProfileData((prev) => ({
                    ...prev,
                    prodreviewsScoreucts: data,
                }));
            });
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            ImageService.getUserImage(id).then((data) => {
                setUserImage(data.data);
            });
        }
    }, [profileData]);

    return (
        <main className={styles["user-profile"]}>
            <section className={styles["user-profile__main"]}>
                <div className={styles["user-profile__info"]}>
                    <div className={styles["user-profile__picture"]}>
                        <ImageBox
                            isLoading={false}
                            imgSrc={createImage(userImage)}
                        />
                    </div>
                </div>
                <ProfileDetails data={profileData} />
            </section>
            <UserProducts products={profileData.products} />
        </main>
    );
};
