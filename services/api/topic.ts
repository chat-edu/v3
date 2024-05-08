
import {TopicRow, TopicRowInput} from "@/db/types/TopicRow";
import {emitGraphTopicsChangedEvent} from "@/events/graphTopicsChanged";
import {Graph} from "@/types/graph/Graph";
import {emitTopicChangedEvent} from "@/events/topicChanged";
import {User} from "@/types/User";
import {QuestionSubmission} from "@/types/questions";

export const createTopic = async (topic: TopicRowInput) =>
    fetch(`/api/topics/graph/${topic.graph_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(topic)
    })
        .then((res) => res.json())
        .then((data) => {
            if(data) {
                emitGraphTopicsChangedEvent(topic.graph_id);
                return data as TopicRow
            } else {
                return null
            }
        })
        .catch(() => null);

export const updateTopic = async (topicId: TopicRow["id"], updatedFields: { text?: string, name?: string}) =>
    fetch(`/api/topics/${topicId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedFields)
    })
        .then((res) => res.json())
        .then((data) => {
            if(data) {
                emitTopicChangedEvent(topicId);
                return true
            } else {
                return false
            }
        })
        .catch(() => false);

export const deleteTopic = async (topicId: TopicRow["id"], graphId: Graph["id"]) =>
    fetch(`/api/topics/${topicId}`, {
        method: "DELETE",
    })
        .then((res) => res.json())
        .then((data) => {
            if(data) emitGraphTopicsChangedEvent(graphId);
            return data
        })
        .catch(() => false);

export const generateSubtopics = async (topicId: TopicRow["id"]) =>
    fetch(`/api/topics/${topicId}/generate/subtopics`, {
        method: "POST",
    })
        .then((res) => res.json())
        .then((data: {subtopics: string[]}) => data.subtopics as string[])
        .catch(() => []);

export const generateContent = async (topicId: TopicRow["id"]) =>
    fetch(`/api/topics/${topicId}/generate/content`, {
        method: "POST",
    })
        .then((res) => res.json())
        .then((content) => content as string)
        .catch(() => "");

export const getLastThreeQuestions = async (userId: User["id"], topicId: TopicRow["id"]) =>
    fetch(`/api/questions/user/${userId}/topic/${topicId}`, {
        method: "GET",
    })
        .then((res) => res.json())
        .then((data) => data as QuestionSubmission[])
        .catch(() => [] as QuestionSubmission[]);

export const newTopicId = () => Math.round(Math.random() * 1000000)