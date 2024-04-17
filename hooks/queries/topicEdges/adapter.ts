import {TopicEdgeRow} from "@/db/types/TopicEdgeRow";
import {TopicEdge} from "@/types/graph/TopicEdge";

const adaptTopicEdge = (topicEdge: TopicEdgeRow): TopicEdge => ({
    sourceTopicId: topicEdge.source_topic_id,
    targetTopicId: topicEdge.target_topic_id,
});

export default adaptTopicEdge;