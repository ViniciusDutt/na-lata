import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Lata = (props: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <h1 className="bg-slate-600">{props.id}</h1>
    </div>
  );
};

export default Lata;
