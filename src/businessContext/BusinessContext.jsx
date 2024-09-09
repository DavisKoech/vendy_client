/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from "react";
import BusinessReducer from "./BusinessReducer";

const INITIAL_STATE = {
    business: JSON.parse(localStorage.getItem("business")) || null,
    isFetching: false,
    error: false
}

export const BusinessContext = createContext(INITIAL_STATE)

export const BusinessContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(BusinessReducer, INITIAL_STATE)

    useEffect(() => {
        localStorage.setItem("business", JSON.stringify(state.business))
    }, [state.business])

    return (
        <BusinessContext.Provider
            value={{
                business: state.business,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}>
            {children}
        </BusinessContext.Provider>
    )
}
