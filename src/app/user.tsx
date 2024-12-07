import type { Metadata } from "next";
import "./globals.css";
import { Form } from "./form";
import { H2 } from "./h2";


export const metadata: Metadata = {
  title: "Criar usuário",
  description: "Inserir nome",
};

interface UserProps {
  name: string;
  setName: (name: string) => void;
  submitUser: (e: React.FormEvent<HTMLInputElement>) => Promise<void>;
}


export const User: React.FC<UserProps> = (props) => {
  return (
    <div className="flex gap-4 items-center flex-col sm:flex-col">
      <H2>Criar usuário</H2>
      <p>Como devo te chamar?</p>
      <Form value={props.name} setValue={props.setName} submitForm={props.submitUser} />
    </div>
  );
}
