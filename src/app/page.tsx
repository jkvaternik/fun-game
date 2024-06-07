"use client"

import React, { useEffect } from 'react';
import Cell from './components/Cell';
import { generateRandomColor, getLocalStorageOrDefault, isNewVisitor, setLocalStorageAndState } from './utils';
import GameOverModal from './components/GameOverModal';
import { InstructionsModal } from './components/InstructionsModal';
import useDailyPuzzle, { GridCell } from './hooks/useDailyPuzzle';

export default function Home() {
  const puzzle = useDailyPuzzle();

  const [showInstructionsModal, setShowInstructionsModal] = React.useState<boolean>(false);
  const [grid, setGrid] = React.useState<GridCell[][]>(getLocalStorageOrDefault('grid', [])); 
  const [lives, setLives] = React.useState<number>(getLocalStorageOrDefault('lives', 3));
  const [isGameOver, setIsGameOver] = React.useState<boolean>(getLocalStorageOrDefault('isGameOver', false));
  const [showModal, setShowModal] = React.useState<boolean>(getLocalStorageOrDefault('isGameOver', false));

  useEffect(() => {
    if(isNewVisitor()) {
      setShowInstructionsModal(true);
    }
    localStorage.setItem('lastVisit', JSON.stringify(new Date().toLocaleString()));
    if (grid.length === 0) {
      setLocalStorageAndState('grid', puzzle?.startingGrid ?? [], setGrid);
    }
  }, [grid.length, puzzle?.startingGrid]);

  if (puzzle === null) {
    return (
      <main className="flex flex-col items-center mt-12 p-12 gap-5">
        <h1 className="font-sans text-amber-700 font-semibold text-2xl">SECTIONS</h1>
        <p className='text-amber-900'>Sorry, there was an issue generating the puzzle. Please refresh.</p>
      </main>
    );
  }

  const handleMove = () => {
    if (isGameOver) {
      return;
    }

    const swappableColors = [
      {color: 'red', spots: 0},
      {color: 'green', spots: 0},
      {color: 'yellow', spots: 0},
      {color: 'orange', spots: 0}
    ];

    const nonFrozenCells = grid.flat().filter(c => !c.isFrozen);
    nonFrozenCells.forEach(cell => 
      swappableColors.find(color => color.color === cell.color)!.spots++
    );
  
    const newGrid = grid.map(row => row.map(cell => {
      if (!cell.isFrozen) {
          const newColor = generateRandomColor(swappableColors.filter(color => color.spots != 0).map(color => color.color));
          cell.color = newColor;
          swappableColors.find(color => color.color === newColor)!.spots--;
      }
      return {...cell, isFrozen: false};
    }));

    setLocalStorageAndState('grid', newGrid, setGrid);
    const newLives = lives - 1;
    if (newLives === 0) {
      setLocalStorageAndState('isGameOver', true, setIsGameOver);
      setShowModal(true);
    }
    setLocalStorageAndState('lives', newLives, setLives); 
  }

  const freezeCell = (i: number, j: number) => {
    if (isGameOver) {
      return;
    }
    const newGrid = grid.map((row, rowIndex) => row.map((cell, cellIndex) => {
      if (i === rowIndex && j === cellIndex) {
        cell.isFrozen = !cell.isFrozen;
      }
      return cell;
    }));
    setLocalStorageAndState('grid', newGrid, setGrid);
  }
  
  const gridView = grid.map((row, i) => {
    return (
      <>
        {row.map((cell, j) => {
          return <Cell key={`${i} + ${j}`} gridCell={cell} setIsFrozen={() =>freezeCell(i, j)} />;
        })}
      </>
    );
  });

  return (
    <main className="flex flex-col items-center mt-12 p-12 gap-5">
        <h1 className="font-sans text-amber-700 font-semibold text-2xl">SECTIONS</h1>
      <InstructionsModal isOpen={showInstructionsModal} onClose={() => setShowInstructionsModal(false)} />
      <div className="flex flex-row gap-2 items-center">
        <span className='text-amber-900'>Moves left:</span>
        {Array.from({ length: 3 - lives }, (_, index) => (
          <div
            key={index}
            className="w-4 h-4 border-2 border-amber-700 rounded-full"
          ></div>
        ))}
        {Array.from({ length: lives }, (_, index) => (
          <div
            key={3 - index}
            className="w-4 h-4 bg-amber-700 rounded-full"
          ></div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {gridView}
      </div>
      {
        isGameOver ? (
          <button onClick={() => setShowModal(true)} className="bg-amber-600 text-white font-bold py-2 px-4 rounded-full hover:bg-amber-700">See score</button>
        ) : (
          <div className='flex flex-col gap-4'>
            <button onClick={() => handleMove()} className="bg-amber-600 text-white font-bold py-2 px-4 rounded-full hover:bg-amber-700">Shuffle</button>
            <button onClick={() => setShowInstructionsModal(true)} className="border-amber-600 border-2 text-amber-600 font-bold py-2 px-4 rounded-full hover:bg-amber-700 hover:text-white">Instructions</button>
          </div>
        )
      }
      <GameOverModal puzzleNumber={puzzle.num} grid={grid} isOpen={showModal} onClose={() => setShowModal(false)} />
    </main>
  );
}
