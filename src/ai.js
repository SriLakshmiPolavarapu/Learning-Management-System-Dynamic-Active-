import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function getAIRecommendation(grades) {
  const prompt = `
You are an AI learning coach for a K-12 student.

Student grades:
${grades.map(g => `${g.subject}: ${g.score}%`).join("\n")}

Give:
- One strength
- One weak area
- One encouraging action step
Keep it under 80 words.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
}

export async function askAITutor(question, context) {
  const prompt = `
You are a friendly AI tutor for a K-12 student.

Context:
${context}

Student question:
"${question}"

Explain simply and encouragingly.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
}
