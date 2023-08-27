import React, {HTMLProps, useCallback, useEffect, useMemo, useState} from "react";
import { createContext, FC, ReactNode } from "react";

export interface UIState {
  displayModal: boolean;
  modalView: string;
}

const initialState = {
  displayModal: false,
  modalView: "UPLOAD",
}

type Action = 
  | { 
    type: "OPEN_MODAL"
  }
  | { 
    type: "CLOSE_MODAL"
  }
  | {
    type: "SET_VIEW"
    view: VIEWS
  }

type VIEWS = 
  | "UPLOAD"
  | "CREATE_REFERENCE"

export const UIContext = createContext<UIState | any>(initialState)
UIContext.displayName = "UIContext";

function uiReducer(state: UIState, action: Action) {
  switch (action.type) {
    case "OPEN_MODAL": {
      return {
        ...state,
        displayModal: true
      }
    }
    case "CLOSE_MODAL": {
      return {
        ...state,
        displayModal: false
      }
    }
    case "SET_VIEW": {
      return {
        ...state,
        modalView: action.view,

      }
    }
  }
}

export const UIProvider: FC<{ children?: ReactNode }> = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState)


  const openModal = useCallback(
    ({...props}:any) => {
        console.log('openModal', props)
      dispatch({type: "OPEN_MODAL"})
    },
    [dispatch]
  )

  const closeModal = useCallback(
    () => dispatch({ type: "CLOSE_MODAL" }),
    [dispatch]
  )

  const setModalView = useCallback(
    (view:VIEWS, ) => {
      dispatch({ type: "SET_VIEW", view})
    },
    [dispatch]
  )


  const getInitialLightTheme = () => {
    console.log('getInitialLightTheme')
    if(typeof window !== "undefined"){
      if(localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        console.log('dark')
        return false
      }
      console.log('light')
      return true
    }
    return true
  }



  const [lightMode, setLightMode] = useState<boolean>(getInitialLightTheme());
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (lightMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, [lightMode]);




  const setTheme = useCallback(
      (theme: 'dark' | 'light') => {
        setLightMode(theme === 'light');
      },
      []
  );

  useEffect(() => {
    setMounted(true)
  }, [])








  const values = useMemo(
    () => ({
      ...state,
      openModal,
      closeModal,
      setModalView,
      setTheme,
      lightMode,
      mounted
    }),
    [state, mounted, lightMode]
  )

  return <UIContext.Provider value={values} {...props}/>
}

export const useUI = () => {
  const context = React.useContext(UIContext)
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`)
  }
  return context
}

export const ManagedUIContext: FC<{ children?: ReactNode }> = ({
  children,
}) => (
  <UIProvider>
    {children}
  </UIProvider>
)