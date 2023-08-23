"use client";

import useTicTacToe from "../hooks/useTicTacToe";
import Board from "./Board";

type TicTacToeProps = {
  size?: number;
};

export default function TicTacToe({ size = 3 }: TicTacToeProps) {
  const {
    currentStone,
    board,
    isFinished,
    putStone,
    histories,
    revertTo,
    winner,
    isDraw,
  } = useTicTacToe({ size });

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
