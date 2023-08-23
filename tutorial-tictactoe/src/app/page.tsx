import TicTacToe from "@/domains/tictactoe/components/TicTacToe";

export default function Home() {
  return (
    <div>
      <TicTacToe size={3} />
      <TicTacToe size={5} />
      <TicTacToe size={8} />
    </div>
  );
}
