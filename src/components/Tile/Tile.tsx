import "./Tile.css";

interface Props {
  image: string;
  number: number;
}

export default function Tile({ number, image }: Props) {
  return number % 2 === 0 ? (
    <div className="tile white-tile">
      {/* Converting an image to background div */}
      <div
        style={{ backgroundImage: `url(${image})` }}
        className="chess-peice"
      ></div>
    </div>
  ) : (
    <div className="tile black-tile">
      <div
        style={{ backgroundImage: `url(${image})` }}
        className="chess-peice"
      ></div>
    </div>
  );
}
