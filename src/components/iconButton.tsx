import React from "react";

type Props = {
  title: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  icon: React.ReactNode;
};

export default ({ title, onClick, icon }: Props) => (
  <button
    type="button"
    className="btn btn-link"
    title={title}
    onClick={onClick}
  >
    {icon}
  </button>
);
