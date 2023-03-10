/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { globalStateAtom } from "~/state/globalState";

const toastList = [
  "Oh, wow! Look at you.",
  "WOW! That IS noteworthy! :o",
  "Congratulations, you just saved a tree!",
  "You did it! Now go get some ice cream.",
  "Do a happy dance!",
  "Yippi ka-ye maddafaka!",
  "Nicely done!",
  "Let's do a victory lap!",
  "You're on fire! Keep hitting that keyboard!",
  "Great job! You're making progress.",
  "Boom!",
  "Get a job!",
  "I would hire you!",
  "Touch type extravaganza!",
  "Never seen anyone type like you!",
  "Congratulations! You're one step closer to world domination.",
  "A note-taking rockstar? I see!",
  "Noted! Keep up the awesome work!",
  "You're a note-taking machine! Keep it up.",
  "Amazing! Thats a note of perfection.",
  "We'll take note of that!",
  "You're one of a TYPE(-ist)",
];

type toastStyle = {
  [key: string]: string;
};

const toastStyles: toastStyle = {
  title: "info",
  body: "success",
};

const getToastStyle = (type: string): string => {
  return toastStyles[type] || "info";
};

const selectRandomToast = (): string => {
  const randomIndex = Math.floor(Math.random() * toastList.length);
  return toastList[randomIndex] || "You did it!";
};

let previousTitleLength = 0;
let previousBodyLength = 0;
export const NoteEditor = ({
  onSave,
}: {
  onSave: (note: { title: string; content: string }) => void;
}) => {
  const [globalState, setGlobalState] = useAtom(globalStateAtom);
  const [code, setCode] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [titleLength, setTitleLength] = useState<number>(0);
  const [bodyLength, setBodyLength] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<string>("");

  const TITLE_MIN_LENGTH = 25;
  const BODY_MIN_LENGTH = 35;

  const hideToastAfterDelay = (delay = 5000): void => {
    setTimeout(() => {
      setToastType("");
      setGlobalState(globalState + 1);
    }, delay);
  };

  // TODO: Generalize both these useEffects into one
  // Lots of duplication here
  useEffect(() => {
    const titleToastActive = toastType === "title";
    const lengthIncreasing = titleLength > previousTitleLength;
    const isMultipleOfMinLength = titleLength % TITLE_MIN_LENGTH === 0;
    if (lengthIncreasing && isMultipleOfMinLength && !titleToastActive) {
      setToastMessage(selectRandomToast());
      setToastType("title");
      hideToastAfterDelay();
    }
    previousTitleLength = titleLength;
  }, [titleLength]);

  useEffect(() => {
    const bodyToastActive = toastType === "body";
    const isMultipleOfMinLength = bodyLength % BODY_MIN_LENGTH === 0;
    const lengthIncreasing = bodyLength > previousBodyLength;
    if (lengthIncreasing && isMultipleOfMinLength && !bodyToastActive) {
      setToastMessage(selectRandomToast());
      setToastType("body");
      hideToastAfterDelay();
    }
    previousBodyLength = bodyLength;
  }, [bodyLength]);

  return (
    <div className="card bg-base-100 shadow-xl">
      {toastType && (
        <div className={`toast z-10`}>
          <div className={`alert alert-${getToastStyle(toastType)}`}>
            <div>
              <span>{toastMessage}</span>
            </div>
          </div>
        </div>
      )}

      <div className="card-body">
        <progress
          className="progress progress-primary w-full"
          value={titleLength}
          max={TITLE_MIN_LENGTH}
        />
        <progress
          className="progress progress-success mb-4 w-full"
          value={bodyLength}
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
              setTitleLength(e.currentTarget.value.length);
            }}
          />
          <textarea
            placeholder="Body"
            className="textarea-bordered textarea h-36 text-lg font-bold"
            value={code}
            onChange={(e) => {
              setCode(e.currentTarget.value);
              setBodyLength(e.currentTarget.value.length);
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
