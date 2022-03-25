import { useEffect } from "react";
import { CodeEditor } from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";
import ProgressBar from "./progress-bar";
import { useComulativeCode } from "../hooks/use-comulative-code";

const initalValue = `import React from 'react';
import ReactDOM from 'react-dom';
const App = () => {
  return <h1>Hi React!</h1>;
};
ReactDOM.render(<App />, document.querySelector('#root'));
`;

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { UpdateCell, CreateBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles.items[cell.id]);
  const cumulativeCode = useComulativeCode(cell.id);

  const bundlerInitialized = useTypedSelector(
    ({ bundles: { isInit } }) => isInit
  );

  useEffect(() => {
    if (bundlerInitialized && !bundle) {
      CreateBundle(cell.id, cumulativeCode);
      return;
    }
    const timer = setTimeout(() => {
      CreateBundle(cell.id, cumulativeCode);
    }, 750);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id, cell.content, CreateBundle, bundlerInitialized]);

  const handleEditorChange = (value: string) => {
    UpdateCell(cell.id, value);
  };

  return (
    <Resizable direction="vertical">
      <div className="h-full flex flex-row">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content || initalValue}
            onChange={handleEditorChange}
          />
        </Resizable>
        {!bundle || bundle.loading ? (
          <div className="h-full w-full bg-white">
            <ProgressBar />
          </div>
        ) : (
          <Preview code={bundle.code} error={bundle.error} />
        )}
      </div>
    </Resizable>
  );
};

export default CodeCell;
