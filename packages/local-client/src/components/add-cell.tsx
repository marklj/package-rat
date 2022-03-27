import React from "react";
import { useActions } from "../hooks/use-actions";

interface AddCellProps {
  nextCellId: string | null;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId }) => {
  const { InsertCellAfter } = useActions();
  return (
    <div className="pt-4">
      <div className="mt-4 flex justify-center text-gray-500 border-t border-gray-300">
        <button
          title="Add Code"
          className="relative top-[-14px] block text-xs w-24 rounded-full px-2 py-1 bg-gray-100 hover:bg-white hover:text-blue-600 border border-gray-300 mx-1"
          onClick={() => InsertCellAfter(nextCellId, "code")}
        >
          <span className="font-bold">+</span> Code
        </button>
        <button
          title="Add Text"
          className="relative top-[-14px] block text-xs w-24 rounded-full px-2 py-1 bg-gray-100 hover:bg-white hover:text-blue-600 border border-gray-300 mx-1"
          onClick={() => InsertCellAfter(nextCellId, "text")}
        >
          <span className="font-bold">+</span> Text
        </button>
      </div>
    </div>
  );
};

export default AddCell;
