const Instructions = ({
  isOpen,
  setIsOpen,
  setGameMode,
  gameMode,
  handleStart,
}: any) => {
  return (
    <div
      className={
        (isOpen ? "flex" : "hidden") +
        ` absolute top-0 left-0 w-screen h-screen items-center justify-center bg-black/50`
      }
    >
      <div className="w-full max-w-[512px] gap-6 flex flex-col relative mx-2 bg-background-200 px-6 py-6 rounded-xl">
        <h1 className="text-2xl font-bold">Como jogar</h1>
        <p className="text-base">
          Organize as latas nos containers até que todas estejam em suas
          posições corretas.
          <br />
          <br />
          <b className="text-primary uppercase">Lembre-se:</b> se for utilizar
          dicas, certifique-se de ter pelo menos 1 lata na posição correta.
        </p>
        <h1 className="text-2xl font-bold">Escolha o modo de jogo:</h1>
        <div className="w-full flex items-center justify-around">
          <button
            onClick={() => setGameMode(true)}
            className={`flex flex-col items-center w-[152px] bg-white/10 p-4 rounded-xl ${
              gameMode ? "border-2 border-solid border-white" : ""
            }`}
          >
            <i className="ri-timer-flash-line ri-3x"></i>
            <p className="text-xl font-bold">Contra o tempo</p>
          </button>
          <button
            onClick={() => setGameMode(false)}
            className={`flex flex-col items-center w-[152px] bg-white/10 p-4 rounded-xl ${
              gameMode ? "" : "border-2 border-solid border-white"
            }`}
          >
            <i className="ri-heart-line ri-3x"></i>
            <p className="text-xl font-bold">Modo clássico</p>
          </button>
        </div>
        <p className="text-base">
          {gameMode
            ? "Ao iniciar, você terá um total de 60 segundos para encontrar as posições das latas."
            : 'Após cada tentativa, pressione o botão "Testar" para verificar seu progresso. Você terá 15 jogadas para finalizar o jogo.'}
        </p>
        <button
          onClick={handleStart}
          className="flex items-center justify-center py-2 bg-primary font-bold shadow-[0_4px_0_0_rgba(236,167,44,_0.35)] rounded-xl text-2xl"
        >
          Começar
        </button>
      </div>
    </div>
  );
};

export default Instructions;
