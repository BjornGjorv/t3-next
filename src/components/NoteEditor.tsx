import { useState } from "react";

export const NoteEditor = ({
  onSave,
}: {
  onSave: (note: { title: string; content: string }) => void;
}) => {
  const [code, setCode] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  return (
    <div className="card mt-5 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <input
            type="text"
            placeholder="Title"
            className="input-primary input input-lg w-full font-bold"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <input
            type="text"
            placeholder="Body"
            className="input-primary input input-lg w-full font-bold"
            value={code}
            onChange={(e) => setCode(e.currentTarget.value)}
          />
        </h2>
      </div>
      <div className="card-actions justify-end">
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
    </div>
  );
};
