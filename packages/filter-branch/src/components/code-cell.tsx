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
  const [error, setError] = useState("");

  useEffect(() => {
    setInput(inputStr);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      bundleAndOutput();
    }, 750);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  const bundleAndOutput = async () => {
    const output = await bundle(input);
    setCode(output.code);
    setError(output.error);
  };

  const handleEditorChange = (value: string) => {
    setInput(value);
  };

  return (
    <Resizable direction="vertical">
      <div className="h-full flex flex-row">
        <Resizable direction="horizontal">
          <CodeEditor initialValue={inputStr} onChange={handleEditorChange} />
        </Resizable>
        <Preview code={code} error={error} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
