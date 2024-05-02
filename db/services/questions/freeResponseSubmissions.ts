import { add, find, get } from "@/db/services/base";

import {FREE_RESPONSE_SUBMISSIONS_TABLE, QUESTION_SUBMISSIONS_TABLE } from "@/db/tables";

import {
    FreeResponseSubmissionRow,
    FreeResponseQuestionSubmissionRow, QuestionSubmissionRow,
} from "@/db/types/questions";
import {UserRow} from "@/db/types/UserRow";
import {TopicRow} from "@/db/types/TopicRow";
import {GraphRow} from "@/db/types/GraphRow";
import {TaskRow} from "@/db/types/TaskRow";

// CREATE

export const addFreeResponseQuestion = async (question: FreeResponseSubmissionRow) => {
    return add<FreeResponseSubmissionRow, FreeResponseSubmissionRow>(FREE_RESPONSE_SUBMISSIONS_TABLE, question);
};

// READ

export const getFreeResponseQuestion = async (
    id: QuestionSubmissionRow["id"]
): Promise<FreeResponseQuestionSubmissionRow | null> => {
    const query = `
        SELECT 
            ${QUESTION_SUBMISSIONS_TABLE}.id,
            ${QUESTION_SUBMISSIONS_TABLE}.user_id,
            ${QUESTION_SUBMISSIONS_TABLE}.topic_id,
            ${QUESTION_SUBMISSIONS_TABLE}.question,
            ${QUESTION_SUBMISSIONS_TABLE}.correct,
            ${QUESTION_SUBMISSIONS_TABLE}.explanation,
            ${QUESTION_SUBMISSIONS_TABLE}.timestamp,
            ${FREE_RESPONSE_SUBMISSIONS_TABLE}.question_id,
            ${FREE_RESPONSE_SUBMISSIONS_TABLE}.answer,
            ${FREE_RESPONSE_SUBMISSIONS_TABLE}.type
        FROM 
            ${QUESTION_SUBMISSIONS_TABLE}
        INNER JOIN 
            ${FREE_RESPONSE_SUBMISSIONS_TABLE} 
        ON 
            ${QUESTION_SUBMISSIONS_TABLE}.id = ${FREE_RESPONSE_SUBMISSIONS_TABLE}.question_id
        WHERE
            ${QUESTION_SUBMISSIONS_TABLE}.id = $1;
    `
    return get(query, [id]);
};

// Find FreeResponseQuestions by userId
export const findFreeResponseQuestionsByUserId = async (
    userId: UserRow["id"]
): Promise<FreeResponseQuestionSubmissionRow[]> => {
    const queryText = `
        SELECT 
            ${QUESTION_SUBMISSIONS_TABLE}.id,
            ${QUESTION_SUBMISSIONS_TABLE}.user_id,
            ${QUESTION_SUBMISSIONS_TABLE}.topic_id,
            ${QUESTION_SUBMISSIONS_TABLE}.question,
            ${QUESTION_SUBMISSIONS_TABLE}.correct,
            ${QUESTION_SUBMISSIONS_TABLE}.explanation,
            ${QUESTION_SUBMISSIONS_TABLE}.timestamp,
            ${FREE_RESPONSE_SUBMISSIONS_TABLE}.question_id,
            ${FREE_RESPONSE_SUBMISSIONS_TABLE}.answer,
            ${FREE_RESPONSE_SUBMISSIONS_TABLE}.type
        FROM ${QUESTION_SUBMISSIONS_TABLE}
        INNER JOIN ${FREE_RESPONSE_SUBMISSIONS_TABLE} 
        ON ${QUESTION_SUBMISSIONS_TABLE}.id = ${FREE_RESPONSE_SUBMISSIONS_TABLE}.question_id
        WHERE ${QUESTION_SUBMISSIONS_TABLE}.user_id = $1;
    `;
    return find<FreeResponseQuestionSubmissionRow>(queryText, [userId]);
}

