# Chess

Making a Chess game to improve my understanding of React, Typescript and Object Oriented Programming Principles.

Summary and learnings:

<details>
<summary>Initialization</summary>

Chessboard creation logic (2-d array):

```tsx
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

export default function ChessBoard() {
  let board = [];
  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const number = j + i + 2; // index start at 0
      if (number % 2 === 0) {
        board.push(
          <div className="tile white-tile">
            [{horizontalAxis[i]} {verticalAxis[j]}]
          </div>
        );
      } else {
        board.push(
          <div className="tile black-tile">
            [{horizontalAxis[i]} {verticalAxis[j]}]
          </div>
        );
      }
    }
  }
  return <div id="chessboard">{board}</div>;
}
```

place-content : center place object in the middle of div

Rendering the pieces:

```tsx
interface piece {
  image: string | undefined;
  x: number;
  y: number;
}

const pieces: piece[] = [];

// For rendering other pieces
for (let p = 0; p < 2; p++) {
  const type = p === 0 ? "b" : "w";
  const y = p === 0 ? 7 : 0;
  pieces.push({ image: `assets/images/rook_${type}.png`, x: {value keeps changing}, y })
}
// Rendering the Black pawns
for (let i = 0; i < 8; i++) {
  pieces.push({ image: "assets/images/pawn_b.png", x: i, y: 6 });
}

// Rendering the White pawns
for (let i = 0; i < 8; i++) {
  pieces.push({ image: "assets/images/pawn_w.png", x: i, y: 1 });
}

```

Rendering the image as a background image so the browser doesn't think it is a file:

```tsx
{
  image && (
    <div
      style={{ backgroundImage: `url(${image})` }}
      className="chess-piece"
    ></div>
  );
}
```

image != null && {render} is same as image &&

</details>

<details>
<summary>Moving the pieces</summary>

```tsx
function grabPiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  const element = e.target as HTMLElement;
  if (element.classList.contains("chess-piece")) {
    // change the x and y postions
  }
  // recognize the grabbed element as the active piece
}

function movePiece(e: React.MouseEvent) {
  if (activePiece) {
    // utilizes the active piece and not other peices
    const x = e.clientX - 50;
    const y = e.clientY - 50;
    activePiece.style.position = "absolute";
    activePiece.style.left = `${x}px`;
    activePiece.style.top = `${y}px`;
  }
}

function dropPiece(e: React.MouseEvent) {
  if (activePiece) {
    activePiece = null;
  }
}
```

useRef - similiar to state, it persists between re-renders however does not re-render the component. You never want to set the value using ref as it does not update the state

Logged the chessboard ref to get offsetX and Y. offset is the mouse relative position to its values.

```tsx
const minX = chessboard.offsetLeft;
const minY = chessboard.offsetLeft;
activePiece.style.left = x < minX ? `${minX}px` : `${x}px`;
activePiece.style.top = y < minY ? `${minY}px` : `${y}px`;
```

The math.floor() function rounds a number down to the nearest integer, while the math.ceil() function rounds a number up to the nearest integer

Implementing grid snapping:

```tsx
//1. Create inital states:
const [activePiece, setActivePiece] = useState<HTMLElement>(null);
const [gridX, setGridX] = useState(0);
const [gridY, setGirdY] = useState(0);
// 2. Update grabPiece fnc. :
if (element.classList.contains("chess-piece") && chessboard) {
  const updatedGridX = Math.floor((e.clientX - chessboard.offsetLeft) / 100); // gives value in 100,hence division
  const updatedGridY = Math.abs(
    Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)
  ); // Substracts 800 for 0.0 to start a left bottom
  setGridX(updatedGridX);
  setGirdY(updatedGridY);
// 3. Update the piece and pieces array :
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
```

</details>
