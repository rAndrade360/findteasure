import type { Metadata } from "next";
import "./globals.css";
import { H2 } from "./h2";


export const metadata: Metadata = {
  title: "Sala finalizada!",
  description: "Inserir código da sala",
};


export const EndedRoom = () => {
  return (
    <div className="flex gap-4 items-center flex-col sm:flex-col">
      <H2>Oh não!</H2>
      <p>Esta sala já foi encerrada</p>
    </div>
  );
}
