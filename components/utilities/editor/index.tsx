'use client';

import React from 'react';

import {
    MDXEditor,
    codeBlockPlugin,
    headingsPlugin,
    listsPlugin,
    linkPlugin,
    quotePlugin,
    markdownShortcutPlugin,
    AdmonitionDirectiveDescriptor,
    codeMirrorPlugin,
    directivesPlugin,
    frontmatterPlugin,
    imagePlugin,
    linkDialogPlugin,
    tablePlugin,
    thematicBreakPlugin,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

import {Box, Button, HStack} from "@chakra-ui/react";

import {FaWandMagicSparkles} from "react-icons/fa6";

import Markdown from "@/components/utilities/markdown";

import useEditor from "@/hooks/utilities/useEditor";

import {Topic} from "@/types/graph/Topic";

import "@/components/utilities/editor/editorContent.css";

interface Props {
    topic: Topic;
}

const Editor: React.FC<Props> = ({ topic }) => {

    const {
        isEditing,
        setIsEditing,
        ref,
        markdown,
        setMarkdown,
        generateContent,
        isGeneratingContent,
        onSave
    } = useEditor(topic);

    return (
        <Box
            w={'100%'}
            maxW={'100%'}
            p={4}
            gap={4}
            display={'flex'}
            flexDirection={'column'}
        >
            <HStack
                w={'100%'}
                justifyContent={'space-between'}
            >
                <HStack
                    w={'100%'}
                >
                    {
                        isEditing ? (
                            <>
                                <Button
                                    onClick={generateContent}
                                    colorScheme={'brand'}
                                    variant={'outline'}
                                    leftIcon={<FaWandMagicSparkles />}
                                    isLoading={isGeneratingContent}
                                    flex={1}
                                >
                                    Generate
                                </Button>
                                <Button
                                    onClick={onSave}
                                    colorScheme={'brand'}
                                    isDisabled={markdown === topic.text}
                                    flex={1}
                                >
                                    Save
                                </Button>
                            </>
                        ) : (
                            <Button
                                onClick={() => setIsEditing(true)}
                                colorScheme={'brand'}
                                flex={1}
                            >
                                Edit
                            </Button>
                        )
                    }
                </HStack>
            </HStack>
            {
                isEditing ? (
                    <MDXEditor
                        markdown={markdown}
                        ref={ref}
                        onChange={setMarkdown}
                        plugins={[
                            listsPlugin(),
                            quotePlugin(),
                            headingsPlugin(),
                            linkPlugin(),
                            linkDialogPlugin(),
                            imagePlugin({ imageUploadHandler: async () => '/sample-image.png' }),
                            tablePlugin(),
                            thematicBreakPlugin(),
                            frontmatterPlugin(),
                            codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
                            codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text', tsx: 'TypeScript', java: "Java", python: "Python" } }),
                            directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
                            markdownShortcutPlugin(),
                        ]}
                        contentEditableClassName={'editor-content'}
                        placeholder={'Start writing or generate content...'}
                    />
                ) : (
                    <Markdown>
                        {topic.text}
                    </Markdown>
                )
            }
        </Box>
    )
}

export default Editor