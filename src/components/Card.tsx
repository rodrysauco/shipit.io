import Play from "../assets/play.png";

interface CardProps {
  name: string;
  image: string;
  preview_url: string;
  className?: string;
}

export const Card = ({ className, name, image, preview_url }: CardProps) => {
  const audio = new Audio(preview_url);
  const toggle = () => {
    audio.play();
  };

  return (
    <div
      className={`${className} bg-[#343434] h-24 hover:shadow-md flex cursor-pointer max-w-md`}
    >
      <img className="h-full w-24" src={image} alt="Episode cover" />
      <div className="px-3 py-1 flex items-center justify-between w-full">
        <div className="font-bold w-3/4">{name} </div>
        <div
          className="rounded-full bg-green-500 w-10 h-10 flex justify-center items-center cursor-pointer"
          onClick={toggle}
        >
          <img src={Play} alt="Play" />
        </div>
      </div>
    </div>
  );
};
