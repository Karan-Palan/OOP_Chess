import { useRef, useState } from "react";
import Tile from "../Tile/Tile";
import "./Chessboard.css";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

interface piece {
  image: string;
  x: number;
  y: number;
}

const initialBoardState: piece[] = [];

// For rendering other pieces
for (let p = 0; p < 2; p++) {
  const type = p === 0 ? "b" : "w";
  const y = p === 0 ? 7 : 0;
  initialBoardState.push({ image: `assets/images/rook_${type}.png`, x: 0, y });
  initialBoardState.push({ image: `assets/images/rook_${type}.png`, x: 7, y });
  initialBoardState.push({
    image: `assets/images/knight_${type}.png`,
    x: 1,
    y,
  });
  initialBoardState.push({
    image: `assets/images/knight_${type}.png`,
    x: 6,
    y,
  });
  initialBoardState.push({
    image: `assets/images/bishop_${type}.png`,
    x: 2,
    y,
  });
  initialBoardState.push({
    image: `assets/images/bishop_${type}.png`,
    x: 5,
    y,
  });
  initialBoardState.push({ image: `assets/images/queen_${type}.png`, x: 3, y });
  initialBoardState.push({ image: `assets/images/king_${type}.png`, x: 4, y });
}
// Rendering the Black pawns
for (let i = 0; i < 8; i++) {
  initialBoardState.push({ image: "assets/images/pawn_b.png", x: i, y: 6 });
}

// Rendering the White pawns
for (let i = 0; i < 8; i++) {
  initialBoardState.push({ image: "assets/images/pawn_w.png", x: i, y: 1 });
}

export default function ChessBoard() {
  const [activePiece, setActivePiece] = useState<HTMLElement>(null);
  const [gridX, setGridX] = useState(0);
  const [gridY, setGirdY] = useState(0);
  // Creating a state for pieces
  const [pieces, setPieces] = useState<piece[]>(initialBoardState);
  let chessboardRef = useRef<HTMLDivElement>(null);

  function grabPiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const element = e.target as HTMLElement;
    const chessboard = chessboardRef.current;
    if (element.classList.contains("chess-piece") && chessboard) {
      const updatedGridX = Math.floor(
        (e.clientX - chessboard.offsetLeft) / 100
      ); // gives value in 100,hence division
      const updatedGridY = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)
      ); // Substracts 800 for 0.0 to start a left bottom
      setGridX(updatedGridX);
      setGirdY(updatedGridY);

      const x = e.clientX - 50;
      const y = e.clientY - 50;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
    }

    setActivePiece(element); //recognizes it as the active piece
  }

  function movePiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      // utilizes the active piece and not other peices
      const minX = chessboard.offsetLeft;
      const minY = chessboard.offsetTop;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      activePiece.style.position = "absolute";
      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      } else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      }
      //If x is in the constraints
      else {
        activePiece.style.left = `${x}px`;
      }

      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      } else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      }
      //If y is in the constraints
      else {
        activePiece.style.top = `${y}px`;
      }
    }
  }

  function dropPiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)
      );

      setPieces((value) => {
        const pieces = value.map((p) => {
          if (p.x === gridX && p.y === gridY) {
            p.x = x; // Update the x-coordinate
            p.y = y; // Update the y-coordinate
          }
          return p; // Return the updated or unchanged piece
        });
        return pieces; // Return the updated array
      });
    }
    setActivePiece(null); //set null as not activePiece
  }
  let board = [];
  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const number = j + i + 2; // index start at 0
      let image = "";
      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });
      board.push(<Tile key={`${j} ${i}`} image={image} number={number} />);
    }
  }
  return (
    <div
      onMouseMove={(e) => movePiece(e)}
      onMouseDown={(e) => grabPiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      id="chessboard"
      ref={chessboardRef}
    >
      {board}
    </div>
  );
}
