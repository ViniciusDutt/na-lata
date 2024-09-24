import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

const Lata = (props: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Image
        src={`/${props.id}.svg`}
        alt={props.id}
        width={props.width}
        height={1}
        className="select-none"
      ></Image>
    </div>
  );
};

export default Lata;
