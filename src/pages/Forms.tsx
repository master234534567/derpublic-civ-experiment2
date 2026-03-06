import React from "react";

export default function Forms() {
  return (
    <section>
      <header>
        <h1>Forms 📝</h1>
        <p>Submit requests, reports, and applications using the forms below.</p>
      </header>

      <article>
        <h2>Report a Player</h2>
        <p>Required: offender name, time, evidence (screenshots/video), short description.</p>

        <h2>Bug Report</h2>
        <p>Required: steps to reproduce, expected vs actual behavior, server/time, attachments.</p>

        <h2>Feature Request</h2>
        <p>Describe the feature, why it helps, and any implementation ideas.</p>
      </article>

      <article>
        <h2>Example Form (HTML snippet)</h2>
        <pre>
{`<form>
  <label>Type<select name="type"><option>Report</option><option>Bug</option></select></label>
  <label>Subject<input name="subject" /></label>
  <label>Description<textarea name="description" /></label>
  <label>Evidence<input type="file" /></label>
  <button type="submit">Submit</button>
</form>`}
        </pre>
      </article>
    </section>
  );
}
