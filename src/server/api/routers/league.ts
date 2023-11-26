import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { generateMatches } from "~/server/utils/generateMatches";
export const leagueRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        teams: z.array(z.object({ name: z.string(), id: z.string() })),
        rounds: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const matches = generateMatches(input.teams, parseInt(input.rounds));
      const league = await ctx.db.league.create({
        data: {
          name: input.name,
          rounds: parseInt(input.rounds),
          teams: {
            create: input.teams,
          },
          matches: {
            create: matches.map((match) => ({
              matchDay: match.matchDay,
              homeTeam: {
                connect: {
                  id: match.homeTeam.id,
                },
              },
              awayTeam: {
                connect: {
                  id: match.awayTeam.id,
                },
              },
            })),
          },
        },
      });

      return `successfully created league ${league.name}`;
    }),
});
