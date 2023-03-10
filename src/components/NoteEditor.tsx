import { useState } from "react";

export const NoteEditor = ({
  onSave,
}: {
  onSave: (note: { title: string; content: string }) => void;
}) => {
  const [code, setCode] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex w-full flex-col gap-5">
          <input
            type="text"
            placeholder="Title"
            className="input-bordered input input-lg w-full font-bold"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <textarea
            placeholder="Body"
            className="textarea-bordered textarea h-36 text-lg font-bold"
            value={code}
            onChange={(e) => setCode(e.currentTarget.value)}
          />
          <button
            onClick={() => {
              onSave({
                title,
                content: code,
              });
              setCode("");
              setTitle("");
            }}
            className="btn-primary btn"
            disabled={title.trim().length === 0 || code.trim().length === 0}
          >
            Save
          </button>
        </div>

        <div className="card-actions justify-end"></div>
      </div>
    </div>
  );
};
