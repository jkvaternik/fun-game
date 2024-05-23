import React from 'react';
import { GridCell } from "../hooks/useDailyPuzzle";

interface CellProps {
  gridCell: GridCell;
  setIsFrozen: () => void;
}

const Cell: React.FC<CellProps> = ({ gridCell, setIsFrozen }) => {
  const handleClick = () => {
    setIsFrozen();
  };

  const color = () => { 
    switch (gridCell.color) {
      case 'red':
        return gridCell.isFrozen ? 'bg-red-500 border-4 border-red-800' : 'bg-red-500';
      case 'green':
        return gridCell.isFrozen ? 'bg-lime-400 border-4 border-lime-700' : 'bg-lime-400';
      case 'yellow':
        return gridCell.isFrozen ? 'bg-yellow-300 border-4 border-yellow-500' : 'bg-yellow-300';
      case 'orange':
        return gridCell.isFrozen ? 'bg-orange-400 border-4 border-orange-600' : 'bg-orange-400';
      default:
        return 'bg-gray-300';
    }
  }

  const cellStyle = `w-16 h-16 rounded-md ${color()}`;

  return (
    <div className={cellStyle} onClick={handleClick}>
    </div>
  );
}

export default Cell;