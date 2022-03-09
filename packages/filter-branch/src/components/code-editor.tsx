import Editor, { OnMount } from "@monaco-editor/react";
import monaco from "monaco-editor";
import { useRef } from "react";
import prettier from "prettier";
import parser from "prettier/parser-babel";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string | undefined): void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  onChange,
}) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();

  const options: monaco.editor.IStandaloneEditorConstructionOptions = {
    wordWrap: "on",
    minimap: { enabled: false },
    showUnused: false,
    folding: false,
    lineNumbersMinChars: 3,
    fontSize: 16,
    scrollBeyondLastLine: false,
    tabIndex: 2,
    tabSize: 2,
    lineHeight: 25,
  };

  const onMount: OnMount = (
    editor: monaco.editor.IStandaloneCodeEditor
  ): void => {
    editorRef.current = editor;
  };

  const onFormatClick = () => {
    console.log(editorRef.current);
    const unformmated = editorRef.current?.getModel()?.getValue();
    const formatted = prettier.format(unformmated ?? "", {
      parser: "babel",
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true,
    });
    editorRef.current?.setValue(formatted);
  };

  return (
    <div>
      <button onClick={onFormatClick}>Format</button>
      <Editor
        onChange={onChange}
        defaultLanguage="javascript"
        height="50vh"
        defaultValue={initialValue}
        theme="vs-dark"
        options={options}
        onMount={onMount}
      />
    </div>
  );
};
