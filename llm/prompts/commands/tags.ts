export const questionResponseTagSuffix = 'Question';
export const promptTagSuffix = 'Prompt';

export enum ResponseTags {
    MULTIPLE_CHOICE = `Multiple Choice ${questionResponseTagSuffix}`,
    UNDERSTANDING = `Understanding ${questionResponseTagSuffix}`,
    APPLICATION = `Application ${questionResponseTagSuffix}`,
    ANSWER_CORRECTNESS = `Answer Correctness Response`,
    HINT = `Hint Response`,
    PLAIN_TEXT = `Plain Text Response`,
    DONT_KNOW = `Don't Know Response`,
    NEXT_TOPIC = `Next Topic Response`
}

export enum CommandTags {
    MULTIPLE_CHOICE = `Multiple Choice ${promptTagSuffix}`,
    UNDERSTANDING = `Understanding ${promptTagSuffix}`,
    APPLICATION = `Application ${promptTagSuffix}`,
    ANSWER_CORRECTNESS = `Answer Correctness ${promptTagSuffix}`,
    HINT = `Hint ${promptTagSuffix}`,
    STUDY_GUIDE = `Study Guide ${promptTagSuffix}`,
    PLAIN_TEXT = `Plain Text ${promptTagSuffix}`,
    DONT_KNOW = `Don't Know ${promptTagSuffix}`
}