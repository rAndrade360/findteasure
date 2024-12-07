import type { Metadata } from "next";
import "./globals.css";
import { ClueModel } from "./page";
import { Form } from "./form";
import { H2 } from "./h2";


export const metadata: Metadata = {
  title: "Resolver charada",
  description: "Inserir nome",
};

interface ClueProps {
  clue: ClueModel | null;
  questionCode: string;
  setQuestionCode: (name: string) => void;
  submitClue: (e: React.FormEvent<HTMLInputElement>) => Promise<void>;
}


export const Clue: React.FC<ClueProps> = (props) => {
  return (
    <div className="flex gap-4 items-center flex-col sm:flex-col">
      <H2>Resolva a charada para encontrar {props.clue?.teasure? "o tesouro!" : "a próxima pergunta!"} </H2>
      <p>{props.clue && props.clue.text}</p>
      {props.clue?.teasure? (
        <>
        </>
      ) : (
        <>
          <p>Digite abaixo o código quando você o encontrar</p>
          <Form value={props.questionCode} setValue={props.setQuestionCode} submitForm={props.submitClue} />
        </>)}
      
    </div>
  );
}
