"use client";

import { SquareStatus, SquareStatusEnum } from "../models/board";

export type SquareProps = {
  status: SquareStatus;
  onClick?: () => void;
};

const displayMarkMap: Record<SquareStatus, string> = {
  [SquareStatusEnum.empty]: "-",
  [SquareStatusEnum.o]: "○",
  [SquareStatusEnum.x]: "✘",
};

export default function Square({ status, onClick }: SquareProps) {
  return (
    <button className="w-8 h-8 border" onClick={onClick}>
      {displayMarkMap[status]}
    </button>
  );
}
