import type { Metadata } from "next";
import "./globals.css";
import { H2 } from "./h2";


export const metadata: Metadata = {
  title: "Carregando!",
  description: "",
};

export default function Loading(){
  return (
    <div className="flex gap-4 items-center flex-col sm:flex-col">
      <H2>Carregando...</H2>
    </div>
  );
}
