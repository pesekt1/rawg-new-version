export default `
Summarize the following customer reviews in Markdown.

Format exactly like this (use blank lines between sections):

**Customer Reviews Summary**
Summarize the following customer reviews into a short paragraph.

**Pros:**
- ...

**Cons:**
- ...

**Final Verdict:**
Provide a very brief final verdict based on the reviews.

Rules:
- Use bullet points for Pros/Cons.
- Keep it concise (max ~6 bullets per section).
- Do not use tables.
- Do not invent details; only use what appears in the reviews.

{{reviews}}`;
