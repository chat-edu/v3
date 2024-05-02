'use client';

import React, {RefObject} from 'react';

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
    thematicBreakPlugin, MDXEditorMethods,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

import "@/components/utilities/editor/editorContent.css";

interface Props {
    markdown: string;
    setMarkdown: (markdown: string) => void;
    ref: RefObject<MDXEditorMethods>,

}

const Editor: React.FC<Props> = ({ markdown, ref, setMarkdown }) => {

    return (
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
    )
}

export default Editor