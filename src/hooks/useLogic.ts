"use client";

import { useEffect, useId, useState } from "react";
import "remixicon/fonts/remixicon.css";
import { MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arraySwap } from "@dnd-kit/sortable";
import dayjs from "dayjs";

export function useLogic() {
  const [date, setDate] = useState<any>(null);

  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    setDate(new Date());
    setToday(
      `${date?.getDate()}/${date?.getMonth() + 1}/${date?.getFullYear()}`
    );
  }, [date]);

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
  const [gameMode, setGameMode] = useState(true);
  const [lastPlay, setLastPlay] = useState([""]);
  const [playCount, setPlayCount] = useState(15);
  const [tipCount, setTipCount] = useState(0);
  const [mode, setMode] = useState(false);
  const [correctPositions, setCorrectPositions] = useState(0);
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const [isOpen, setIsOpen] = useState(true);
  const [playerWin, setPlayerWin] = useState(false);
  const [playerLose, setPlayerLose] = useState(false);
  const sensors = useSensors(mouseSensor, touchSensor);
  const [timer, setTimer] = useState(60);
  const [gameStart, setGameStart] = useState(false);
  const id = useId();

  useEffect(() => {
    Reset();
  }, [gameMode]);

  useEffect(() => {
    if (gameStart) {
      setIsOpen(false);
    }
  }, [gameStart]);

  useEffect(() => {
    if (gameMode) {
      if (gameStart) {
        CompareArrays(latas, generateDailyChallenge());
        setPlayCount(playCount + 1);
      }
    }
  }, [latas]);

  useEffect(() => {
    if (gameMode && gameStart) {
      if (timer > 0) {
        const TimerInt = setInterval(() => {
          setTimer((prevTime) => prevTime - 1);
        }, 1000);
        return () => clearInterval(TimerInt);
      }
      if (timer === 0) setPlayerLose(true);
    }
  }, [timer > 0, gameMode, gameStart]);

  useEffect(() => {
    if (gameStart && !gameMode && playCount === 0) {
      setPlayerLose(true);
    }
  }, [playCount]);

  useEffect(() => {
    if (correctPositions === 8) {
      setPlayerWin(true);
      setGameStart(false);
      document.body.classList.add("overflow-hidden");
      window.scrollTo(0, 0);
    }
  }, [correctPositions]);

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

  const CompareArrays = (
    arr1: any[],
    arr2: any[]
  ): { index: number; correct: boolean }[] => {
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
  };

  const TestBtn = (e: any) => {
    e.preventDefault();
    setPlayCount(playCount - 1);
    setLastPlay(latas);
    CompareArrays(latas, generateDailyChallenge());
    if (!gameMode) historyAnim();
    if (playCount === 0) setPlayerLose(true);
  };

  const Reset = () => {
    setPlayerWin(false);
    setTipCount(0);
    setLatas(defaultSort);
    setMode(false);
    setPlayerLose(false);
    setGameStart(false);

    if (gameMode) {
      setPlayCount(0);
      setTimer(60);
    }

    if (!gameMode) {
      setPlayCount(15);
      setCorrectPositions(0);
    }
  };

  return {
    setIsOpen,
    setGameMode,
    setGameStart,
    Reset,
    setMode,
    TipBtn,
    handleDragEnd,
    TestBtn,
    id,
    isOpen,
    gameMode,
    playerWin,
    tipCount,
    timer,
    playCount,
    playerLose,
    mode,
    lastPlay,
    correctPositions,
    today,
    sensors,
    latas,
  };
}
