const Modal = ({ isOpen, title, body, Button, onClick }: any) => {
  return (
    <div
      className={
        (isOpen ? "flex" : "hidden") +
        ` absolute top-0 left-0 w-screen h-screen items-center justify-center bg-black/50`
      }
    >
      <div className="w-full max-w-[512px] gap-6 flex flex-col relative mx-2 bg-background-200 px-6 py-6 rounded-xl">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-base">{body}</p>
        {Button && (
          <button
            onClick={onClick}
            className="flex items-center justify-center py-2 bg-primary font-bold shadow-[0_4px_0_0_rgba(236,167,44,_0.35)] rounded-xl text-2xl"
          >
            {Button}
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
