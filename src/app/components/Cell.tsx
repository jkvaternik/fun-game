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
        return gridCell.isFrozen ? 'bg-red-600' : 'bg-red-300';
      case 'green':
        return gridCell.isFrozen ? 'bg-green-600' : 'bg-green-300';
      case 'yellow':
        return gridCell.isFrozen ? 'bg-yellow-600' : 'bg-yellow-300';
      case 'orange':
        return gridCell.isFrozen ? 'bg-orange-600' : 'bg-orange-300';
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