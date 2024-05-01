import {
        newEdgeDescription,
        newTopicDescription,
        updatedTopicDescription,
        updateGraphSchema
} from "@/llm/data/graphUpdates";

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
`

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

Edges are directed and indicate that the target topic is a SUBTOPIC of the source topic.

The current edges are:

${edges.map(edge => `- ${edge.source_topic_id} -> ${edge.target_topic_id}`).join("\n")}

${updateCause}

You must now produce a JSON representation of the updates to be made to the graph based on the new information.

New topics MUST already be present in the graph. EVERY new topic must also have an edge connecting it to an existing topic or another new one.

Topic updates MUST BE based on an existing topic.

New edges can be between two existing topics, between an existing topic and a new topic, or between two new topics.

Your JSON response must follow this format:

${JSON.stringify(updateGraphSchema)}
`

"In addition to the existing description, DFS explores nodes and branches deeply before backtracking, as depicted in the included visual reference. For example, it completes the entirety of the left subtree (nodes 1 -> 2 -> 3 -> 4) before switching to the right subtree, thereby maintaining a depth-focused traversal method. [Visual Example](https://chatedustorage.blob.core.windows.net/images/1714592974100.jpg)"