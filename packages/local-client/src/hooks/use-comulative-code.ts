import { useTypedSelector } from "./use-typed-selector";
const showFunc = `
  import _React from "react";
  import _ReactDOM from "react-dom";
  var show = (value) => {
    const documentRoot = document.querySelector('#root');
    if(typeof value === 'object') {
      if(value.$$typeof && value.props) {
        _ReactDOM.render(value, documentRoot);
      } else {
        documentRoot.innerHTML = JSON.stringify(value);
      }
    } else {
      documentRoot.innerHTML = value;
    }
  };
  `;
const showFuncNoop = `
   var show = (value) => { }
`;

export const useComulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    let currentCodeAdded = false;
    return state.cells.order.reduce((previousCode, cId) => {
      if (state.cells.data[cId].type === "code") {
        if (!currentCodeAdded) {
          currentCodeAdded = cId === cellId;
          return `
          ${previousCode}\n
          ${currentCodeAdded ? showFunc : showFuncNoop}\n
          ${state.cells.data[cId].content}
        `;
        }
        return previousCode;
      }
      return "";
    }, "");
  });
};
