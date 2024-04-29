import { add, del, find, get, update } from "@/db/services/base";

import { MULTIPLE_CHOICE_QUESTIONS_TABLE } from "@/db/tables";

import { MultipleChoiceQuestionRow, MultipleChoiceQuestionRowInput } from "@/db/types/questions";
import {UserRow} from "@/db/types/UserRow";

// CREATE

export const addMultipleChoiceQuestion = async (question: MultipleChoiceQuestionRowInput) => {
    return add<MultipleChoiceQuestionRowInput, MultipleChoiceQuestionRow>(MULTIPLE_CHOICE_QUESTIONS_TABLE, question);
};

// READ

export const getMultipleChoiceQuestion = async (id: number): Promise<MultipleChoiceQuestionRow | null> => {
    const query = 'SELECT * FROM MultipleChoiceQuestions WHERE id = $1;';
    return get(query, [id]);
};

// Find MultipleChoiceQuestions by Assignment ID
export const findMultipleChoiceQuestionsByUserId = async (userId: UserRow["id"]): Promise<MultipleChoiceQuestionRow[]> => {
    const queryText = `SELECT * FROM ${MULTIPLE_CHOICE_QUESTIONS_TABLE} WHERE user_id = $1;`;
    return find<MultipleChoiceQuestionRow>(queryText, [userId]);
};

// Find multiple choice questions by user id by topic id
export const findMultipleChoiceQuestionsByUserIdAndTopicId = async (userId: UserRow["id"], topicId: number): Promise<MultipleChoiceQuestionRow[]> => {
    const queryText = `SELECT * FROM ${MULTIPLE_CHOICE_QUESTIONS_TABLE} WHERE user_id = $1 AND topic_id = $2;`;
    return find<MultipleChoiceQuestionRow>(queryText, [userId, topicId]);
};

// DELETE

export const deleteMultipleChoiceQuestion = async (id: number) => {
    return del(MULTIPLE_CHOICE_QUESTIONS_TABLE, [id]);
};