"use client";

import { useState } from "react";
import { v4 as uuid } from "uuid";

export function Teams() {
  const [teams, setTeams] = useState([uuid(), uuid(), uuid()]);
  return (
    <>
      {teams.map((team, i) => (
        <div key={team} className="flex flex-col">
          <div className="flex items-center gap-2">
            <label htmlFor={team}>Team {i + 1}</label>
            {i > 2 && (
              <button
                onClick={() =>
                  setTeams((prev) => prev.filter((t) => t !== team))
                }
                className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-600 p-1 text-slate-100"
              >
                -
              </button>
            )}
          </div>
          <input
            placeholder={`Team ${i + 1}`}
            type="text"
            required
            id={team}
            name={`teams-${team}`}
            className="border"
          />
        </div>
      ))}
      <input type="hidden" name="teams" value={teams} />
      <button
        type="button"
        onClick={() => setTeams((prev) => [...prev, uuid()])}
      >
        Add Team
      </button>
    </>
  );
}
