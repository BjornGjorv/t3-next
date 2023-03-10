import { useEffect, useState } from "react";

export const NoteEditor = ({
  onSave,
}: {
  onSave: (note: { title: string; content: string }) => void;
}) => {
  const [code, setCode] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [titleProgress, setTitleProgress] = useState<number>(0);
  const [bodyProgress, setBodyProgress] = useState<number>(0);
  const [titleToast, setTitleToast] = useState<boolean>(false);
  const [bodyToast, setBodyToast] = useState<boolean>(false);

  const TITLE_MIN_LENGTH = 30;
  const BODY_MIN_LENGTH = 40;

  useEffect(() => {
    if (titleProgress === TITLE_MIN_LENGTH) {
      setTitleToast(true);
      setTimeout(() => {
        setTitleToast(false);
      }, 5000);
    }
  }, [titleProgress]);

  useEffect(() => {
    if (bodyProgress === BODY_MIN_LENGTH) {
      setBodyToast(true);
      setTimeout(() => {
        setBodyToast(false);
      }, 6000);
    }
  }, [bodyProgress]);

  return (
    <div className="card bg-base-100 shadow-xl">
      {titleToast && (
        <div className="toast">
          <div className="alert alert-success">
            <div>
              <span>Oh, wow! Look at you.</span>
            </div>
          </div>
        </div>
      )}
      {bodyToast && (
        <div className="toast">
          <div className="alert alert-info">
            <div>
              <span>Damn! A double wopper!</span>
            </div>
          </div>
        </div>
      )}

      <div className="card-body">
        <progress
          className="progress progress-primary w-full"
          value={titleProgress}
          max={TITLE_MIN_LENGTH}
        />
        <progress
          className="progress progress-success mb-4 w-full"
          value={bodyProgress}
          max={BODY_MIN_LENGTH}
        />
        <div className="flex w-full flex-col gap-5">
          <input
            type="text"
            placeholder="Title"
            className="input-bordered input input-lg w-full font-bold"
            value={title}
            onChange={(e) => {
              setTitle(e.currentTarget.value);
              setTitleProgress(e.currentTarget.value.length);
            }}
          />
          <textarea
            placeholder="Body"
            className="textarea-bordered textarea h-36 text-lg font-bold"
            value={code}
            onChange={(e) => {
              setCode(e.currentTarget.value);
              setBodyProgress(e.currentTarget.value.length);
            }}
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
