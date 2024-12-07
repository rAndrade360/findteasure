import type { Metadata } from "next";
import "./globals.css";
import { QuestionModel } from "./page";
import { Form } from "./form";
import { H2 } from "./h2";


export const metadata: Metadata = {
  title: "Responda à pergunta",
  description: "Inserir nome",
};

interface QuestionProps {
  question: QuestionModel | null;
  answer: string;
  setAnswer: (name: string) => void;
  submitQuestionResponse: (e: React.FormEvent<HTMLInputElement>) => Promise<void>;
}


export const Question: React.FC<QuestionProps> = (props) => {

  return (
    <div className="flex gap-4 items-center flex-col sm:flex-col">
      <H2>Responda a pergunta para desbloquer a charada!</H2>
      <p>{props.question && props.question.text}</p>
      <Form value={props.answer} setValue={props.setAnswer} submitForm={props.submitQuestionResponse} />
    </div>
  );
}
