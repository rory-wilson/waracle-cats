import React from "react";
import { Menu } from "./";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default ({ title, children }: Props) => (
  <div className="col-lg-10 mx-auto">
    <header className="border-bottom">
      <Menu />
    </header>

    <main className="mx-2 mx-lg-0">
      <h1>{title}</h1>
      {children}
    </main>

    <footer className="pt-2 mx-2 mx-lg-0 my-5 text-muted border-top">
      Created by Rory Wilson · © 2021
    </footer>
  </div>
);
