import { useState } from "react";
import { Stone, StoneEnum } from "../models/board";
import useBoard from "./useBoard";

export default function useTicTacToe({ size }: { size: number }) {
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

  return {
    board,
    histories,
    currentStone,
    winner,
    isDraw,
    isFinished,
    putStone,
    revertTo,
  };
}
