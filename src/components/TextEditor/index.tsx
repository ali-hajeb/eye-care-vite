import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  headingsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  MDXEditorMethods,
  toolbarPlugin,
  UndoRedo,
} from '@mdxeditor/editor';
import React, { useEffect } from 'react';
import '@mdxeditor/editor/style.css';
import { Group } from '@mantine/core';

export interface TextEditorProps {
  content: string;
  onChange?: ((markdown: string) => void) | undefined;
}

const TextEditor: React.FunctionComponent<TextEditorProps> = ({ content, onChange }) => {
  const ref = React.useRef<MDXEditorMethods>(null);

  useEffect(() => {
    ref.current?.setMarkdown(content)
  }, [content])
  return (
      <MDXEditor
        markdown={content}
        ref={ref}
        plugins={[
          headingsPlugin(),
          markdownShortcutPlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <Group>
                <UndoRedo />
                <BlockTypeSelect />
                <BoldItalicUnderlineToggles />
              </Group>
            ),
          }),
        ]}
        onChange={onChange}
      />
  );
};

export default TextEditor;
