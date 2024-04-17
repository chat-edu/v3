import {User} from "@/types/User";

export interface Graph {
    name: string;
    creatorId: User["id"];
    id: number;
}