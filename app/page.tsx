import React from "react";
import Container from "./components/container/page";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col p-5">
      <header className="p-2">
        <p className="font-mono font-bold text-2xl mb-1">Chatbot</p>
      </header>
      <main className="flex-1 overflow-y-auto">
        <Container />
      </main>
    </div>
  );
}
