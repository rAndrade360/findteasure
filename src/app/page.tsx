'use client'

import { useEffect, useState } from "react";
import {User} from "./user";
import { Room } from "./room";
import { WaitRoom } from "./wait_room";
import {EndedRoom} from './ended_room';
import {Clue} from './clue';
import {Question} from './question';

export type RoomModel = {
  id: number
  code: string
  status: string
  max_points: number
}

export type UserModel = {
  id: number
  name: string
  session_id: string
}

export type ClueModel = {
  id: number
  text: string
  question_code: string
  teasure: boolean
}

export type QuestionModel = {
  id: number
  text: string,
  code: string,
  hints: string[]
}

const API_URL = "https://aytlrlp0fb.execute-api.us-east-1.amazonaws.com/prd"

export default function Home() {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState<UserModel | null>(null);

  const [roomCode, setRoomCode] = useState("");
  const [room, setRoom] = useState<RoomModel | null>(null);
  
  const [questionCode, setQuestionCode] = useState("");
  const [clue, setClue] = useState<ClueModel | null>(null);
  const [question, setQuestion] = useState<QuestionModel | null>(null);
  const [questionOrClue, setQuestionOrClue] = useState('clue');
  const [questionAnswer, setQuestionAnswer] = useState('');

  useEffect(() => {
    if (!user) {
      const user = localStorage.getItem("user");
      if (user) {
        return setUser(JSON.parse(user));
      }
      setUser(null)
    }

    if(!room) {
      const room = localStorage.getItem("room");
      if (room) {
        return setRoom(JSON.parse(room));
      }
      setRoom(null)
    }

    if(!clue) {
      const clue = localStorage.getItem("clue");
      if (clue) {
        return setClue(JSON.parse(clue));
      }
      setClue(null)
    }

    if(!question) {
      const question = localStorage.getItem("question");
      if (question) {
        return setQuestion(JSON.parse(question));
      }
      setQuestion(null)
    }

    if(!questionOrClue) {
      const questionOrClue = localStorage.getItem("questionOrClue");
      if (questionOrClue) {
        return setQuestionOrClue(JSON.parse(questionOrClue));
      }
      setQuestionOrClue('clue')
    }

  }, [room, question, clue, user, questionOrClue])

  const setQuestionOrClueLocal = (questionOrClue: string)  => {
    localStorage.setItem("questionOrClue", JSON.stringify(questionOrClue));
    setQuestionOrClue(questionOrClue)
  }

  const submitUser = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
      }),
    })

    if (response.status != 200) {
      console.log("Erro ao criar usuário");
      return;
    }

    const data = await response.json();
    console.log(data);

    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);

    console.log(userName);
  }

  const submitRoom = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const response = await fetch(`${API_URL}/rooms/${roomCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.status != 200) {
      console.log("Erro ao buscar sala");
      return;
    }

    const data = await response.json();
    console.log(data);

    setRoom(data);

    localStorage.setItem("room", JSON.stringify(data));

    console.log(roomCode);

    await linkUserRoom(user, data);
    await getRandomClue(user, data, clue);
  }

  const linkUserRoom = async (user: UserModel | null, room: RoomModel) => {
    if (!room || !user) {
      console.log("Erro ao conectar usuário à sala");
      return;
    }

    const response = await fetch(`${API_URL}/rooms/${room.id}/users/${user.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.status != 200) {
      console.log("Erro ao conectar usuário à sala", response.status);
      return;
    }
  }

  const getRandomClue = async (user: UserModel | null, room: RoomModel | null, clue: ClueModel | null) => {
    if (!room || !user || clue) {
      return;
    }

    const response = await fetch(`${API_URL}/rooms/${room.id}/randomclue`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "user_id": user.id.toString(),
      },
    })

    if (response.status != 200) {
      console.log("Erro ao buscar dica");
      return;
    }

    const data = await response.json();
    console.log(data);

    setClue(data);

    localStorage.setItem("clue", JSON.stringify(data));

    setQuestionOrClueLocal('clue');

    console.log('clue', clue);
  }

  const submitQuestionCode = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (questionCode !== clue?.question_code) {
      alert("Código incorreto!")
      setQuestionCode("")
      return 
    }

    const response = await fetch(`${API_URL}/questions/${questionCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.status != 200) {
      console.log("Erro ao buscar questão");
      return;
    }

    const data = await response.json();
    console.log(data);

    setQuestion(data);
    localStorage.setItem("question", JSON.stringify(data));

    setQuestionOrClueLocal('question');
    setClue(null);
    localStorage.removeItem("clue");

    setQuestionCode('');


    console.log(questionCode);
  }

  const submitQuestionResponse = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!room || !user || !question) {
      console.log("Erro ao responder questão");
      return;
    }

    const response = await fetch(`${API_URL}/rooms/${room.id}/questions/${question.id}/response`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user_id": user.id.toString(),
      },
      body: JSON.stringify({
        answer: questionAnswer,
      }),
    })

    if (response.status == 400) {
      alert("Resposta incorreta!")
      return
    }

    if (response.status != 200) {
      console.log("Erro ao responder questão", response.status);
      return;
    }

    setQuestionOrClueLocal('clue');
    setQuestion(null);
    localStorage.removeItem("question");


    await getRandomClue(user, room, clue);
    setQuestionAnswer('');

    console.log(questionAnswer);
  }

  let page;

  if (!user) {
    page = <User name={userName} setName={setUserName} submitUser={submitUser} />
  } else if (!room) {
    page = <Room room={roomCode} setRoom={setRoomCode} submitRoom={submitRoom} />
  } else if (room.status === "preparing") {
    page = <WaitRoom roomCode={roomCode} setRoom={setRoom} />
  } else if (room.status === "finished") {
    page = <EndedRoom />
  } else {
    if (questionOrClue === 'clue') {
      page = <Clue clue={clue} questionCode={questionCode} setQuestionCode={setQuestionCode} submitClue={submitQuestionCode}/>
    } else {
      page = <Question question={question} answer={questionAnswer} setAnswer={setQuestionAnswer} submitQuestionResponse={submitQuestionResponse} />
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
       {page}
      </main>
    </div>
  );
}
