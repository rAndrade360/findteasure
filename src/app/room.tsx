import type { Metadata } from "next";
import "./globals.css";
import { Form } from "./form";
import { H2 } from "./h2";


export const metadata: Metadata = {
  title: "Conectar à sala",
  description: "Inserir código da sala",
};

interface RoomProps {
  room: string;
  setRoom: (room: string) => void;
  submitRoom: (e: React.FormEvent<HTMLInputElement>) => Promise<void>;
}


export const Room: React.FC<RoomProps> = (props) => {
  return (
    <div className="flex gap-4 items-center flex-col sm:flex-col">
      <H2>Contecte-se à uma sala</H2>
      <p>Digite abaixo o código da sala a qual deseja se conectar</p>
      <Form value={props.room} setValue={props.setRoom} submitForm={props.submitRoom} />
    </div>
  );
}
