import Container from "./components/container/page";
import img from "../public/img/limebot-icon.png";
import Rating from "./components/rating/page";
export default function Home() {
  return (
    <div className=" flex-col py-10 px-20 bg-slate-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <p className="font-mono font-bold text-4xl mb-1 mr-2">
            <span className=" text-lime-500 font-nunito font-extrabold">
              LIME
            </span>
            <span className="font-mono text-4xl">Bot</span>
          </p>
          <img src={`img/limebot-icon.png`} alt="limebot logo" />
        </div>
        <Rating />
      </div>
      <div className="">
        <Container />
      </div>
      {/* </main> */}
    </div>
  );
}
