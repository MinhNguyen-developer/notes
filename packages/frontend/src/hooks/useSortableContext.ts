import { Arguments } from "@dnd-kit/sortable/dist/hooks/useSortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function useSortableContext({ id, data, ...rest }: Arguments) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transition,
    transform,
    ...context
  } = useSortable({
    id,
    data,
    ...rest,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return {
    style,
    setNodeRef,
    attributes,
    listeners,
    ...context,
  };
}
