import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
    name: 'filecache',
});

export const fetchPlugin = (inputCode: string) => {
    return  {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild) {
        build.onLoad({ filter: /.*/ }, async (args: any) => {
            if (args.path === 'index.js') {
              return {
                loader: 'jsx',
                contents: inputCode,
              };
            }

            const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

            if(cachedResult) {
                return cachedResult;
            }

            const response = await axios.get(args.path);
            const result =  {
                loader: 'jsx',
                contents: response.data,
                resolveDir: new URL('./', response.request.responseURL).pathname
            };

            await fileCache.setItem(args.path, result);

            return result as esbuild.OnLoadResult;
          });
        }
    }
}