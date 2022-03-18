import { useEffect, useState } from "react";
import { CodeEditor } from "./code-editor";
import Preview from "./preview";
import bundle from "../bundler";

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
    <div>
      <CodeEditor initialValue={inputStr} onChange={handleEditorChange} />
      <div>
        <button
          className="rounded bg-indigo-600 text-white px-2 py-1 text-xl"
          onClick={onClick}
        >
          Submit
        </button>
      </div>
      <Preview code={code} />
    </div>
  );
};

export default CodeCell;
