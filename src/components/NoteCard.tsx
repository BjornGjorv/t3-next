import { useState } from "react";

// import ReactMarkdown from "react-markdown";

import { type RouterOutputs } from "../utils/api";

type Note = RouterOutputs["note"]["getAll"][0];

export const NoteCard = ({
  note,
  onDelete,
}: {
  note: Note;
  onDelete: () => void;
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <div className="card mt-5 bg-base-100 shadow-xl">
      <div className="card-body m-0 p-3">
        <div
          className={`collapse-arrow ${
            isExpanded ? "collapse-open" : ""
          } collapse`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="collapse-title text-xl font-bold">{note.title}</div>
          <div className="collapse-content">
            <article className="prose lg:prose-xl">
              {/* <ReactMarkdown>{note.content}</ReactMarkdown> */}
              <div>{note.content}</div>
            </article>
          </div>
        </div>
        <div className="card-actions mx-2 flex justify-end">
          <button
            className="btn-outline btn-xs btn mb-2 px-5"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
