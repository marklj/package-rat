import React, { Fragment } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import AddCell from "./add-cell";
import CellListItem from "./cell-list-item";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );
  const addCellStyle = `${
    cells.length ? "opacity-0" : ""
  } hover:opacity-100 transition-opacity duration-300 ease-in-out`;
  const renderedCells = cells.map((cell, index) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <div className={addCellStyle}>
        <AddCell nextCellId={cell.id} />
      </div>
    </Fragment>
  ));

  return (
    <div className="m-4">
      <div className={addCellStyle}>
        <AddCell nextCellId={null} />
      </div>
      {renderedCells}
    </div>
  );
};

export default CellList;
