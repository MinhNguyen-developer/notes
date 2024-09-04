import React, { useState } from "react";
import { Column, Id, Note } from "../../types.ts";
import TrashIcon from "../../icons/TrashIcon.tsx";
import useSortableContext from "../../hooks/useSortableContext.ts";
import PlusIcon from "../../icons/PlusIcon.tsx";
import { NoteCard } from "../NoteCard";

interface ColumnContainerProps {
  column: Column;
  onDeleteColumn(id: Id): void;
  onUpdateColumn(id: Id, title: string): void;
  onCreateNote(id: Id): void;
  notes: Note[];
}

const ColumnContainer: React.FC<ColumnContainerProps> = (props) => {
  const { column, onDeleteColumn, onUpdateColumn, onCreateNote, notes } = props;

  const [editMode, setEditMode] = useState(false);

  const { setNodeRef, attributes, listeners, style, isDragging } =
    useSortableContext({
      id: column.id,
      data: {
        type: "column",
        column,
      },
      disabled: editMode,
    });

  if (isDragging)
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-columnBackgroundColor opacity-60 border-2 border-rose-500 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
      />
    );

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(true)}
        className="bg-mainBackgroundColor text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-columnBackgroundColor border-4 flex items-center justify-between"
      >
        <div className="flex gap-2">
          <div className="flex justify-center items-center bg-columnBackgroundColor px-2 py-1 text-sm rounded-full">
            0
          </div>
          {!editMode ? (
            column.title
          ) : (
            <input
              className="bg-black focus:border-rose-500 border rounded outline-none px-2"
              value={column.title}
              onChange={(e) => onUpdateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <button
          onClick={() => onDeleteColumn(column.id)}
          className="stroke-gray-500 hover:stroke-white hover:bg-columnBackgroundColor rounded px-1 py-2"
        >
          <TrashIcon />
        </button>
      </div>
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>

      <button
        // TODO: Update logic to create task
        onClick={() => onCreateNote(column.id)}
        className="flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
      >
        <PlusIcon />
        Add Task
      </button>
    </div>
  );
};

export default ColumnContainer;
