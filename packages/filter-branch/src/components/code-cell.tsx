import { useEffect, useState } from "react";
import { CodeEditor } from "./code-editor";
import Preview from "./preview";
import bundle from "../bundler";
import Resizable from "./resizable";

const inputStr = `import React from 'react';
import ReactDOM from 'react-dom';
const App = () => {
  return <h1>Hi React!</h1>;
};
ReactDOM.render(<App />, document.querySelector('#root'));
`;

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    setInput(inputStr);
  }, []);

  const onClick = () => {
    bundleAndOutput();
  };

  const bundleAndOutput = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  const handleEditorChange = (value: string) => {
    setInput(value);
  };

  return (
    <Resizable direction="vertical">
      <div className="h-full flex flex-row">
        <CodeEditor initialValue={inputStr} onChange={handleEditorChange} />
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
