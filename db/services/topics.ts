import {add, del, find, get, update} from "@/db/services/base";

import {TOPICS_TABLE} from "@/db/tables";

import {TopicRowInput, TopicRow} from "@/db/types/TopicRow";
import {UpdatedTopic} from "@/llm/types/graphUpdates/UpdatedTopic";
import {NewTopic} from "@/llm/types/graphUpdates/NewTopic";
import {Graph} from "@/types/graph/Graph";

export const addTopic = async (topic: TopicRowInput): Promise<TopicRow | null> => {
    return add<TopicRowInput, TopicRow>(TOPICS_TABLE, topic);
};

export const addFromNewTopic = async (graph_id: Graph["id"], topic: NewTopic): Promise<TopicRow | null> => {
    const existingTopic = await getTopicByName(topic.name, graph_id);
    if(existingTopic) return existingTopic;
    return addTopic({
        graph_id,
        name: topic.name,
        text: topic.text
    });
}

// READ

export const getTopic = async (id: TopicRow["id"]): Promise<TopicRow | null> => {
    const query = `SELECT * FROM ${TOPICS_TABLE} WHERE id = $1;`;
    return get(query, [id]);
};

export const getTopicByName = async (name: TopicRow["name"], graphId: TopicRow["graph_id"]): Promise<TopicRow | null> => {
    const query = `SELECT * FROM ${TOPICS_TABLE} WHERE name = $1 AND graph_id = $2;`;
    return get(query, [name, graphId]);
}

export const findTopicsByGraphId = async (ownerId: TopicRow["graph_id"]): Promise<TopicRow[]> => {
    const query = `SELECT * FROM ${TOPICS_TABLE} WHERE graph_id = $1;`;
    return find(query, [ownerId]);
}

// UPDATE

export const updateTopic = async (id: TopicRow["id"], updatedFields: Partial<TopicRow>): Promise<boolean> => {
    return update<Partial<TopicRow>, TopicRow>(TOPICS_TABLE, [id], updatedFields);
};

export const updateFromTopicUpdate = async (graph_id: Graph["id"], topic: UpdatedTopic): Promise<boolean> => {
    const existingTopic = await getTopicByName(topic.name, graph_id);
    if(!existingTopic) {
        return (await addTopic({
            graph_id,
            name: topic.name,
            text: topic.updatedText
        })) !== null;
    } else {
        return updateTopic(existingTopic.id, {
            text: existingTopic.text + topic.updatedText
        });
    }
}

// DELETE

export const deleteTopic = async (id: TopicRow["id"]): Promise<boolean> => {
    return del(TOPICS_TABLE, [id]);
};