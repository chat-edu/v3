import {Graph} from "@/types/graph/Graph";
import {User} from "@/types/User";

export interface Task {
    id: number;
    text: string;
    completed: boolean;
    graphId: Graph["id"];
    creatorId: User["id"];
}