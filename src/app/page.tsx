"use client";

import { Instructions, Modal, Lata, AdBanner } from "@/components";
import { useLogic } from "@/hooks/useLogic";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { rectSwappingStrategy, SortableContext } from "@dnd-kit/sortable";
import "remixicon/fonts/remixicon.css";

export default function Home() {
  const {
    isOpen,
    setIsOpen,
    setGameMode,
    gameMode,
    setGameStart,
    playerWin,
    tipCount,
    timer,
    playCount,
    Reset,
    playerLose,
    mode,
    setMode,
    lastPlay,
    correctPositions,
    TipBtn,
    today,
    sensors,
    handleDragEnd,
    latas,
    TestBtn,
    id,
  } = useLogic();

  return (
    <div className="flex flex-col items-center justify-center py-6 px-2 w-full max-w-[512px]">
      <Instructions
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setGameMode={setGameMode}
        gameMode={gameMode}
        handleStart={() => setGameStart(true)}
      />
      <Modal
        isOpen={playerWin}
        title={"Parabéns!"}
        body={
          tipCount > 0
            ? `Você completou o jogo em ${
                60 - timer
              } segundo(s) com ${playCount} jogada(s) usando ${tipCount} dicas.`
            : `Você completou o jogo em ${
                60 - timer
              } segundo(s) com ${playCount} jogada(s).`
        }
        Button="Novo jogo"
        onClick={() => {
          Reset();
          setIsOpen(true);
        }}
      />
      <Modal
        isOpen={playerLose}
        title={"Você perdeu!"}
        body={`Tenta de novo, dessa vez você consegue!`}
        Button="Tentar de novo"
        onClick={() => {
          Reset();
          setGameStart(true);
        }}
      />
      <div className="w-full flex justify-center absolute top-0">
        <p>Jogo em versão de testes</p>
      </div>
      <section className="w-full flex flex-col gap-24">
        <div>
          <div
            className={
              (mode ? "h-14 mb-6" : "h-0 mb-0") +
              ` flex items-center justify-around transition-all rounded-lg bg-background-200 overflow-hidden`
            }
          >
            <button
              onClick={() => {
                setGameMode(true);
                setTimeout(() => setGameStart(true), 10);
                Reset();
              }}
              className={`${
                gameMode ? "bg-primary" : ""
              } flex items-center gap-2 text-white font-bold py-2 px-6 rounded-lg`}
            >
              <i className="ri-timer-flash-line ri-xl"></i>
              Contra o tempo
            </button>
            <button
              onClick={() => {
                setGameMode(false);
                setTimeout(() => setGameStart(true), 10);
                Reset();
              }}
              className={`${
                !gameMode ? "bg-primary" : ""
              } flex items-center gap-2 text-white font-bold py-2 px-6 rounded-lg`}
            >
              <i className="ri-heart-line ri-xl"></i>
              Modo Clássico
            </button>
          </div>
          <nav className="w-full grid grid-cols-3 justify-between items-center">
            <div className="self-center flex gap-4">
              <button
                className="flex items-center"
                aria-label="Mostrar/Esconder modos de jogo"
                aria-expanded={mode}
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
              </button>
            </div>
            <p className="text-white font-bold text-xl flex justify-center items-center">
              NA LATA
            </p>
            <div className="flex justify-end items-center gap-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center"
                aria-label="Mostrar/Esconder instruções"
                aria-expanded={isOpen}
              >
                <i className="ri-menu-3-line ri-xl text-white"></i>
              </button>
            </div>
          </nav>
        </div>

        <main className="flex flex-col w-full gap-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {!gameMode && (
              <div
                id="history"
                className="grid grid-cols-4 gap-2 w-full justify-center items-center"
              >
                {playCount < 15 &&
                  lastPlay.map((lata) => (
                    <div
                      key={lata}
                      className="w-full h-[48px] bg-background-200 flex justify-center items-center rounded-md shadow-[0_2px_0_0_rgba(68,53,91,_0.35)]"
                    >
                      <Lata id={lata} width={16} />
                    </div>
                  ))}
              </div>
            )}
            <div
              className={`${
                gameMode
                  ? "grid grid-cols-3"
                  : "flex items-center justify-between"
              } h-full w-full`}
            >
              <div className="flex flex-col items-center justify-between h-full">
                <p className="text-center">POSIÇÕES CERTAS:</p>
                <p className="font-bold text-[#2DED7E] text-[64px] leading-10 pb-2 text-center">
                  {correctPositions}
                </p>
              </div>
              {gameMode && (
                <div className="flex items-end justify-center">
                  <p className="text-3xl font-bold py-2 w-24 flex items-center justify-center rounded-xl bg-black/30">
                    00:{timer < 10 ? "0" : ""}
                    {timer}
                  </p>
                </div>
              )}
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
                  {gameMode ? (
                    <p>
                      JOGADAS: <b>{playCount}</b>
                    </p>
                  ) : (
                    <p>
                      TENTATIVAS: <b>{playCount}</b>
                    </p>
                  )}
                  <p>
                    DICAS: <b>{tipCount}</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 justify-center items-center">
            <DndContext
              id={id}
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
          {!playerWin && !gameMode && (
            <button
              onClick={TestBtn}
              className="flex items-center justify-center py-2 bg-primary font-bold shadow-[0_4px_0_0_rgba(236,167,44,_0.35)] rounded-xl text-2xl"
            >
              Testar
            </button>
          )}
        </main>
      </section>

      <div className="w-full">
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot="7346383496"
        />
      </div>
    </div>
  );
}
