import { useEffect, useState } from "react";

import { Circle } from "phosphor-react";
import styles from "./HomeBanner.module.css";

const banner1 = `${process.env.PUBLIC_URL}/images/electroware-banner-1.jpg` 
const banner2 = `${process.env.PUBLIC_URL}/images/electroware-banner-2.jpg` 
const banner3 = `${process.env.PUBLIC_URL}/images/electroware-banner-3.jpg` 

export const HomeBanner = () => {
    const images = [banner1, banner2, banner3];

    const [counter, setCounter] = useState(0);
    const [currentImage, setCurrentImage] = useState(images[0]);
    const [seconds, setSeconds] = useState(4000);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter((prev: number) => {
                if (prev < images.length - 1) {
                    return prev + 1;
                }
                return 0;
            });
        }, seconds);

        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        setCurrentImage(images[counter]);
    }, [counter]);

    function handleIconClick(index: number) {
        setCurrentImage(images[index]);
    }

    return (
        <section className={styles["active-promos"]}>
            <img src={currentImage} alt="homepage banner" />
            <div className={styles["control-panel"]}>
                {images.map((item, index) => {
                    if (counter === index) {
                        return (
                            <Circle
                                size={15}
                                key={index}
                                onClick={() => {
                                    handleIconClick(index);
                                    setCounter(index)
                                }}
                            />
                        );
                    }
                    return (
                        <Circle
                            size={10}
                            key={index}
                            onClick={() => {
                                handleIconClick(index);
                                setCounter(index)
                            }}
                        />
                    );
                })}
            </div>
        </section>
    );
};
