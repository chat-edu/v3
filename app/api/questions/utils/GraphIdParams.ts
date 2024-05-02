import {UserIdParams} from "@/app/api/questions/utils/UserIdParams";
import {GraphRow} from "@/db/types/GraphRow";

export interface GraphIdParams extends UserIdParams {
    graphId: GraphRow["id"];
}