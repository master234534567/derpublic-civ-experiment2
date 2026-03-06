import React from "react";

const games = [
  { id: "trivia", name: "Trivia", description: "Quick question rounds with points." },
  { id: "parkour", name: "Parkour Challenge", description: "Timed obstacle runs." },
  { id: "duel", name: "Duel Arena", description: "1v1 matches with ranking." },
];

export default function ExtraMiniGames() {
  return (
    <section>
      <header>
        <h1>Extra mini games 🎮</h1>
        <p>Small, repeatable activities for players to enjoy between sessions.</p>
      </header>

      <article>
        <h2>Available Games</h2>
        <ul>
          {games.map(g => (
            <li key={g.id}>
              <strong>{g.name}:</strong> {g.description}
            </li>
          ))}
        </ul>
      </article>

      <article>
        <h2>How to Join</h2>
        <ol>
          <li>Type the join command in chat (example: <code>/join trivia</code>).</li>
          <li>Wait in the lobby until the round starts.</li>
          <li>Winners receive small rewards or leaderboard points.</li>
        </ol>
      </article>

      <article>
        <h2>Submit a Mini Game</h2>
        <p>Want to add a game? Use the Feature Request form with rules and mechanics.</p>
      </article>
    </section>
  );
}
