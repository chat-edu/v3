import {GraphRow} from "@/db/types/GraphRow";
import {TopicRow} from "@/db/types/TopicRow";
import {TopicEdgeRow} from "@/db/types/TopicEdgeRow";

import {baseJSONUpdate, basePlan} from "@/llm/prompts/graphs/update";

export const planUpdatesFromPDFPrompt = (
    graph: GraphRow,
    topics: TopicRow[],
    edges: TopicEdgeRow[],
    extractedText: string
) => basePlan(graph, topics, edges, `
The user has uploaded a PDF file and the text was extracted as follows:

${extractedText}
`)

export const updatesAsJSONFromPDFPrompt = (
    plan: string,
    graph: GraphRow,
    topics: TopicRow[],
    edges: TopicEdgeRow[],
    extractedText: string,
) => baseJSONUpdate(plan, graph, topics, edges, `
The user uploaded a PDF file and the text was extracted as follows:

${extractedText}
`)