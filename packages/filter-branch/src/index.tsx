import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const App = () => {
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const startService = async () => {
        await esbuild.initialize({
            worker: true,
            wasmURL: '/esbuild.wasm',
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

        console.log(result)
        setCode(result.outputFiles[0].text);
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
        <pre>{code}</pre>
    </>;
}

ReactDOM.render(<App />, document.querySelector('#root'));