import React, { useEffect, useRef, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./text-editor.css";

interface TextEditorProps {}

const TextEditor: React.FC<TextEditorProps> = () => {
  const [value, setValue] = useState<string>("# Header");
  const [editing, setEditing] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        editorRef.current &&
        event.target &&
        !editorRef.current.contains(event.target as Node)
      ) {
        setEditing(false);
      }
    };
    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div ref={editorRef}>
        <MDEditor
          className="text-editor"
          value={value}
          onChange={(val) => setValue(val || "")}
        />
      </div>
    );
  }
  return (
    <div onClick={() => setEditing(true)}>
      <MDEditor.Markdown className="text-editor" source={value} />
    </div>
  );
};

export default TextEditor;
