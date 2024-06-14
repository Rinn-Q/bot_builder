import Container from "./components/container/page";

export default function Home() {
  return (
    <div className="h-full py-10 px-20">
      {/* <header className="p-2"> */}
      <p className="font-mono font-bold text-4xl mb-1">Chatbot</p>
      {/* </header> */}
      {/* <main className="h-full"> */}
      <Container />
      {/* </main> */}
    </div>
  );
}