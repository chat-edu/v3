import {TopicEdgeRow} from "@/db/types/TopicEdgeRow";

export const createTopicEdge = async (topicEdge: TopicEdgeRow) =>
    fetch(`/api/topicEdges`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(topicEdge)
    })
        .then((res) => res.json())
        .then((data) => {
            return !!data;
        })
        .catch((err) => false);

export const deleteTopicEdge = async (topicEdge: TopicEdgeRow) =>
    fetch(`/api/topicEdges`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(topicEdge)
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch(() => false);