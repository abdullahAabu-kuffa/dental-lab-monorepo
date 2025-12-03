import { getHFClient, MODEL_ID } from "./aiClient";
import type { KPIResponse } from "./analytics.service"; // Just update the import type name

export async function summarizeKpis(kpis: KPIResponse): Promise<string> {
  const client = getHFClient();

  const prompt = `You are a helpful dental lab analytics assistant.

You will receive JSON with KPIs about orders, invoices, operations steps, and clients for a dental lab.

Write:
- 1 short paragraph summarizing business performance (revenue, pending/overdue amounts, order volume, average order value).
- 1 short paragraph or bullet list about operations (which steps are slow or potential bottlenecks, using the step durations and stuck counts).
- 1 short paragraph about clients (which clinics are strongest by revenue and how active they are).
- If some sections have no data, say that briefly instead of making things up.

Speak naturally.
Do NOT say "based on the data" or "according to the KPIs".
Do NOT repeat every number; talk about trends and most important points.

Here is the JSON:

${JSON.stringify(kpis, null, 2)}

Now write the summary:`;

  const completion = await client.chatCompletion({
    model: MODEL_ID,
    messages: [{ role: "user", content: prompt }],
    max_tokens: 450,
    temperature: 0.6,
  });

  const answer = completion.choices?.[0]?.message?.content?.trim() || "";
  return answer;
}
