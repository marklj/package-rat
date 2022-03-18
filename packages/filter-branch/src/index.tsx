import "./index.css";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import * as esbuild from "esbuild-wasm";
import CodeCell from "./components/code-cell";

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
  useEffect(() => {
    if (!service) {
      startService().then(() => {
        service = true;
      });
    }
  }, []);

  return (
    <>
      <CodeCell />
    </>
  );
};

ReactDOM.render(<App />, document.querySelector("#parentroot"));
