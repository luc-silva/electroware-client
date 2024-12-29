import { createContext, useMemo, useState } from "react";
import { userSessionInitialState } from "../constants/initialStates";

interface UserContextProps {
    user: UserSession;
    setUser: React.Dispatch<React.SetStateAction<UserSession>>;
    userToken: string
}

export let UserContext = createContext<UserContextProps>({
    user: userSessionInitialState,
    setUser: () => {},
    userToken: ''
});

export const UserProvider = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<UserSession>(userSessionInitialState);
    const userToken = useMemo(() => user.token, [user]);

    const config = {
        user,
        setUser,
        userToken,
    };

    return (
        <UserContext.Provider value={config}>{children}</UserContext.Provider>
    );
};
