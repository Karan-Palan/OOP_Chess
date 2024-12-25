import "./Tile.css";

interface Props {
  image: string;
  number: number;
}

export default function Tile({ number, image }: Props) {
  return number % 2 === 0 ? (
    <div className="tile white-tile">
      <img src={image} />
    </div>
  ) : (
    <div className="tile black-tile">
      <img src={image} />
    </div>
  );
}
