import {add, del, find} from "@/db/services/base";

import {TOPIC_EDGES_TABLE, TOPICS_TABLE} from "@/db/tables";

import {TopicEdgeRow} from "@/db/types/TopicEdgeRow";
import {TopicRow} from "@/db/types/TopicRow";

export const addTopicEdge = async (topicEdge: TopicEdgeRow): Promise<TopicEdgeRow | null> => {
    return add<TopicEdgeRow, TopicEdgeRow>(TOPIC_EDGES_TABLE, topicEdge);
};

// READ

export const findTopicEdgesbyGraphId = async (graphId: TopicRow["graph_id"]): Promise<TopicEdgeRow[]> => {
    const query = `
        WITH Topics_in_Graph AS (SELECT id FROM ${TOPICS_TABLE} WHERE graph_id = $1)
        SELECT * FROM ${TOPIC_EDGES_TABLE}
        WHERE source_topic_id IN (SELECT id FROM Topics_in_Graph) OR target_topic_id IN (SELECT id FROM Topics_in_Graph);
    `;
    return find(query, [graphId]);
}

export const findIncomingTopicEdges = async (topicId: TopicRow["id"]): Promise<TopicEdgeRow[]> => {
    const query = `SELECT * FROM ${TOPIC_EDGES_TABLE} WHERE target_topic_id = $1;`;
    return find(query, [topicId]);
}

export const findOutgoingTopicEdges = async (topicId: TopicRow["id"]): Promise<TopicEdgeRow[]> => {
    const query = `SELECT * FROM ${TOPIC_EDGES_TABLE} WHERE source_topic_id = $1;`;
    return find(query, [topicId]);
}

// DELETE

export const deleteTopicEdge = async (sourceTopicId: TopicRow["id"], targetTopicId: TopicRow["id"]): Promise<boolean> => {
    return del(TOPIC_EDGES_TABLE, [sourceTopicId, targetTopicId], ["source_topic_id", "target_topic_id"]);
};