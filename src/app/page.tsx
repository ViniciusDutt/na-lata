"use client";

import { AdBanner, Lata, Instructions, WinModal } from "@/components/index";
import { useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arraySwap,
  rectSwappingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import dayjs from "dayjs";

export default function Home() {
  const data = new Date();

  const today = `${data.getDate()}/${
    data.getMonth() + 1
  }/${data.getFullYear()}`;
  // const [mode, setMode] = useState(false);
  const [latas, setLatas] = useState([
    "lata1",
    "lata2",
    "lata3",
    "lata4",
    "lata5",
    "lata6",
    "lata7",
    "lata8",
  ]);

  const defaultSort = [
    "lata1",
    "lata2",
    "lata3",
    "lata4",
    "lata5",
    "lata6",
    "lata7",
    "lata8",
  ];
  const [lastPlay, setLastPlay] = useState([""]);
  const [playCount, setPlayCount] = useState(0);
  const [tipCount, setTipCount] = useState(0);
  // const [easy, setEasy] = useState(false);
  const [correctPositions, setCorrectPositions] = useState(0);
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const [isOpen, setIsOpen] = useState(true);
  const [playerWin, setPlayerWin] = useState(false);
  // const [playerWinSave, setPlayerWinSave] = useState(() => {
  //   if (typeof window !== "undefined") {
  //     const playerWinSave = localStorage.getItem("playerWin");
  //     return playerWinSave ? JSON.parse(playerWinSave) : false;
  //   }
  // });
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("playerWin", JSON.stringify(playerWin));
    }
  }, [playerWin]);

  function shuffleArray(array: string[], seed: number): string[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const randomIndex = (seed + i) % (i + 1);
      [shuffled[i], shuffled[randomIndex]] = [
        shuffled[randomIndex],
        shuffled[i],
      ];
    }
    return shuffled;
  }

  function generateDailyChallenge(): string[] {
    const today = dayjs().format("YYYYMMDD");
    const seed = parseInt(today, 10);

    const challenge = shuffleArray(defaultSort, seed);

    return challenge;
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setLatas((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);

        return arraySwap(items, activeIndex, overIndex);
      });
    }
  };

  const TipBtn = (e: any) => {
    e.preventDefault();
    setTipCount(tipCount + 1);
    // setEasy(true);
  };

  const historyAnim = () => {
    const history = document.getElementById("history");
    history!.classList.add("animate");
    setTimeout(() => {
      history!.classList.remove("animate");
    }, 500);
  };

  function compareArrays(
    arr1: any[],
    arr2: any[]
  ): { index: number; correct: boolean }[] {
    let correctCount = 0;
    const results: { index: number; correct: boolean }[] = [];

    const length = Math.min(arr1.length, arr2.length);

    for (let i = 0; i < length; i++) {
      const isCorrect = arr1[i] === arr2[i];
      results.push({ index: i, correct: isCorrect });

      if (isCorrect) {
        correctCount++;
      }
    }

    setCorrectPositions(correctCount);

    return results;
  }

  useEffect(() => {
    if (correctPositions === 8) {
      setPlayerWin(true);
      document.body.classList.add("overflow-y-hidden");
      window.scrollTo(0, 0);
    }
  }, [correctPositions]);

  const TestBtn = (e: any) => {
    e.preventDefault();
    setPlayCount(playCount + 1);
    setLastPlay(latas);
    compareArrays(latas, generateDailyChallenge());
    historyAnim();
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 px-2 w-full max-w-[512px]">
      <Instructions isOpen={isOpen} setIsOpen={setIsOpen} />
      <WinModal isOpen={playerWin} playCount={playCount} tipCount={tipCount} />
      <div className="w-full flex justify-center absolute top-0">
        <p>Jogo em versão de testes</p>
      </div>
      <section className="w-full flex flex-col gap-24">
        <div>
          {/* <div
            className={
              (mode ? "h-14 mb-6" : "h-0 mb-0") +
              ` flex items-center transition-all rounded-lg bg-background-200 overflow-hidden`
            }
          >
            <button className="text-white font-bold h-full px-6">Tetra</button>
            <button className="text-white font-bold h-full px-6">Hexa</button>
            <button className="text-white font-bold h-full px-6">Octa</button>
          </div> */}
          <nav className="w-full grid grid-cols-3 justify-between items-center">
            <div className="self-center flex gap-4">
              {/* <button
                className="flex items-center"
                onClick={() => {
                  setMode(!mode);
                }}
              >
                <i
                  className={
                    (mode ? "rotate-180" : "") +
                    ` ri-arrow-down-s-line ri-xl text-white transition-all`
                  }
                ></i>
              </button> */}
            </div>
            <p className="text-white font-bold text-xl flex justify-center items-center">
              NA LATA
            </p>
            <div className="flex justify-end items-center gap-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center"
              >
                <i className="ri-question-line ri-xl text-white"></i>
              </button>
            </div>
          </nav>
        </div>

        <main className="flex flex-col w-full gap-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div
              id="history"
              className="grid grid-cols-4 gap-2 w-full justify-center items-center"
            >
              {playCount > 0 &&
                lastPlay.map((lata) => (
                  <div
                    key={lata}
                    className="w-full h-[48px] bg-background-200 flex justify-center items-center rounded-md shadow-[0_2px_0_0_rgba(68,53,91,_0.35)]"
                  >
                    <Lata id={lata} width={16} />
                  </div>
                ))}
            </div>
            <div className="flex h-full w-full justify-between">
              <div className="flex flex-col items-center justify-between h-full">
                <p className="text-center">POSIÇÕES CERTAS:</p>
                <p className="font-bold text-[#2DED7E] text-[64px] leading-10 pb-2 text-center">
                  {correctPositions}
                </p>
              </div>
              <div className="flex flex-col items-end justify-between h-full">
                <button
                  onClick={TipBtn}
                  className="py-1 px-2 bg-background-200 flex gap-1 items-center rounded-md shadow-[0_4px_0_0_rgba(68,53,91,_0.35)] mb-2"
                >
                  <i className="ri-lightbulb-line"></i>
                  <p className="font-bold">Dica</p>
                </button>
                <div className="flex flex-col items-end">
                  <p className="font-bold">{today}</p>
                  <p>
                    TENTATIVAS: <b>{playCount}</b>
                  </p>
                  <p>
                    DICAS: <b>{tipCount}</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 justify-center items-center">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={latas} strategy={rectSwappingStrategy}>
                {latas.map((lata) => (
                  <div
                    key={lata}
                    className="w-full h-[96px] bg-background-200 flex justify-center items-center rounded-xl shadow-[0_4px_0_0_rgba(68,53,91,_0.35)]"
                  >
                    <Lata id={lata} width={32} />
                  </div>
                ))}
              </SortableContext>
            </DndContext>
          </div>
          <button
            onClick={TestBtn}
            className="flex items-center justify-center py-2 bg-primary font-bold shadow-[0_4px_0_0_rgba(236,167,44,_0.35)] rounded-xl text-2xl"
          >
            Testar
          </button>
        </main>
      </section>

      <div className="w-full h-[60px]">
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot="7346383496"
        />
      </div>
    </div>
  );
}
