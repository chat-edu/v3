import {UserRow} from "@/db/types/UserRow";

export interface GraphRowInput {
    name: string;
    creator_id: UserRow['id'];
}

export interface GraphRow extends GraphRowInput {
    id: number;
}