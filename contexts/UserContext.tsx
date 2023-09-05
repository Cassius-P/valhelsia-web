import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';


interface User {
    id: number;
    email: string;
}

interface ContextProps {
    isUserConnected: boolean;
    fetchUserFromCookie: () => void;
}

const UserContext = createContext<ContextProps | undefined>(undefined);

export const UserProvider = ({ children }: {children:ReactNode}) => {
    const [isUserConnected, setIsUserConnected] = useState<boolean>(false);


    const fetchUserFromCookie = () => {
        //const userCookie = Cookies.get(process.env.COOKIE_NAME!);

        fetch('/api/auth/verify').then(async res => {
            if(!res.ok) return setIsUserConnected(prev => false)

            let json = await res.json()
            if(json.error) return setIsUserConnected(prev => false)

            if(json.status == "connected"){
                console.log("User is connected")
                setIsUserConnected(prev => true)
            }
        })

    }


    useEffect(() => {
        // Client-side
        fetchUserFromCookie()
    }, []);

    return (
        <UserContext.Provider value={{
            isUserConnected,
            fetchUserFromCookie
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): ContextProps => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
