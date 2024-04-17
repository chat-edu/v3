import {UserRow} from "@/db/types/UserRow";
import {User} from "@/types/User";

const adaptUser = (user: UserRow): User => ({
    id: user.id,
    email: user.email,
    name: user.name,
    username: user.username,
    profilePictureUrl: user.profile_picture_url,
})

export default adaptUser;