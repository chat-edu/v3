import { add, find, get } from "@/db/services/base";

import {MULTIPLE_CHOICE_SUBMISSIONS_TABLE, QUESTION_SUBMISSIONS_TABLE } from "@/db/tables";

import {
    MultipleChoiceSubmissionRow,
    MultipleChoiceQuestionSubmissionRow, QuestionSubmissionRow,
} from "@/db/types/questions";
import {UserRow} from "@/db/types/UserRow";
import {GraphRow} from "@/db/types/GraphRow";

// CREATE

export const addMultipleChoiceQuestion = async (question: MultipleChoiceSubmissionRow) => {
    return add<MultipleChoiceSubmissionRow, MultipleChoiceSubmissionRow>(MULTIPLE_CHOICE_SUBMISSIONS_TABLE, question);
};

// READ

export const getMultipleChoiceQuestion = async (
    id: QuestionSubmissionRow["id"]
): Promise<MultipleChoiceQuestionSubmissionRow | null> => {
    const query = `
        SELECT 
            ${QUESTION_SUBMISSIONS_TABLE}.id,
            ${QUESTION_SUBMISSIONS_TABLE}.user_id,
            ${QUESTION_SUBMISSIONS_TABLE}.topic_id,
            ${QUESTION_SUBMISSIONS_TABLE}.question,
            ${QUESTION_SUBMISSIONS_TABLE}.correct,
            ${QUESTION_SUBMISSIONS_TABLE}.explanation,
            ${QUESTION_SUBMISSIONS_TABLE}.timestamp,
            ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.question_id,
            ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.option_a,
            ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.option_b,
            ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.option_c,
            ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.option_d,
            ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.correct_answer,
            ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.answer
        FROM 
            ${QUESTION_SUBMISSIONS_TABLE}
        INNER JOIN 
            ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE} 
        ON 
            ${QUESTION_SUBMISSIONS_TABLE}.id = ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.question_id
        WHERE
            ${QUESTION_SUBMISSIONS_TABLE}.id = $1;
    `
    return get(query, [id]);
};

// Find MultipleChoiceQuestions by userId
export const findMultipleChoiceQuestionsByUserId = async (
    userId: UserRow["id"]
): Promise<MultipleChoiceQuestionSubmissionRow[]> => {
    const queryText = `
        SELECT 
            ${QUESTION_SUBMISSIONS_TABLE}.id,
            ${QUESTION_SUBMISSIONS_TABLE}.user_id,
            ${QUESTION_SUBMISSIONS_TABLE}.topic_id,
            ${QUESTION_SUBMISSIONS_TABLE}.question,
            ${QUESTION_SUBMISSIONS_TABLE}.correct,
            ${QUESTION_SUBMISSIONS_TABLE}.explanation,
            ${QUESTION_SUBMISSIONS_TABLE}.timestamp,
            ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.question_id,
            ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.option_a,
            ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.option_b,
            ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.option_c,
            ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.option_d,
            ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.correct_answer,
            ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.answer
        FROM ${QUESTION_SUBMISSIONS_TABLE}
        INNER JOIN ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE} 
        ON ${QUESTION_SUBMISSIONS_TABLE}.id = ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.question_id
        WHERE ${QUESTION_SUBMISSIONS_TABLE}.user_id = $1;
    `;
    return find<MultipleChoiceQuestionSubmissionRow>(queryText, [userId]);
}

export const findMultipleChoiceQuestionsByUserIdAndTopicId = async (
    userId: UserRow["id"],
    topicId: number
): Promise<MultipleChoiceQuestionSubmissionRow[]> => {
    const queryText = `
        SELECT ${QUESTION_SUBMISSIONS_TABLE}.id,
               ${QUESTION_SUBMISSIONS_TABLE}.user_id,
               ${QUESTION_SUBMISSIONS_TABLE}.topic_id,
               ${QUESTION_SUBMISSIONS_TABLE}.question,
               ${QUESTION_SUBMISSIONS_TABLE}.correct,
               ${QUESTION_SUBMISSIONS_TABLE}.explanation,
               ${QUESTION_SUBMISSIONS_TABLE}.timestamp,
               ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.question_id,
               ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.option_a,
               ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.option_b,
               ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.option_c,
               ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.option_d,
               ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.correct_answer,
               ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.answer
        FROM ${QUESTION_SUBMISSIONS_TABLE}
        INNER JOIN ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}
        ON ${QUESTION_SUBMISSIONS_TABLE}.id = ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.question_id
        WHERE ${QUESTION_SUBMISSIONS_TABLE}.user_id = $1
        AND ${QUESTION_SUBMISSIONS_TABLE}.topic_id = $2;
    `;
    return find<MultipleChoiceQuestionSubmissionRow>(queryText, [userId, topicId]);
}

export const findMultipleChoiceQuestionsByUserIdAndGraphId = async (
    userId: UserRow["id"],
    graphId: GraphRow["id"]
): Promise<MultipleChoiceQuestionSubmissionRow[]> => {
    const queryText = `
        SELECT
            ${QUESTION_SUBMISSIONS_TABLE}.id,
            ${QUESTION_SUBMISSIONS_TABLE}.user_id,
            ${QUESTION_SUBMISSIONS_TABLE}.topic_id,
            ${QUESTION_SUBMISSIONS_TABLE}.question,
            ${QUESTION_SUBMISSIONS_TABLE}.correct,
            ${QUESTION_SUBMISSIONS_TABLE}.explanation,
            ${QUESTION_SUBMISSIONS_TABLE}.timestamp,
            ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.question_id,
            ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.option_a,
            ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.option_b,
            ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.option_c,
            ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.option_d,
            ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.correct_answer,
            ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.answer
        FROM ${QUESTION_SUBMISSIONS_TABLE}
        INNER JOIN ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}
        ON ${QUESTION_SUBMISSIONS_TABLE}.id = ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.question_id
        INNER JOIN Topics
        ON ${QUESTION_SUBMISSIONS_TABLE}.topic_id = Topics.id
        INNER JOIN Graphs
        ON Topics.graph_id = Graphs.id
        WHERE ${QUESTION_SUBMISSIONS_TABLE}.user_id = $1 AND Graphs.id = $2;
    `;
    return find<MultipleChoiceQuestionSubmissionRow>(queryText, [userId, graphId]);
}

export const findMultipleChoiceQuestionsByTaskId = async (
    taskId: number
): Promise<MultipleChoiceQuestionSubmissionRow[]> => {
    const queryText = `
        SELECT
            ${QUESTION_SUBMISSIONS_TABLE}.id,
            ${QUESTION_SUBMISSIONS_TABLE}.user_id,
            ${QUESTION_SUBMISSIONS_TABLE}.topic_id,
            ${QUESTION_SUBMISSIONS_TABLE}.question,
            ${QUESTION_SUBMISSIONS_TABLE}.correct,
            ${QUESTION_SUBMISSIONS_TABLE}.explanation,
            ${QUESTION_SUBMISSIONS_TABLE}.timestamp,
            ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.question_id,
            ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.option_a,
            ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.option_b,
            ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.option_c,
            ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.option_d,
            ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.correct_answer,
            ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.answer
        FROM ${QUESTION_SUBMISSIONS_TABLE}
        INNER JOIN ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}
        ON ${QUESTION_SUBMISSIONS_TABLE}.id = ${MULTIPLE_CHOICE_SUBMISSIONS_TABLE}.question_id
        WHERE ${QUESTION_SUBMISSIONS_TABLE}.task_id = $1;
    `;
    return find<MultipleChoiceQuestionSubmissionRow>(queryText, [taskId]);
}