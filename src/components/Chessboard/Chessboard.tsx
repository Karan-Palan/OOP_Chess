import Tile from "../Tile/Tile";
import "./Chessboard.css";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

interface Peice {
  image: string | undefined;
  x: number;
  y: number;
}

const peices: Peice[] = [];

// For rendering other peices
for (let p = 0; p < 2; p++) {
  const type = p === 0 ? "b" : "w";
  const y = p === 0 ? 7 : 0;
  peices.push({ image: `assets/images/rook_${type}.png`, x: 0, y });
  peices.push({ image: `assets/images/rook_${type}.png`, x: 7, y });
  peices.push({ image: `assets/images/knight_${type}.png`, x: 1, y });
  peices.push({ image: `assets/images/knight_${type}.png`, x: 6, y });
  peices.push({ image: `assets/images/bishop_${type}.png`, x: 2, y });
  peices.push({ image: `assets/images/bishop_${type}.png`, x: 5, y });
  peices.push({ image: `assets/images/queen_${type}.png`, x: 3, y });
  peices.push({ image: `assets/images/king_${type}.png`, x: 4, y });
}
// Rendering the Black peices
for (let i = 0; i < 8; i++) {
  peices.push({ image: "assets/images/pawn_b.png", x: i, y: 6 });
}

// Rendering the White peices
for (let i = 0; i < 8; i++) {
  peices.push({ image: "assets/images/pawn_w.png", x: i, y: 1 });
}

export default function ChessBoard() {
  let board = [];
  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const number = j + i + 2; // index start at 0
      let image = undefined;
      peices.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });
      board.push(<Tile key={`${j} ${i}`} image={image} number={number} />);
    }
  }
  return <div id="chessboard">{board}</div>;
}
