import { createContext, useContext } from "react";
import { useHomepage } from "../../../../hooks/useHomepage";

export const HomepageContext = createContext(
    {} as ReturnType<typeof useHomepage>
);

interface IProps {
    children: React.ReactElement;
}

export const HomepageProvider = ({ children }: IProps) => {
    const config = useHomepage();

    return (
        <HomepageContext.Provider value={config}>
            {children}
        </HomepageContext.Provider>
    );
};

export const useHome = () => useContext(HomepageContext);
