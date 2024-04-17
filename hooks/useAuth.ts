import {useSession} from "next-auth/react";

const useAuth = () => {

    const { data: session, status } = useSession();

    return {
        user: session?.user,
        isConnected: !!session?.user,
        isLoading: status === "loading",
    }
}

export default useAuth;