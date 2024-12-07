import type { Metadata } from "next";
import { useEffect } from "react";
import {RoomModel} from "./page";
import "./globals.css";
import { H2 } from "./h2";

type WaitRoomProps = {
  roomCode: string;
  setRoom: (room: RoomModel) => void;
}

export const metadata: Metadata = {
  title: "Aguardar sala",
  description: "Inserir código da sala",
};


export const WaitRoom: React.FC<WaitRoomProps> = ({roomCode, setRoom}) => {

  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await fetch(`https://aytlrlp0fb.execute-api.us-east-1.amazonaws.com/prd/rooms/${roomCode}`, {
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

    if (data.status == "preparing") {
      return;
    }

    setRoom(data);

    localStorage.setItem("room", JSON.stringify(data));

    console.log(roomCode);
    }, 1000);
    return () => clearInterval(interval);
  }, [roomCode, setRoom]);

  return (
    <div className="flex gap-4 items-center flex-col sm:flex-col">
      <H2>Aguarde</H2>
      <p>A sala ainda não foi iniciada</p>
    </div>
  );
}
