import {createContext, ReactNode, useContext, useEffect} from "react";
import {useUI} from "@/contexts/UIContext";
import Mousetrap from "mousetrap"
import {registerShortcuts} from "@/utils/KeyboardShortcutHandler";

export const KeyboardContext = createContext<any>({})
KeyboardContext.displayName = "KeyboardContext";


export type KeyHandler = (event: KeyboardEvent) => void;

export interface ShortcutMap {
    [keyCombination: string]: KeyHandler;
}


export const KeyboardHandler = ({ children } : {children:ReactNode}) => {
    const {openModal, closeModal, setModalView, displayModal} = useUI();


    const shortcuts: ShortcutMap = {
        "ctrl+k" : async () => {
            if(!displayModal) {
                openModal();
                setModalView("SEARCH")
            }else {
                closeModal();
            }
        },
        'escape' : () => {
            if (displayModal) closeModal();
        }
    }

    useEffect(() => {
        const cleanup = registerShortcuts(shortcuts);

        // Clean up the previous event listener when the component unmounts or when displayModal changes
        return () => {
            cleanup();
        };
    }, [displayModal])




    return <KeyboardContext.Provider value={{}}>{children}</KeyboardContext.Provider>
}

export const useKeyboard = () => useContext(KeyboardContext);