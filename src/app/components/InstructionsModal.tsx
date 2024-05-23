import { useEffect, useState } from "react";
import { HeartIcon } from '@heroicons/react/24/solid';
import { ModalComponent } from "./ModalComponent"

export const InstructionsModal = ({ isOpen, onClose }:
  {
    isOpen: boolean,
    onClose: () => void
  }) => {

  return (
    <ModalComponent delayMs={500} show={isOpen} onClose={onClose} showChildren={isOpen}>
      <div className="p-12 pt-0">
        <h2 className={`text-2xl mb-4 font-bold text-amber-900`}>SECTIONS</h2>
        <p className="text-l">Your goal is to separate the colors into the four corners of a 4x4 board such that each group of colors is grouped together. For example:</p>
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-4 my-4 w-40 h-40">
            <>
              <div className="w-8 h-8 bg-red-500 rounded-md"></div>
              <div className="w-8 h-8 bg-red-500 rounded-md"></div>
              <div className="w-8 h-8 bg-lime-400 rounded-md"></div>
              <div className="w-8 h-8 bg-lime-400 rounded-md"></div>
            </>

            <>
              <div className="w-8 h-8 bg-red-500 rounded-md"></div>
              <div className="w-8 h-8 bg-red-500 rounded-md"></div>
              <div className="w-8 h-8 bg-lime-400 rounded-md"></div>
              <div className="w-8 h-8 bg-lime-400 rounded-md"></div>
            </>

            <>
              <div className="w-8 h-8 bg-yellow-300 rounded-md"></div>
              <div className="w-8 h-8 bg-yellow-300 rounded-md"></div>
              <div className="w-8 h-8 bg-orange-400 rounded-md"></div>
              <div className="w-8 h-8 bg-orange-400 rounded-md"></div>
            </>

            <>
              <div className="w-8 h-8 bg-yellow-300 rounded-md"></div>
              <div className="w-8 h-8 bg-yellow-300 rounded-md"></div>
              <div className="w-8 h-8 bg-orange-400 rounded-md"></div>
              <div className="w-8 h-8 bg-orange-400 rounded-md"></div>
            </>

          </div>
        </div>
        <p className="text-l font-bold mb-2">Note: The order of the colors doesn&apos;t matter.</p>
        <p className="text-l mb-2">For one move, section off a group of squares to freeze in place. Then hit shuffle. All of the unfrozen squares with shuffle.</p>
        <p className="text-l  mb-2">You have three moves. Good luck.</p>
      </div>
    </ModalComponent>
  );
}
