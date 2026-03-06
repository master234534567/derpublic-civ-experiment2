import React from "react";

export default function Wiki() {
  return (
    <section>
      <header>
        <h1>Wiki 📚</h1>
        <p>Community documentation, guides, and quick references for players and staff.</p>
      </header>

      <article>
        <h2>Getting Started</h2>
        <ul>
          <li><strong>Join the server:</strong> How to connect and basic rules to follow.</li>
          <li><strong>Roles & Ranks:</strong> Overview of rank names, permissions, and how to progress.</li>
          <li><strong>Commands:</strong> Common chat/console commands and examples.</li>
        </ul>
      </article>

      <article>
        <h2>Guides</h2>
        <ol>
          <li><strong>Beginner guide:</strong> First day checklist and recommended settings.</li>
          <li><strong>Economy guide:</strong> How currency works, trading tips, and safe storage.</li>
          <li><strong>Building & PvP:</strong> Best practices and server-specific mechanics.</li>
        </ol>
      </article>

      <article>
        <h2>FAQ</h2>
        <dl>
          <dt>How do I appeal a ban?</dt>
          <dd>Use the Rank Applications page or contact staff with evidence.</dd>
          <dt>Where are events posted?</dt>
          <dd>Events are announced in #announcements and on the Events page (link).</dd>
        </dl>
      </article>
    </section>
  );
}
