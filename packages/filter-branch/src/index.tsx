import "./index.css";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { CodeEditor } from "./components/code-editor";
import Preview from "./components/preview";
import bundle from "./bundler";
import * as esbuild from "esbuild-wasm";

const inputStr = `import React from 'react';
import ReactDOM from 'react-dom';
const App = () => {
  return <h1>Hi React!</h1>;
};
ReactDOM.render(<App />, document.querySelector('#root'));
`;

let service: boolean = false;
const startService = async () => {
  await esbuild.initialize({
    worker: true,
    wasmURL: "https://unpkg.com/esbuild-wasm@0.14.25/esbuild.wasm",
  });
};

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    if (!service) {
      setInput(inputStr);
      startService().then(() => {
        service = true;
      });
    }
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
    <>
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
    </>
  );
};

ReactDOM.render(<App />, document.querySelector("#parentroot"));
