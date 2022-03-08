import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

let inputStr = "";
inputStr = `import React from 'react'
import ReactDOM from 'react-dom'
const App = () => {
    return <h1>Hi React!</h1>
}
ReactDOM.render(<App />, document.querySelector('#root'))
`;

const App = () => {
  const [input, setInput] = useState(inputStr);
  const iframe = useRef<any>();

  const iframeHtml = `
        <html>
            <head></head>
            <body>
                <div id="root"></div>
                <script>
                    window.addEventListener('message', (event) => {
                        try {
                            eval(event.data);
                        } catch (error) {
                            const root = document.querySelector('#root');
                            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + error + '</div>';
                            console.error;
                        }
                    }, false)
                </script>
        </html>
    `;

  const startService = async () => {
    await esbuild.initialize({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.14.23/esbuild.wasm",
    });
  };

  const onClick = async () => {
    iframe.current.srcdoc = iframeHtml;
    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      target: "es2015",
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
  };

  useEffect(() => {
    startService();
  }, []);

  return (
    <>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        frameBorder="1"
        srcDoc={iframeHtml}
      ></iframe>
    </>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
