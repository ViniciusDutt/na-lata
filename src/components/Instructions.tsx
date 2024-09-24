const Instructions = ({ isOpen, setIsOpen }: any) => {
  return (
    <div
      onClick={() => {
        setIsOpen(!isOpen);
      }}
      className={
        (isOpen ? "flex" : "hidden") +
        ` absolute top-0 left-0 w-screen h-screen items-center justify-center bg-black/50`
      }
    >
      <div className="w-full max-w-[512px] gap-6 flex flex-col relative mx-2 bg-background-200 px-6 py-6 rounded-xl">
        <i className="ri-close-line ri-xl absolute right-2 top-3 cursor-pointer"></i>
        <h1 className="text-2xl font-bold">Como jogar</h1>
        <p className="text-base">
          Organize as latas nos containers até que todas estejam em suas
          posições corretas.
          <br />
          <br />
          Após cada tentativa, pressione o botão "Testar" para verificar seu
          progresso.
          <br />
          <br />O jogo informará quantas latas estão na posição certa, mas sem
          revelar quais são. Continue ajustando as posições até acertar todas!
        </p>
      </div>
    </div>
  );
};

export default Instructions;
