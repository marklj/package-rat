import { useEffect, useState } from "react";
import { CodeEditor } from "./code-editor";
import Preview from "./preview";
import bundle from "../bundler";
import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";

const initalValue = `import React from 'react';
import ReactDOM from 'react-dom';
const App = () => {
  return <h1>Hi React!</h1>;
};
ReactDOM.render(<App />, document.querySelector('#root'));
`;

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const { UpdateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(() => {
      bundleAndOutput();
    }, 750);
    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  const bundleAndOutput = async () => {
    const output = await bundle(cell.content);
    setCode(output.code);
    setError(output.error);
  };

  const handleEditorChange = (value: string) => {
    UpdateCell(cell.id, value);
  };

  return (
    <Resizable direction="vertical">
      <div className="h-full flex flex-row">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content || initalValue}
            onChange={handleEditorChange}
          />
        </Resizable>
        <Preview code={code} error={error} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
