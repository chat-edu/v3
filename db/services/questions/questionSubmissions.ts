import { add, del, find, get } from "@/db/services/base";

import {QUESTION_SUBMISSIONS_TABLE} from "@/db/tables";

import {UserRow} from "@/db/types/UserRow";
import {QuestionSubmissionRow, QuestionSubmissionRowInput} from "@/db/types/questions";
import {TopicRow} from "@/db/types/TopicRow";

// CREATE

export const addQuestionSubmission = async (question: QuestionSubmissionRowInput) => {
    return add<QuestionSubmissionRowInput, QuestionSubmissionRow>(QUESTION_SUBMISSIONS_TABLE, question);
};

// READ

export const getQuestionSubmission = async (id: QuestionSubmissionRow["id"]): Promise<QuestionSubmissionRow | null> => {
    const query = `SELECT * FROM ${QUESTION_SUBMISSIONS_TABLE} WHERE id = $1;`;
    return get(query, [id]);
};

// Find FreeResponseQuestions by userId
export const findQuestionSubmissionsByUserId = async (userId: UserRow["id"]): Promise<QuestionSubmissionRow[]> => {
    const queryText = `SELECT * FROM ${QUESTION_SUBMISSIONS_TABLE} WHERE user_id = $1;`;
    return find<QuestionSubmissionRow>(queryText, [userId]);
}

export const findQuestionSubmissionsByUserIdAndTopicId = async (userId: UserRow["id"], topicId: TopicRow["id"]): Promise<QuestionSubmissionRow[]> => {
    const queryText = `SELECT * FROM ${QUESTION_SUBMISSIONS_TABLE} WHERE user_id = $1 AND topic_id = $2;`;
    return find<QuestionSubmissionRow>(queryText, [userId, topicId]);
}

export const findLastThreeQuestionSubmissionsByUserIdAndTopicId = async (userId: UserRow["id"], topicId: TopicRow["id"]): Promise<QuestionSubmissionRow[]> => {
    const queryText = `SELECT * FROM ${QUESTION_SUBMISSIONS_TABLE} WHERE user_id = $1 AND topic_id = $2 ORDER BY timestamp DESC LIMIT 3;`;
    return find<QuestionSubmissionRow>(queryText, [userId, topicId]);
}

// DELETE

export const deleteQuestionSubmission = async (id: QuestionSubmissionRow["id"]) => {
    return del(QUESTION_SUBMISSIONS_TABLE, [id]);
}