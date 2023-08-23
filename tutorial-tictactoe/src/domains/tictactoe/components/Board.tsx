"use client";

import { SquareStatus } from "../models/board";
import Square from "./Square";

type BoardProps = {
  rows: number;
  cols: number;
  board: Readonly<SquareStatus[]>;
  lock?: boolean;
  onSquareClick: (rowIndex: number, colIndex: number) => void;
};

export default function Board({
  rows = 3,
  cols = 3,
  board,
  lock = false,
  onSquareClick,
}: BoardProps) {
  return (
    <div className={lock ? "pointer-events-none" : ""}>
      {Array.from({ length: rows }, (_, rowIndex) => (
        <div key={rowIndex}>
          {Array.from({ length: cols }, (_, colIndex) => (
            <Square
              key={colIndex}
              status={board[rowIndex * cols + colIndex]}
              onClick={() => onSquareClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
