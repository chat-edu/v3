import {TaskRow} from "@/db/types/TaskRow";
import {TopicRow} from "@/db/types/TopicRow";

export interface TaskTopicRow {
    task_id: TaskRow["id"];
    topic_id: TopicRow["id"];
}