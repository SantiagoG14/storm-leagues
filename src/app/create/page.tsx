import { api } from "~/trpc/server";
import { Teams } from "../_components/players";
import { z } from "zod";
import { redirect } from "next/navigation";

export const createLeagueSchema = z.object({
  name: z.string(),
  rounds: z.string(),
  teams: z.array(z.object({ id: z.string(), name: z.string() })),
});

export default function Create() {
  async function create(formData: FormData) {
    "use server";

    const teams = [];
    for (const key of formData.keys()) {
      if (key.startsWith("teams-"))
        teams.push({ id: key, name: formData.get(key) });
    }

    const data = createLeagueSchema.safeParse({
      name: formData.get("name"),
      rounds: formData.get("rounds"),
      teams,
    });

    if (!data.success) {
      throw new Error("Invalid form data");
    }

    await api.league.create.mutate(data.data);
    redirect("/");
  }
  return (
    <section className="p-6">
      <form action={create} className="flex flex-col">
        <label htmlFor="name">League Name</label>
        <input
          placeholder="My League"
          type="text"
          id="name"
          required
          name="name"
          className="border"
        />
        <label htmlFor="rounds">Rounds</label>
        <input
          placeholder="3"
          type="number"
          required
          id="rounds"
          name="rounds"
          className="border"
        />
        <h1>Teams</h1>
        <Teams />
        <button>Create League</button>
      </form>
    </section>
  );
}
