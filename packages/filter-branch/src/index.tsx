import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let inputStr = '';
inputStr = "import 'bulma/css/bulma.css'";

const App = () => {
    const [input, setInput] = useState(inputStr);
    const [code, setCode] = useState('');

    const startService = async () => {
        await esbuild.initialize({
            worker: true,
            wasmURL: 'https://unpkg.com/esbuild-wasm@0.14.23/esbuild.wasm',
        })
    }
    const onClick = async () => {
        const result = await esbuild.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(), fetchPlugin(input)],
            target: 'es2015',
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window',
            }
        });

        setCode(`
            <script>
                ${result.outputFiles[0].text}
            </script>
        `);
    }

    useEffect(() => {
        startService();
    }, []);

    return <>
        <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
        ></textarea>
        <div>
            <button onClick={onClick}>Submit</button>
        </div>
        {/* <pre>{code}</pre> */}
        <iframe sandbox="allow-scripts" frameBorder="1" srcDoc={code}></iframe>
    </>;
}

ReactDOM.render(<App />, document.querySelector('#root'));