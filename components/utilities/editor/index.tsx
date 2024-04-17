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
    toolbarPlugin,
    BoldItalicUnderlineToggles,
    BlockTypeSelect,
    CreateLink,
    CodeToggle,
    InsertCodeBlock,
    InsertTable, ListsToggle
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

import {Box, Button, Heading, HStack} from "@chakra-ui/react";

import {FaWandMagicSparkles} from "react-icons/fa6";

import "@/components/utilities/editor/editorContent.css";

import useEditor from "@/hooks/utilities/useEditor";
import {Topic} from "@/types/graph/Topic";


interface Props {
    topic: Topic;
}

const Editor: React.FC<Props> = ({ topic }) => {

    const {
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
                </HStack>
            </HStack>
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
        </Box>
    )
}

export default Editor