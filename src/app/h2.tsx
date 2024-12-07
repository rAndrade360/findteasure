
import React, { ReactNode } from "react";
import "./globals.css";

interface H2Props {
  children: ReactNode;
}

export const H2: React.FC<H2Props> = (props) => {
  return (
     <h2 className="mt-10 text-center text-xl/9 font-bold tracking-tight text-gray-900">{props.children}</h2>
  );
}
