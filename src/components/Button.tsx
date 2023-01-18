import { MouseEventHandler } from "react";

interface ButtonProps {
  children: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className="bg-green-500 rounded-3xl hover:shadow-md"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
