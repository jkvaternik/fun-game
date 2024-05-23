import React from "react";
import { ModalComponent } from "./ModalComponent";
import { getShareableEmojiScore } from "../utils";
import { GridCell } from "../hooks/useDailyPuzzle";
import { Bounce, toast } from "react-toastify";

type Props = {
  puzzleNumber: number;
  grid: GridCell[][];
  isOpen: boolean;
  onClose: () => void;
}

const GameOverModal = ({ puzzleNumber, grid, isOpen, onClose }: Props) => {
  const copyScore = () => {
    navigator.clipboard.writeText(`Sections (#${puzzleNumber})\n${getShareableEmojiScore(grid)}`);

    // Show a toast above the game over modal that is white text on a green background
    // and disapears after 2 seconds
    toast.success('Score copied to clipboard', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }

  return (
    <ModalComponent delayMs={2000} show={isOpen} onClose={onClose} showChildren={isOpen}>
      <div className="px-9 pt-3 text-center">
        <p className="mb-2 font-semibold">Sections #13</p>
        <p className="mb-5 text-3xl" style={{ whiteSpace: "pre-line" }}>{getShareableEmojiScore(grid)}</p>
        <button className="py-2 px-4 bg-amber-600 text-white font-medium rounded-full hover:hover:bg-amber-700 w-full mb-9" onClick={copyScore}>
          Share
        </button>
      </div>
    </ModalComponent>
  );
}


export default GameOverModal;