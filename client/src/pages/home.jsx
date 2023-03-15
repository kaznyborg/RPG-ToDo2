import { useEffect, useMemo, useState } from "react";
import { useAtomValue } from "jotai";
import { classAtom } from "../state";
import { activities } from "../constants";

export default function Home() {
  const currentClass = useAtomValue(classAtom);
  const filteredActivities = useMemo(() => {
    if (!currentClass) return activities;
    return activities.filter(
      (a) => a.class.toLowerCase() === currentClass.toLowerCase()
    );
  }, [currentClass]);
  const [addCustom, setAddCustom] = useState(false);
  const [todos, setTodos] = useState([]);
  const [diff, setDiff] = useState();

  useEffect(() => console.log(todos), [todos]);

  return (
    <div className="p-10 relative">
      <h1 className="font-semibold text-3xl text-center">RPG TODO</h1>
      <div class="flex items-center justify-center mt-10">
        {addCustom ? (
          <>
            <h1>or Create your own:</h1>
            <div className="form-control w-full max-w-xs ml-3 mr-3">
              <label className="label">
                <span className="label-text">What is the task name?</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <h1>Difficulty:</h1>
            <select
              onChange={(e) => setDiff(e.target.value)}
              className="select select-ghost max-w-xs"
            >
              <option value="easy">Easy(1pt)</option>
              <option value="medium">Medium(2pts)</option>
              <option value="hard">Hard(3pts)</option>
            </select>
            <button class="border-2 border-transparent rounded-md p-1 bg-teal-200">
              Add
            </button>
          </>
        ) : (
          <>
            <h1>Please select what to do, {currentClass}</h1>
            <select
              onChange={(e) => setTodos([...todos, JSON.parse(e.target.value)])}
              className="select select-ghost w-full max-w-xs ml-3 mr-3"
            >
              <option disabled selected>
                Tasks
              </option>
              {filteredActivities.map((a) => {
                return <option value={JSON.stringify(a)}>{a.item}</option>;
              })}
            </select>
          </>
        )}
      </div>

      {/* this section shows actual todos */}
      {/* TODO - style this ! */}
      {todos.map((t) => {
        return <h1>{t.item}</h1>;
      })}
      {/* this section shows actual todos */}

      <button
        onClick={() => setAddCustom((c) => !c)}
        className="btn btn-circle btn-outline fixed bottom-4 right-4 shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 transition-transform duration-300 ${
            addCustom ? "rotate-0" : "rotate-45"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
