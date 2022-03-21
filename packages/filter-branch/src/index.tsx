import "./index.css";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import * as esbuild from "esbuild-wasm";
import CodeCell from "./components/code-cell";
import TextEditor from "./components/text-editor";

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
      <TextEditor />
    </>
  );
};

ReactDOM.render(<App />, document.querySelector("#parentroot"));