export const findFreeResponseQuestionsByUserIdAndTopicId = async (
    userId: UserRow["id"],
    topicId: TopicRow["id"]
): Promise<FreeResponseQuestionSubmissionRow[]> => {
    const queryText = `
        SELECT ${QUESTION_SUBMISSIONS_TABLE}.id,
               ${QUESTION_SUBMISSIONS_TABLE}.user_id,
               ${QUESTION_SUBMISSIONS_TABLE}.topic_id,
               ${QUESTION_SUBMISSIONS_TABLE}.question,
               ${QUESTION_SUBMISSIONS_TABLE}.correct,
               ${QUESTION_SUBMISSIONS_TABLE}.explanation,
               ${QUESTION_SUBMISSIONS_TABLE}.timestamp,
               ${FREE_RESPONSE_SUBMISSIONS_TABLE}.question_id,
               ${FREE_RESPONSE_SUBMISSIONS_TABLE}.answer,
               ${FREE_RESPONSE_SUBMISSIONS_TABLE}.type
        FROM ${QUESTION_SUBMISSIONS_TABLE}
        INNER JOIN ${FREE_RESPONSE_SUBMISSIONS_TABLE}
        ON ${QUESTION_SUBMISSIONS_TABLE}.id = ${FREE_RESPONSE_SUBMISSIONS_TABLE}.question_id
        WHERE ${QUESTION_SUBMISSIONS_TABLE}.user_id = $1 AND ${QUESTION_SUBMISSIONS_TABLE}.topic_id = $2;
    `;
    return find<FreeResponseQuestionSubmissionRow>(queryText, [userId, topicId]);
}

export const findFreeResponseQuestionsByUserIdAndGraphId = async (
    userId: UserRow["id"],
    graphId: GraphRow["id"]
): Promise<FreeResponseQuestionSubmissionRow[]> => {
    const queryText = `
        SELECT 
            ${QUESTION_SUBMISSIONS_TABLE}.id,
            ${QUESTION_SUBMISSIONS_TABLE}.user_id,
            ${QUESTION_SUBMISSIONS_TABLE}.topic_id,
            ${QUESTION_SUBMISSIONS_TABLE}.question,
            ${QUESTION_SUBMISSIONS_TABLE}.correct,
            ${QUESTION_SUBMISSIONS_TABLE}.explanation,
            ${QUESTION_SUBMISSIONS_TABLE}.timestamp,
            ${FREE_RESPONSE_SUBMISSIONS_TABLE}.question_id,
            ${FREE_RESPONSE_SUBMISSIONS_TABLE}.answer,
            ${FREE_RESPONSE_SUBMISSIONS_TABLE}.type
        FROM ${QUESTION_SUBMISSIONS_TABLE}
        INNER JOIN ${FREE_RESPONSE_SUBMISSIONS_TABLE} 
        ON ${QUESTION_SUBMISSIONS_TABLE}.id = ${FREE_RESPONSE_SUBMISSIONS_TABLE}.question_id
        INNER JOIN Topics
        ON ${QUESTION_SUBMISSIONS_TABLE}.topic_id = Topics.id
        INNER JOIN Graphs
        ON Topics.graph_id = Graphs.id
        WHERE ${QUESTION_SUBMISSIONS_TABLE}.user_id = $1 AND Graphs.id = $2;
    `;
    return find<FreeResponseQuestionSubmissionRow>(queryText, [userId, graphId]);
}

export const findFreeResponseQuestionsByTaskId = async (
    taskId: TaskRow["id"]
): Promise<FreeResponseQuestionSubmissionRow[]> => {
    const queryText = `
        SELECT 
            ${QUESTION_SUBMISSIONS_TABLE}.id,
            ${QUESTION_SUBMISSIONS_TABLE}.user_id,
            ${QUESTION_SUBMISSIONS_TABLE}.topic_id,
            ${QUESTION_SUBMISSIONS_TABLE}.question,
            ${QUESTION_SUBMISSIONS_TABLE}.correct,
            ${QUESTION_SUBMISSIONS_TABLE}.explanation,
            ${QUESTION_SUBMISSIONS_TABLE}.timestamp,
            ${FREE_RESPONSE_SUBMISSIONS_TABLE}.question_id,
            ${FREE_RESPONSE_SUBMISSIONS_TABLE}.answer,
            ${FREE_RESPONSE_SUBMISSIONS_TABLE}.type
        FROM ${QUESTION_SUBMISSIONS_TABLE}
        INNER JOIN ${FREE_RESPONSE_SUBMISSIONS_TABLE} 
        ON ${QUESTION_SUBMISSIONS_TABLE}.id = ${FREE_RESPONSE_SUBMISSIONS_TABLE}.question_id
        WHERE ${QUESTION_SUBMISSIONS_TABLE}.task_id = $1;
    `;
    return find<FreeResponseQuestionSubmissionRow>(queryText, [taskId]);
}