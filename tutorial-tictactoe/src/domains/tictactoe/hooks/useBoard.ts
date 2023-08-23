"use client";

import { useState } from "react";
import { SquareStatus, Stone, SquareStatusEnum } from "../models/board";

type UseBoardProps = {
  rows: number;
  cols: number;
};

export default function useBoard({ rows, cols }: UseBoardProps) {
  const [board, _setBoard] = useState<SquareStatus[]>(
    new Array(rows * cols).fill(SquareStatusEnum.empty)
  );

  // board が全て埋まっているかどうか
  const isBoardFull = board.every(
    (status) => status !== SquareStatusEnum.empty
  );

  // インデックスが範囲内かどうか
  function isInRange(rowIndex: number, colIndex: number) {
    console.log({ rowIndex, rows, cols, colIndex });
    return rows > rowIndex && rowIndex >= 0 && cols > colIndex && colIndex >= 0;
  }

  // square の状態を取得する
  function getSquareStatus(rowIndex: number, colIndex: number): SquareStatus {
    return board[rowIndex * cols + colIndex];
  }

  // stone を指定した場合は、指定した stone が置かれているかどうか
  // stone が未指定の場合は、stone が置かれているかどうか
  function isSquarePut(rowIndex: number, colIndex: number, stone?: Stone) {
    const currentStatus = getSquareStatus(rowIndex, colIndex);

    if (stone) {
      return currentStatus === stone;
    }

    return currentStatus !== SquareStatusEnum.empty;
  }

  // 対象の square に status をセットする
  // 範囲外の場合は例外を投げる
  function setSquare(rowIndex: number, colIndex: number, status: SquareStatus) {
    if (!isInRange(rowIndex, colIndex)) {
      throw RangeError("Index out of range");
    }

    _setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[rowIndex * cols + colIndex] = status;
      return newBoard;
    });
  }

  // 対象の square に stone を置く
  // 既に stone が置かれている場合は例外を投げる
  function put(stone: Stone, rowIndex: number, colIndex: number) {
    if (isSquarePut(rowIndex, colIndex)) {
      throw Error("Already put");
    }

    setSquare(rowIndex, colIndex, stone);
  }

  return {
    board: board as ReadonlyArray<SquareStatus>,
    put,
    getSquareStatus,
    isBoardFull,
  };
}
