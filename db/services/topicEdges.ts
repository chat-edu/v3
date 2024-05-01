import {add, del, find} from "@/db/services/base";

import {TOPIC_EDGES_TABLE, TOPICS_TABLE} from "@/db/tables";

import {TopicEdgeRow} from "@/db/types/TopicEdgeRow";
import {TopicRow} from "@/db/types/TopicRow";
import {NewEdge} from "@/llm/types/graphUpdates/NewEdge";
import {getTopicByName} from "@/db/services/topics";
import {Graph} from "@/types/graph/Graph";

export const addTopicEdge = async (topicEdge: TopicEdgeRow): Promise<TopicEdgeRow | null> => {
    return add<TopicEdgeRow, TopicEdgeRow>(TOPIC_EDGES_TABLE, topicEdge);
};

export const addFromNewEdge = async (graphId: Graph["id"], newEdge: NewEdge): Promise<TopicEdgeRow | null> => {
    const [sourceTopicId, targetTopicId] = await Promise.all([
        getTopicByName(newEdge.sourceTopicName, graphId).then(topic => topic?.id),
        getTopicByName(newEdge.targetTopicName, graphId).then(topic => topic?.id),
    ]);
    if(!sourceTopicId || !targetTopicId) return null;
    return addTopicEdge({
        source_topic_id: sourceTopicId,
        target_topic_id: targetTopicId,
    });
}

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

// find all edges whose source and target are in an array of topic ids
export const findTopicEdgesByTopicIds = async (topicIds: TopicRow["id"][]): Promise<TopicEdgeRow[]> => {
    const query = `SELECT * FROM ${TOPIC_EDGES_TABLE} WHERE source_topic_id = ANY($1) AND target_topic_id = ANY($1);`;
    return find(query, [topicIds]);
}

export const findOutgoingTopicEdges = async (topicId: TopicRow["id"]): Promise<TopicEdgeRow[]> => {
    const query = `SELECT * FROM ${TOPIC_EDGES_TABLE} WHERE source_topic_id = $1;`;
    return find(query, [topicId]);
}

// DELETE

export const deleteTopicEdge = async (sourceTopicId: TopicRow["id"], targetTopicId: TopicRow["id"]): Promise<boolean> => {
    return del(TOPIC_EDGES_TABLE, [sourceTopicId, targetTopicId], ["source_topic_id", "target_topic_id"]);
};