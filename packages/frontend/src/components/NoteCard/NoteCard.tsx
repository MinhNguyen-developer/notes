import React, { useState } from "react";
import { Note } from "../../types.ts";
import TrashIcon from "../../icons/TrashIcon.tsx";

interface NoteCardProps {
  note: Note;
}

export function NoteCard(props: NoteCardProps) {
  const { note } = props;
  const [isMouseOver, setIsMouseOver] = useState(false);

  return (
    <div
      className=" relative cursor-grab bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500"
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      {note.content}
      {isMouseOver && (
        <button className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded">
          <TrashIcon />
        </button>
      )}
    </div>
  );
}
