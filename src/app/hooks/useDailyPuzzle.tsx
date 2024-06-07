import { useState, useEffect } from 'react';
import puzzlesData from '../data/puzzles.json';
import { generateGrid } from '../utils';


export type GridCell = {
  color: string;
  isFrozen: boolean;
}

type PuzzleInput = {
  num: number;
  startingGrid: string[][];
}

export type Puzzle = {
  num: number;
  startingGrid: GridCell[][];
}

const puzzles: { [key: string]: PuzzleInput } = puzzlesData;

// This hook returns the puzzle for the current day
// If there is no puzzle for today, it returns null
const useDailyPuzzle: () => Puzzle | null = () => {
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);

  useEffect(() => {
    const today: string = getCurrentLocalDateAsString()
    const dailyPuzzle: PuzzleInput = puzzles[today]

    const startingGrid: GridCell[][] = dailyPuzzle?.startingGrid.map(row => row.map(cell => {
      return {
        color: cell,
        isFrozen: false,
      }
    }));
    
    if (startingGrid) {
      setPuzzle({
        num: getPuzzleNum(),
        startingGrid: startingGrid
      });
    } else {
      // Handle the case where there is no puzzle for today
      null
    }
  }, []);

  return puzzle;
}

const getPuzzleNum = () => {
  const now = new Date();
  const start = new Date(2024, 5, 9);
  // Calculating the time difference
  // of two dates
  let Difference_In_Time = now.getTime() - start.getTime();

  // Calculating the no. of days between
  // two dates
  let Difference_In_Days = Math.round
    (Difference_In_Time / (1000 * 3600 * 24));

  return Difference_In_Days
}

const getCurrentLocalDateAsInt = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // getMonth() returns 0-11
  const day = now.getDate();

  // Pad the month and day with a leading zero if they are less than 10
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  return parseInt(`${year}${formattedMonth}${formattedDay}`);
}

const getCurrentLocalDateAsString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // getMonth() returns 0-11
  const day = now.getDate();

  // Pad the month and day with a leading zero if they are less than 10
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  return `${year}${formattedMonth}${formattedDay}`;
}

export default useDailyPuzzle;
