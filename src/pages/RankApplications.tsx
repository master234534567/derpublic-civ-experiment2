import React, { useState } from "react";

export default function RankApplications() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section>
      <header>
        <h1>Rank Applications</h1>
        <p>Apply for staff or rank promotions. Provide honest answers and evidence.</p>
      </header>

      {!submitted ? (
        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
          <label>
            In-game name
            <input name="ign" required />
          </label>

          <label>
            Desired rank
            <input name="rank" required />
          </label>

          <label>
            Why should you be promoted?
            <textarea name="reason" required />
          </label>

          <label>
            Relevant experience / previous staff roles
            <textarea name="experience" />
          </label>

          <label>
            Attach evidence (logs, screenshots)
            <input type="file" name="evidence" multiple />
          </label>

          <button type="submit">Submit Application</button>
        </form>
      ) : (
        <div>
          <h2>Application received</h2>
          <p>Thanks — staff will review your application and contact you.</p>
        </div>
      )}
    </section>
  );
}
