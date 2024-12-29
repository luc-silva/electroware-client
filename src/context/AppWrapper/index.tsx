import { createContext } from "react"

interface IProps {
    children: React.ReactNode
}
export const AppWrapper = ({children}:IProps) => {
    const Context = createContext({})

    return (
        <Context.Provider value={{}}>
            {children}
        </Context.Provider>
    )
}