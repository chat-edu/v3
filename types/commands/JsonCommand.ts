import {CommandTags} from "@/llm/prompts/commands";

export interface JsonCommand {
    tag: CommandTags,
    content: string
}