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
    editorRef.current?.setValue(initialValue);
  };

  const onFormatClick = () => {
    const unformmated = editorRef.current?.getModel()?.getValue();
    const formatted = prettier
      .format(unformmated ?? "", {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");
    editorRef.current?.setValue(formatted);
  };

  return (
    <div className="group">
      <div className="flex justify-end relative">
        <button
          onClick={onFormatClick}
          className="absolute text-xs rounded text-white bg-indigo-600 px-2 py-1 mt-3 mr-6 z-40 opacity-0 transition hover:scale-105 hover:bg-indigo-500 group-hover:opacity-100"
        >
          Format
        </button>
      </div>
      <Editor
        onChange={onChange}
        defaultLanguage="javascript"
        height="50vh"
        theme="vs-dark"
        options={options}
        onMount={onMount}
      />
    </div>
  );
};
