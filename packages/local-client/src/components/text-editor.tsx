import React, { useEffect, useRef, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./text-editor.css";
import "../unreset.scss";
import { useActions } from "../hooks/use-actions";
import { Cell } from "../state";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState(false);
  const { UpdateCell } = useActions();
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
          className="text-editor unreset"
          value={cell.content}
          onChange={(val) => UpdateCell(cell.id, val || "")}
        />
      </div>
    );
  }
  return (
    <div onClick={() => setEditing(true)}>
      <MDEditor.Markdown
        className="text-editor unreset p-4"
        source={cell.content || "Click to edit"}
      />
    </div>
  );
};

export default TextEditor;
