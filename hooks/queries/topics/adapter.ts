import {TopicRow} from "@/db/types/TopicRow";
import {Topic} from "@/types/graph/Topic";

const adaptTopic = (topic: TopicRow): Topic => ({
    id: topic.id,
    name: topic.name,
    text: topic.text,
    graphId: topic.graph_id,
});

export default adaptTopic;