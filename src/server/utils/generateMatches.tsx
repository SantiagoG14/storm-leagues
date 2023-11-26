type Identifier = "id" | "name";
type Team = Record<Identifier, string>;
type Matches = [Team, Team][];
const generatePossibleMatches = (
  teams: { id: string; name: string }[],
  soFar: Team[] = [],
): Matches => {
  let matches: Matches = [];
  if (soFar.length === 2) {
    return [soFar as [Team, Team]]; // Convert soFar to [Team, Team]
  }
  for (const team of teams) {
    if (soFar.find((e) => e.name === team.name)) continue;
    matches = matches.concat(generatePossibleMatches(teams, [...soFar, team]));
  }
  return matches;
};

export const generateMatches = (
  teams: { id: string; name: string }[],
  rounds: number,
) => {
  const matches = generatePossibleMatches(teams);
  //   console.log(matches, matches.length);
  return generateMatchesWithRounds(matches, rounds);
};

const generateMatchesWithRounds = (matches: Matches, rounds: number) => {
  const firstLeg = matches.slice(0, matches.length / 2);
  const secondLeg = matches.slice(matches.length / 2, matches.length);
  const allMatches = [];
  for (let i = 0; i < rounds; i++) {
    const temp = i % 2 === 0 ? firstLeg : secondLeg;

    allMatches.push(
      ...temp.map((match) => ({
        homeTeam: match[0],
        awayTeam: match[1],
        matchDay: i + 1,
      })),
    );
  }
  return allMatches;
};
