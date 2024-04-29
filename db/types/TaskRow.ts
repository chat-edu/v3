import {GraphRow} from "@/db/types/GraphRow";
import {UserRow} from "@/db/types/UserRow";

export interface TaskRowInput {
    text: string;
    graph_id: GraphRow["id"];
    creator_id: UserRow["id"];
    completed: boolean;
}

export interface TaskRow extends TaskRowInput {
    id: number;
}