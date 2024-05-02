import {useEffect, useRef, useState} from "react";

import {generateContent as generateContentService, updateTopic} from "@/services/api/topic";

import {MDXEditorMethods} from "@mdxeditor/editor";
import {Topic} from "@/types/graph/Topic";
import {useToast} from "@chakra-ui/react";


const useEditTopicContent = (topic: Topic) => {

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const toast = useToast();

    const [markdown, setMarkdown] = useState<string>(topic.text);

    const ref = useRef<MDXEditorMethods>(null);

    useEffect(() => {
        if(ref.current) {
            ref.current.setMarkdown(topic.text);
        }
    }, [topic.text]);

    const [isGeneratingContent, setIsGeneratingContent] = useState<boolean>(false);

    const generateContent = async () => {
        setIsGeneratingContent(true);
        const content = await generateContentService(topic.id);
        if(content.length === 0) {
            toast({
                title: "Failed to generate content",
                description: "An error occurred while generating the content",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Content generated",
                description: "Your content has been generated",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            if(ref.current) {
                const newContent = ref.current.getMarkdown() + '\n' + content;
                ref.current.setMarkdown(newContent);
                setMarkdown(newContent)
            }
        }
        setIsGeneratingContent(false);
    }

    const onSave = async () => {
        const success = await updateTopic(topic.id, {
            text: markdown
        })
        if(success) {
            toast({
                title: 'Saved!',
                status: 'success',
                duration: 3000
            })
            setIsEditing(false)
        } else {
            toast({
                title: 'Error',
                status: 'error',
                duration: 3000
            })
        }
    }

    return {
        isEditing,
        setIsEditing,
        markdown,
        setMarkdown,
        generateContent,
        ref,
        isGeneratingContent,
        onSave
    }
}

export default useEditTopicContent;