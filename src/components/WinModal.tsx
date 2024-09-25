const WinModal = ({ isOpen, tipCount, playCount }: any) => {
  return (
    <div
      className={
        (isOpen ? "flex" : "hidden") +
        ` absolute top-0 left-0 w-screen h-screen items-center justify-center bg-black/50`
      }
    >
      <div className="w-full max-w-[512px] gap-6 flex flex-col relative mx-2 bg-background-200 px-6 py-6 rounded-xl">
        <h1 className="text-2xl font-bold">Parabéns!</h1>
        {tipCount === 0 ? (
          <p className="text-base">Você acertou em {playCount} tentativa(s).</p>
        ) : (
          <p className="text-base">
            Você acertou em {playCount} tentativa(s) usando {tipCount} dica(s).
          </p>
        )}
      </div>
    </div>
  );
};

export default WinModal;
