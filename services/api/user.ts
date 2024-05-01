import {UserRow} from "@/db/types/UserRow";
import {emitUserChangedEvent} from "@/events/userChanged";

export const createUser = async (user: UserRow) =>
    fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            if(data) {
                emitUserChangedEvent(data.id);
                return true;
            } else {
                return false;
            }
        })
        .catch(() => false);
