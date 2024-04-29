import {GraphRow} from "@/db/types/GraphRow";
import {UserIdParams} from "@/app/api/tasks/user/[userId]/UserIdParams";

export interface SubjectIdParams extends UserIdParams {
    subjectId: GraphRow["id"];
}