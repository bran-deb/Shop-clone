import { FC, useReducer } from "react";
import { UIContext } from './';
import { uiReducer } from "./";



export interface UiState {
    isMenuOpen: boolean;
}

const UI_INITIAL_STATE: UiState = {
    isMenuOpen: false,
}

export const UIProvider: FC = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const toggleSideMenu = () => {
        dispatch({ type: "[UI] - ToggleMenu" })
    }

    return (
        <UIContext.Provider value={{
            ...state,
            //Methods
            toggleSideMenu
        }}>
            {children}
        </UIContext.Provider>
    )
}