import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  headingsPlugin,
  MDXEditor,
  MDXEditorMethods,
  toolbarPlugin,
  UndoRedo,
} from '@mdxeditor/editor';
import React, { useEffect } from 'react';
import '@mdxeditor/editor/style.css';

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
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <BlockTypeSelect />
                <BoldItalicUnderlineToggles />
              </>
            ),
          }),
        ]}
        onChange={onChange}
      />
  );
};

export default TextEditor;
