import { add, del, find, get, update } from "@/db/services/base";

import {FREE_RESPONSE_QUESTIONS_TABLE} from "@/db/tables";

import { FreeResponseQuestionRow, FreeResponseQuestionRowInput } from "@/db/types/questions";
import {UserRow} from "@/db/types/UserRow";

// CREATE

export const addFreeResponseQuestion = async (question: FreeResponseQuestionRowInput) => {
    return add<FreeResponseQuestionRowInput, FreeResponseQuestionRow>(FREE_RESPONSE_QUESTIONS_TABLE, question);
};

// READ

export const getFreeResponseQuestion = async (id: number): Promise<FreeResponseQuestionRow | null> => {
    const query = 'SELECT * FROM FreeResponseQuestions WHERE id = $1;';
    return get(query, [id]);
};

// Find FreeResponseQuestions by userId
export const findFreeResponseQuestionsByUserId = async (userId: UserRow["id"]): Promise<FreeResponseQuestionRow[]> => {
    const queryText = `SELECT * FROM ${FREE_RESPONSE_QUESTIONS_TABLE} WHERE user_id = $1;`;
    return find<FreeResponseQuestionRow>(queryText, [userId]);
}

// DELETE

export const deleteFreeResponseQuestion = async (id: number) => {
    return del(FREE_RESPONSE_QUESTIONS_TABLE, [id]);
};