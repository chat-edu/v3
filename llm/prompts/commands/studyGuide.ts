import {CommandTags, ResponseTags} from "@/llm/prompts/commands/tags";

import {Command, CommandTypes} from "@/types/commands/Command";
import {StudyGuide} from "@/types/commands/StudyGuide";
import {Stringified} from "@/types/Stringified";

export const studyGuideResponseDescription = `Study guides should SUMMARIZE the notes and should only include the most important information. Study guides must be in markdown and should use heading 1s (#), 2s (##), and 3s (###), and bullet points (-) to organize the content. Use math equations ($) where applicable.`;
export const studyGuideResponseFormatting: Stringified<StudyGuide> = {
    studyGuide: `string (markdown): # <title> \n <content>`
}
export const studyGuidePromptContent = `Please make me a study guide`;

export const studyGuideCommand: Command<StudyGuide> = {
    responseTag: ResponseTags.STUDY_GUIDE,
    responseDescription: studyGuideResponseDescription,
    responseFormatting: studyGuideResponseFormatting,
    promptTag: CommandTags.STUDY_GUIDE,
    promptContent: studyGuidePromptContent,
    promptType: CommandTypes.STUDY_GUIDE
}