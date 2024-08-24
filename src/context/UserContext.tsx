import { createContext, useState } from "react";
import { userSessionInitialState } from "../constants/initialStates";

interface UserContextProps {
    user: UserSession;
    setUser: React.Dispatch<React.SetStateAction<UserSession>>;
}

export let UserContext = createContext<UserContextProps>({
    user: userSessionInitialState,
    setUser: () => {},
});

export const UserProvider = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<UserSession>(userSessionInitialState);

    const config = {
        user,
        setUser,
    };

    return (
        <UserContext.Provider value={config}>{children}</UserContext.Provider>
    );
};
