import useRow from "@/hooks/queries/base/useRow";
import adaptUser from "@/hooks/queries/users/adapter";

import {User} from "@/types/User";
import {useCallback, useEffect} from "react";
import {subscribeToUserChangedEvent} from "@/events/userChanged";

const useUser = (userId: User["id"]) => {
    const [
        user,
        loading,
        error,
        fetchUser
    ] = useRow(userId ? `/api/users/${userId}` : "", adaptUser);

    const handleUserChanged = useCallback(async (userId: User["id"]) => {
        if(userId === userId) {
            fetchUser();
        }
    }, [userId, fetchUser]);

    useEffect(() => {
        subscribeToUserChangedEvent(handleUserChanged);
        return () => {
            subscribeToUserChangedEvent(handleUserChanged);
        }
    }, [handleUserChanged]);

    return {
        user,
        loading,
        error,
        fetchUser
    }
}

export default useUser;