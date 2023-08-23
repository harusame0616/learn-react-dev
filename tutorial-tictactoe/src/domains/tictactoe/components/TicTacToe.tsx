"use client";

import { useState } from "react";
import useBoard from "../hooks/useBoard";
import { Stone, StoneEnum } from "../models/board";
import Board from "./Board";

type TicTacToeProps = {
  size?: number;
};

export default function TicTacToe({ size = 3 }: TicTacToeProps) {
  const { put, getSquareStatus, board, isBoardFull, histories, revertTo } =
    useBoard({
      rows: size,
      cols: size,
    });

  const [currentStone, setCurrentStone] = useState<Stone>(StoneEnum.o);

  function nextTurn() {
    setCurrentStone(StoneEnum.o === currentStone ? StoneEnum.x : StoneEnum.o);
  }

  function putStone(rowIndex: number, colIndex: number) {
    put(currentStone, rowIndex, colIndex);
    nextTurn();
  }
  function checkWinner() {
    let winner: Stone | null = null;

    // 横のチェック
    for (let rowIndex = 0; rowIndex < size; rowIndex++) {
      const firstStone = getSquareStatus(rowIndex, 0);
      if (firstStone === null) {
        break;
      }

      winner = firstStone as Stone;
      for (let colIndex = 1; colIndex < size; colIndex++) {
        if (firstStone !== getSquareStatus(rowIndex, colIndex)) {
          winner = null;
          break;
        }
      }

      if (winner) {
        return winner;
      }
    }

    // 縦チェック
    for (let colIndex = 0; colIndex < size; colIndex++) {
      const firstStone = getSquareStatus(0, colIndex);

      if (firstStone === null) {
        break;
      }
      winner = firstStone as Stone;
      for (let rowIndex = 1; rowIndex < size; rowIndex++) {
        if (firstStone !== getSquareStatus(rowIndex, colIndex)) {
          winner = null;
          break;
        }
      }

      if (winner) {
        return winner;
      }
    }

    // クロスチェック
    let firstStone = getSquareStatus(0, 0);
    if (firstStone !== null) {
      winner = firstStone as Stone;
      for (
        let colIndex = 1, rowIndex = 1;
        colIndex < size;
        colIndex++, rowIndex++
      ) {
        if (firstStone !== getSquareStatus(rowIndex, colIndex)) {
          winner = null;
          break;
        }
      }

      if (winner) {
        return winner;
      }
    }

    firstStone = getSquareStatus(0, size - 1);
    if (firstStone !== null) {
      winner = firstStone as Stone;
      for (
        let colIndex = size - 2, rowIndex = 1;
        colIndex >= 0;
        colIndex--, rowIndex++
      ) {
        if (firstStone !== getSquareStatus(rowIndex, colIndex)) {
          winner = null;
          return;
        }
      }
    }

    return winner;
  }

  const winner = checkWinner();
  const isDraw = !winner && isBoardFull;
  const isFinished = !!winner || isDraw;

  return (
    <div>
      <div className="mb-2">current turn: {currentStone}</div>
      <div className="flex gap-2">
        <div>
          <Board
            cols={size}
            rows={size}
            board={board}
            lock={isFinished}
            onSquareClick={putStone}
          />
        </div>
        <ul>
          {histories.map((_, index) => {
            return (
              <li key={index}>
                <button onClick={() => revertTo(index)}>turn {index}</button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mt-2">
        {winner && <div>winner :{winner}</div>}
        {isDraw && <div>draw</div>}
      </div>
    </div>
  );
}
