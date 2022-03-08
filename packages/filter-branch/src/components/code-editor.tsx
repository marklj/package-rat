import Editor from "@monaco-editor/react";
import monaco from "monaco-editor";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string | undefined): void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  onChange,
}) => {
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

  return (
    <Editor
      onChange={onChange}
      defaultLanguage="javascript"
      height="50vh"
      defaultValue={initialValue}
      theme="vs-dark"
      options={options}
    />
  );
};
