import {createContext, FC, ReactNode, useContext, useEffect} from "react"

import {useRouter} from "next/navigation";

import useAuth from "@/hooks/useAuth";
import useUser from "@/hooks/queries/users/useUser";

import {User} from "@/types/User";

interface ContextType {
    user: User | null | undefined;
    isLoading: boolean;
}
export const UserContext = createContext<ContextType>({
    user: null,
    isLoading: true
});

export const useCurrentUser = () => useContext(UserContext);

interface UserContextProps {
    children: ReactNode;
}

export const CurrentUserProvider : FC<UserContextProps> = ({ children }) => {

    const router = useRouter();

    const { user } = useAuth();

    const {
        user: userData,
        loading: userDataLoading
    } = useUser(user?.id || '');

    useEffect(() => {
        if(user && userData === null && !userDataLoading) {
            router.push('/onboarding');
        }
    }, [user, userData, userDataLoading]);

    return (
        <UserContext.Provider
            value={{
                user: userData,
                isLoading: userDataLoading
            }}
        >
            {children}
        </UserContext.Provider>
    )
}