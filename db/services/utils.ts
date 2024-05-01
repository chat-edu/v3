import {findIncomingTopicEdges} from "@/db/services/topicEdges";
import {getTopic} from "@/db/services/topics";

import {TopicRow} from "@/db/types/TopicRow";

export const findIncomingTopics = async (topicId: number, topics: TopicRow[] = []): Promise<TopicRow[]> => {
    const incomingTopicEdges = await findIncomingTopicEdges(topicId);
    for(const edge of incomingTopicEdges) {
        const topicRow = await getTopic(edge.source_topic_id);
        if(topicRow === null) {
            continue;
        }
        if(!topics.some(t => t.id === topicRow.id)) topics.unshift(topicRow);
        await findIncomingTopics(edge.source_topic_id, topics);
    }
    return topics;
}