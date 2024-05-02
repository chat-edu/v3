import {TopicRow} from "@/db/types/TopicRow";
import {UserIdParams} from "@/app/api/questions/utils/UserIdParams";

export interface TopicIdParams extends UserIdParams {
    topicId: TopicRow["id"];
}