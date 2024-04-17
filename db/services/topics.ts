import {add, del, find, get, update} from "@/db/services/base";

import {TOPICS_TABLE} from "@/db/tables";

import {TopicRowInput, TopicRow} from "@/db/types/TopicRow";

export const addTopic = async (topic: TopicRowInput): Promise<TopicRow | null> => {
    return add<TopicRowInput, TopicRow>(TOPICS_TABLE, topic);
};

// READ

export const getTopic = async (id: TopicRow["id"]): Promise<TopicRow | null> => {
    const query = `SELECT * FROM ${TOPICS_TABLE} WHERE id = $1;`;
    return get(query, [id]);
};

export const findTopicsByGraphId = async (ownerId: TopicRow["graph_id"]): Promise<TopicRow[]> => {
    const query = `SELECT * FROM ${TOPICS_TABLE} WHERE graph_id = $1;`;
    return find(query, [ownerId]);
}

// UPDATE

export const updateTopic = async (id: TopicRow["id"], updatedFields: Partial<TopicRow>): Promise<boolean> => {
    return update<Partial<TopicRow>, TopicRow>(TOPICS_TABLE, [id], updatedFields);
};

// DELETE

export const deleteTopic = async (id: TopicRow["id"]): Promise<boolean> => {
    return del(TOPICS_TABLE, [id]);
};