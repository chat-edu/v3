import {findIncomingTopicEdges} from "@/db/services/topicEdges";
import {getTopic} from "@/db/services/topics";

import {TopicRow} from "@/db/types/TopicRow";

export const findIncomingTopics = async (topicId: number, topicNames: TopicRow[] = []) => {
    const incomingTopicEdges = await findIncomingTopicEdges(topicId);
    for(const edge of incomingTopicEdges) {
        const topicRow = await getTopic(edge.source_topic_id);
        if(topicRow === null) {
            continue;
        }
        // add to the front of topicNames
        topicNames.unshift(topicRow);
        await findIncomingTopics(edge.source_topic_id, topicNames);
    }
    return topicNames;
}