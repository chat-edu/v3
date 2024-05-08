import { updateGraphSchema } from "@/llm/data/graphUpdates";

import {GraphRow} from "@/db/types/GraphRow";
import {TopicRow} from "@/db/types/TopicRow";
import {TopicEdgeRow} from "@/db/types/TopicEdgeRow";

export const basePlan = (
    graph: GraphRow,
    topics: TopicRow[],
    edges: TopicEdgeRow[],
    updateCause: string,
) => `
You are about to update the knowledge graph for the subject "${graph.name}".

The graph is currently composed of ${topics.length} topics and ${edges.length} edges.

The current topics are:

${topics.map(topic => `- ${topic.name}: ${topic.text}`).join("\n")}

The current edges are:

${edges.map(edge => `- ${edge.source_topic_id} -> ${edge.target_topic_id}`).join("\n")}

${updateCause}

You must now identify the updates that should be made to the graph based on the new information.

Updates can include adding new topics, updating existing topic text, or adding new edges between topics.

Your goal should be to break the topics down into a more granular level of detail to enable the creation of pathways through the graph.

You should also consider how the new information fits into the existing graph structure.

An edge is directed and indicates that the source topic is a prerequisite for the target topic. There must not be any circular dependencies in the graph.

The root node of the graph is ${graph.name} and should not have any incoming edges.`

export const baseJSONUpdate = (
    plan: string,
    graph: GraphRow,
    topics: TopicRow[],
    edges: TopicEdgeRow[],
    updateCause: string,
) => `
Your plan to update the knowledge graph for the subject "${graph.name}" is as follows:

${plan}

The graph is currently composed of ${topics.length} topics and ${edges.length} edges.

The current topics are:

${topics.map(topic => `- ${topic.name}: ${topic.text}`).join("\n")}

Edges are directed and indicate that the source topic is a prerequisite for the target topic.

The current edges are:

${edges.map(edge => `- ${edge.source_topic_id} -> ${edge.target_topic_id}`).join("\n")}

${updateCause}

You must now produce a JSON representation of the updates to be made to the graph based on the new information.

New topics MUST already be present in the graph. EVERY new topic must also have an edge connecting it to an existing topic or another new one.

New topics should include as much information as possible to fully describe the concept.

Updated topics should only include the new information that is being added.

Topic updates MUST BE based on an existing topic.

New edges can be between two existing topics, between an existing topic and a new topic, or between two new topics.

All content should be in markdown format and should break the concepts down into smaller, more digestible pieces.

Your JSON response must follow this format:

${JSON.stringify(updateGraphSchema)}
`